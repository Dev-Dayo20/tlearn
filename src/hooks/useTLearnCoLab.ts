import { useState, useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuthStore } from "@/store/authStore";
import type {
  ColabRoom,
  ColabFilterParams,
  CreateColabRoomDto,
  ColabChatMessage,
  ColabQuestion,
  ColabScheduledSession,
  ColabReportDto,
  ColabParticipant,
} from "@/types/colab.types";
import {
  fetchColabRooms,
  createColabRoom,
  fetchRoomMessages,
  sendRoomMessage,
  fetchRoomQuestions,
  submitRoomQuestion,
  upvoteRoomQuestion,
  fetchScheduledSessions,
  toggleSessionRsvp,
  submitContentReport,
} from "@/services/api/student/colabApi";

export const COLAB_ROOMS_KEY = ["student", "colab", "rooms"];
export const COLAB_SCHEDULED_KEY = ["student", "colab", "scheduled"];
export const COLAB_MESSAGES_KEY = ["student", "colab", "messages"];
export const COLAB_QUESTIONS_KEY = ["student", "colab", "questions"];

export const useTLearnCoLab = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const studentName = user?.name || "Student";
  const studentClassLevel =
    (typeof user?.class === "object" ? user?.class?.name : user?.className) ||
    "SS3 / Grade 12";

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedRoomType, setSelectedRoomType] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "LIVE" | "UPCOMING">(
    "ALL",
  );
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filterParams: ColabFilterParams = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      subject: selectedSubject !== "All" ? selectedSubject : undefined,
      type: selectedRoomType !== "ALL" ? selectedRoomType : undefined,
      status: statusFilter,
      page,
      limit: 12,
    }),
    [debouncedSearch, selectedSubject, selectedRoomType, statusFilter, page],
  );

  // Queries
  const {
    data: roomsData,
    isLoading: isLoadingRooms,
    refetch: refetchRooms,
  } = useQuery({
    queryKey: [...COLAB_ROOMS_KEY, filterParams],
    queryFn: () => fetchColabRooms(filterParams),
    staleTime: 1000 * 30, // 30s
  });

  const { data: scheduledSessions = [], isLoading: isLoadingScheduled } =
    useQuery({
      queryKey: COLAB_SCHEDULED_KEY,
      queryFn: fetchScheduledSessions,
      staleTime: 1000 * 60,
    });

  // Modal State
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);
  const [isJoinByCodeModalOpen, setIsJoinByCodeModalOpen] = useState(false);
  const [isScheduleDrawerOpen, setIsScheduleDrawerOpen] = useState(false);
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState<{
    roomId: string;
    userId?: string;
    userName?: string;
  } | null>(null);

  // Active Live Studio State
  const [activeLiveRoom, setActiveLiveRoom] = useState<ColabRoom | null>(null);
  const [isLiveStudioOpen, setIsLiveStudioOpen] = useState(false);

  // Live Studio Controls
  const [isMuted, setIsMuted] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [liveStudioTab, setLiveStudioTab] = useState<
    "WHITEBOARD" | "STAGE" | "RESOURCES"
  >("WHITEBOARD");
  const [sidebarTab, setSidebarTab] = useState<
    "CHAT" | "DOUBTS" | "TIMER" | "PEOPLE"
  >("CHAT");

  // Pomodoro Focus Timer inside live studio
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<"FOCUS" | "BREAK">("FOCUS");

  // Room messages query for active live room
  const { data: roomMessages = [], refetch: refetchMessages } = useQuery({
    queryKey: [...COLAB_MESSAGES_KEY, activeLiveRoom?.id],
    queryFn: () => (activeLiveRoom ? fetchRoomMessages(activeLiveRoom.id) : []),
    enabled: !!activeLiveRoom?.id,
    refetchInterval: isLiveStudioOpen ? 4000 : false, // Poll messages while in studio
  });

  // Room doubts query for active live room
  const { data: roomQuestions = [], refetch: refetchQuestions } = useQuery({
    queryKey: [...COLAB_QUESTIONS_KEY, activeLiveRoom?.id],
    queryFn: () =>
      activeLiveRoom ? fetchRoomQuestions(activeLiveRoom.id) : [],
    enabled: !!activeLiveRoom?.id,
  });

  // Mutations
  const createRoomMutation = useMutation({
    mutationFn: (payload: CreateColabRoomDto) =>
      createColabRoom(payload, {
        id: user?.id?.toString() || "u-self",
        name: studentName,
        avatar: user?.profilePicture,
      }),
    onSuccess: (newRoom) => {
      queryClient.invalidateQueries({ queryKey: COLAB_ROOMS_KEY });
      setIsCreateRoomModalOpen(false);
      toast.success(`Study Room "${newRoom.title}" is live!`);
      // Immediately join as host
      handleJoinLiveRoom(newRoom);
    },
    onError: () => {
      toast.error("Failed to launch study room. Please try again.");
    },
  });

  const sendMsgMutation = useMutation({
    mutationFn: (text: string) => {
      if (!activeLiveRoom) throw new Error("No active room");
      return sendRoomMessage(activeLiveRoom.id, text, {
        id: user?.id?.toString() || "u-self",
        name: studentName,
        avatar: user?.profilePicture,
        role: "STUDENT",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...COLAB_MESSAGES_KEY, activeLiveRoom?.id],
      });
    },
  });

  const askQuestionMutation = useMutation({
    mutationFn: (questionText: string) => {
      if (!activeLiveRoom) throw new Error("No active room");
      return submitRoomQuestion(activeLiveRoom.id, questionText, {
        id: user?.id?.toString() || "u-self",
        name: studentName,
        avatar: user?.profilePicture,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...COLAB_QUESTIONS_KEY, activeLiveRoom?.id],
      });
      toast.success("Doubt posted to the room queue!");
    },
  });

  const upvoteMutation = useMutation({
    mutationFn: (questionId: string) => {
      if (!activeLiveRoom) throw new Error("No active room");
      return upvoteRoomQuestion(activeLiveRoom.id, questionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...COLAB_QUESTIONS_KEY, activeLiveRoom?.id],
      });
    },
  });

  const rsvpMutation = useMutation({
    mutationFn: (sessionId: string) => toggleSessionRsvp(sessionId),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: COLAB_SCHEDULED_KEY });
      if (updated.isRegistered) {
        toast.success("RSVP Confirmed! A reminder will appear before start.");
      } else {
        toast.info("RSVP cancelled.");
      }
    },
  });

  const reportMutation = useMutation({
    mutationFn: (payload: ColabReportDto) => submitContentReport(payload),
    onSuccess: (res) => {
      setIsReportModalOpen(false);
      setReportTarget(null);
      toast.success(res.message);
    },
  });

  // Handlers
  const handleJoinLiveRoom = useCallback((room: ColabRoom) => {
    setActiveLiveRoom(room);
    setIsLiveStudioOpen(true);
    setIsMuted(room.isMutedByDefault ?? true);
    setIsCameraOn(true);
    setIsScreenSharing(false);
    setIsHandRaised(false);
    setLiveStudioTab(room.whiteboardActive ? "WHITEBOARD" : "STAGE");
    setSidebarTab("CHAT");
  }, []);

  const handleLeaveLiveRoom = useCallback(() => {
    setIsLiveStudioOpen(false);
    setActiveLiveRoom(null);
    setIsScreenSharing(false);
    setIsHandRaised(false);
    toast.info("You left the study room.");
  }, []);

  const handleJoinByCode = useCallback(
    (codeOrUrl: string) => {
      const cleanCode = codeOrUrl.trim().toUpperCase();
      const allRooms = roomsData?.rooms || [];
      const found = allRooms.find(
        (r) =>
          r.code.toUpperCase() === cleanCode ||
          r.id.toLowerCase() === cleanCode.toLowerCase(),
      );

      if (found) {
        setIsJoinByCodeModalOpen(false);
        handleJoinLiveRoom(found);
        toast.success(`Joined room: ${found.title}`);
      } else {
        toast.error(`No active study room found with code "${cleanCode}".`);
      }
    },
    [roomsData, handleJoinLiveRoom],
  );

  const handleOpenReport = useCallback(
    (roomId: string, userId?: string, userName?: string) => {
      setReportTarget({ roomId, userId, userName });
      setIsReportModalOpen(true);
    },
    [],
  );

  return {
    studentName,
    studentClassLevel,
    // Filters & list
    searchQuery,
    setSearchQuery,
    selectedSubject,
    setSelectedSubject,
    selectedRoomType,
    setSelectedRoomType,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    // Data
    rooms: roomsData?.rooms ?? [],
    stats: roomsData?.stats,
    isLoadingRooms,
    refetchRooms,
    scheduledSessions,
    isLoadingScheduled,
    // Modals
    isCreateRoomModalOpen,
    setIsCreateRoomModalOpen,
    isJoinByCodeModalOpen,
    setIsJoinByCodeModalOpen,
    isScheduleDrawerOpen,
    setIsScheduleDrawerOpen,
    isGuidelinesModalOpen,
    setIsGuidelinesModalOpen,
    isReportModalOpen,
    setIsReportModalOpen,
    reportTarget,
    handleOpenReport,
    // Active Live Room
    activeLiveRoom,
    isLiveStudioOpen,
    handleJoinLiveRoom,
    handleLeaveLiveRoom,
    handleJoinByCode,
    // Studio Controls
    isMuted,
    setIsMuted,
    isCameraOn,
    setIsCameraOn,
    isScreenSharing,
    setIsScreenSharing,
    isHandRaised,
    setIsHandRaised,
    liveStudioTab,
    setLiveStudioTab,
    sidebarTab,
    setSidebarTab,
    // Studio sub-data
    roomMessages,
    roomQuestions,
    // Pomodoro
    pomodoroSeconds,
    setPomodoroSeconds,
    isPomodoroRunning,
    setIsPomodoroRunning,
    pomodoroMode,
    setPomodoroMode,
    // Mutations
    createRoom: createRoomMutation.mutate,
    isCreatingRoom: createRoomMutation.isPending,
    sendMessage: sendMsgMutation.mutate,
    isSendingMessage: sendMsgMutation.isPending,
    askQuestion: askQuestionMutation.mutate,
    isAskingQuestion: askQuestionMutation.isPending,
    upvoteQuestion: upvoteMutation.mutate,
    toggleRsvp: rsvpMutation.mutate,
    submitReport: reportMutation.mutate,
    isSubmittingReport: reportMutation.isPending,
  };
};
