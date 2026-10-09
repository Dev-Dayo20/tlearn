import api from "@/services/api/super-admin/super-admin";
import type {
  ColabRoom,
  ColabRoomsResponse,
  ColabStats,
  ColabFilterParams,
  CreateColabRoomDto,
  ColabChatMessage,
  ColabQuestion,
  ColabResource,
  ColabScheduledSession,
  ColabReportDto,
} from "@/types/colab.types";

// ============================================================================
// MOCK DATA STORE (For instantaneous, smooth offline/pre-backend development)
// ============================================================================

export const MOCK_COLAB_STATS: ColabStats = {
  activeRoomsCount: 6,
  livePeersCount: 42,
  resolvedTodayCount: 89,
  scheduledCount: 14,
};

export const MOCK_COLAB_ROOMS: ColabRoom[] = [
  {
    id: "colab-room-101",
    code: "PHY-902",
    title: "Thermodynamics & Heat Transfer Problem Solving",
    description:
      "Collaborative live walkthrough solving past WAEC/JAMB physics calculations and Carnot engine mechanics.",
    subject: "Physics",
    courseName: "Senior Secondary Physics - Electromagnetism & Thermodynamics",
    classLevel: "SS3 / Grade 12",
    roomType: "LIVE_AUDIO_VIDEO",
    status: "LIVE",
    host: {
      id: "u-01",
      name: "Chukwudi Nnamdi",
      role: "PEER_TUTOR",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    participantCount: 8,
    maxParticipants: 15,
    participants: [
      {
        id: "u-01",
        name: "Chukwudi Nnamdi",
        role: "PEER_TUTOR",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        isMuted: false,
        isCameraOn: true,
        isSpeaking: true,
        joinedAt: "10 mins ago",
      },
      {
        id: "u-02",
        name: "Zainab Bello",
        role: "STUDENT",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        isMuted: true,
        isCameraOn: true,
        isHandRaised: true,
        joinedAt: "8 mins ago",
      },
      {
        id: "u-03",
        name: "Tolu Olatunji",
        role: "STUDENT",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        isMuted: true,
        isCameraOn: false,
        joinedAt: "5 mins ago",
      },
      {
        id: "u-04",
        name: "Blessing Okon",
        role: "STUDENT",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        isMuted: true,
        isCameraOn: true,
        joinedAt: "2 mins ago",
      },
    ],
    isMutedByDefault: true,
    tags: ["Heat Capacity", "Calculations", "Exam Prep"],
    whiteboardActive: true,
    currentTopic: "Solving Q4 on Specific Heat Capacity of Copper",
    createdAt: "2026-10-04T19:30:00Z",
  },
  {
    id: "colab-room-102",
    code: "MTH-441",
    title: "Calculus & Differential Equations Sprint",
    description:
      "Deep dive into integration by parts, chain rule shortcuts, and rate of change real-world problems.",
    subject: "Mathematics",
    courseName: "Advanced Pure Mathematics",
    classLevel: "SS3 / Grade 12",
    roomType: "DOUBT_CLEARING",
    status: "LIVE",
    host: {
      id: "u-05",
      name: "David Adeleke",
      role: "STUDENT_LEAD",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    participantCount: 12,
    maxParticipants: 20,
    participants: [
      {
        id: "u-05",
        name: "David Adeleke",
        role: "STUDENT_LEAD",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        isMuted: false,
        isCameraOn: true,
        isSpeaking: true,
        isScreenSharing: true,
        joinedAt: "20 mins ago",
      },
      {
        id: "u-06",
        name: "Amina Yusuf",
        role: "STUDENT",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        isMuted: true,
        isCameraOn: true,
        joinedAt: "15 mins ago",
      },
    ],
    isMutedByDefault: true,
    tags: ["Calculus", "Derivatives", "Integrals"],
    whiteboardActive: true,
    currentTopic: "Differentiating composite trig functions",
    createdAt: "2026-10-04T19:15:00Z",
  },
  {
    id: "colab-room-103",
    code: "CHM-308",
    title: "Organic Chemistry: Functional Groups & IUPAC Naming",
    description:
      "Interactive flashcard and IUPAC naming workshop with live reaction mechanisms breakdown.",
    subject: "Chemistry",
    courseName: "General Chemistry: Hydrocarbons & Esters",
    classLevel: "SS2 / Grade 11",
    roomType: "STUDY_LOUNGE",
    status: "LIVE",
    host: {
      id: "u-07",
      name: "Farida Mohammed",
      role: "STUDENT",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    },
    participantCount: 6,
    maxParticipants: 10,
    participants: [],
    isMutedByDefault: false,
    tags: ["IUPAC", "Alkenes", "Alkanols"],
    whiteboardActive: true,
    currentTopic: "Isomerism in Branched Alkanes",
    createdAt: "2026-10-04T19:40:00Z",
  },
  {
    id: "colab-room-104",
    code: "CSC-212",
    title: "Python Data Structures & Algorithm Challenges",
    description:
      "Peer programming session: tackling two-pointers, arrays, and binary search with live code sharing.",
    subject: "Computer Science",
    courseName: "Foundations of Python & Computational Logic",
    classLevel: "All Classes",
    roomType: "PROJECT_COLLAB",
    status: "LIVE",
    host: {
      id: "u-08",
      name: "Emeka Obi",
      role: "STUDENT_LEAD",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    },
    participantCount: 9,
    maxParticipants: 15,
    participants: [],
    isMutedByDefault: true,
    tags: ["Python", "Algorithms", "Live Code"],
    whiteboardActive: true,
    currentTopic: "Optimizing Time Complexity for Search",
    createdAt: "2026-10-04T19:00:00Z",
  },
  {
    id: "colab-room-105",
    code: "BIO-115",
    title: "Cell Division: Mitosis vs Meiosis Masterclass",
    description:
      "Visual diagram review of chromosome replication, stages of meiosis, and genetic variation questions.",
    subject: "Biology",
    courseName: "Cellular Biology & Genetics",
    classLevel: "SS2 / Grade 11",
    roomType: "EXAM_PREP",
    status: "STARTING_SOON",
    host: {
      id: "u-09",
      name: "Khadija Suleiman",
      role: "PEER_TUTOR",
      avatar:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
    },
    participantCount: 4,
    maxParticipants: 20,
    participants: [],
    isMutedByDefault: true,
    tags: ["Mitosis", "Genetics", "Diagrams"],
    whiteboardActive: true,
    currentTopic: "Starting in 10 minutes",
    scheduledStartTime: "2026-10-04T20:30:00Z",
    createdAt: "2026-10-04T19:50:00Z",
  },
  {
    id: "colab-room-106",
    code: "ENG-503",
    title: "Literature & Creative Essay Structure Critique",
    description:
      "Reviewing Shakespeare's themes, African prose figures of speech, and essay thesis statements.",
    subject: "English Literature",
    courseName: "Prose, Poetry and Dramatic Literature",
    classLevel: "SS1 / SS2",
    roomType: "STUDY_LOUNGE",
    status: "LIVE",
    host: {
      id: "u-10",
      name: "Somtochukwu Eze",
      role: "STUDENT",
      avatar:
        "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80",
    },
    participantCount: 5,
    maxParticipants: 12,
    participants: [],
    isMutedByDefault: false,
    tags: ["Essay Writing", "Poetry Analysis"],
    whiteboardActive: false,
    currentTopic: "Theme of colonial impact in African Prose",
    createdAt: "2026-10-04T19:25:00Z",
  },
];

export const MOCK_SCHEDULED_SESSIONS: ColabScheduledSession[] = [
  {
    id: "sched-1",
    title: "JAMB Full Mock Sprint: Math & English Strategy",
    subject: "Mathematics",
    courseName: "General Examination Prep",
    classLevel: "SS3 / Exam Candidates",
    hostName: "Senior Tutor & Peer Mentors",
    hostRole: "TEACHER",
    hostAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    startTime: "Tomorrow, 4:00 PM",
    durationMinutes: 60,
    registeredCount: 38,
    isRegistered: true,
    roomType: "EXAM_PREP",
    topic: "Speed solving techniques for 60 questions in 45 mins",
  },
  {
    id: "sched-2",
    title: "Collaborative Science Fair Project: Solar Distillation",
    subject: "Physics",
    courseName: "Applied Renewable Energy",
    classLevel: "SS1 - SS3",
    hostName: "Kelechi & Lab Team",
    hostRole: "STUDENT_LEAD",
    hostAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    startTime: "Wednesday, 5:30 PM",
    durationMinutes: 45,
    registeredCount: 16,
    isRegistered: false,
    roomType: "PROJECT_COLLAB",
    topic: "Reviewing circuit diagrams and presentation slides",
  },
  {
    id: "sched-3",
    title: "Chemistry Lab Calculations: Titration and Mole Ratios",
    subject: "Chemistry",
    courseName: "Volumetric Analysis",
    classLevel: "SS2 / SS3",
    hostName: "Halima Abubakar",
    hostRole: "PEER_TUTOR",
    hostAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    startTime: "Thursday, 6:00 PM",
    durationMinutes: 50,
    registeredCount: 22,
    isRegistered: false,
    roomType: "DOUBT_CLEARING",
    topic: "Balancing redox equations & concordant titers calculation",
  },
];

export const MOCK_MESSAGES_STORE: Record<string, ColabChatMessage[]> = {
  "colab-room-101": [
    {
      id: "m-1",
      roomId: "colab-room-101",
      senderId: "u-01",
      senderName: "Chukwudi Nnamdi",
      senderAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      senderRole: "PEER_TUTOR",
      text: "Welcome everyone! Today we're working on Specific Heat Capacity calculations. Check the whiteboard for equation breakdown.",
      timestamp: "10:02 AM",
      isPinned: true,
      reactions: [{ emoji: "🔥", count: 4, users: ["u-02", "u-03"] }],
    },
    {
      id: "m-2",
      roomId: "colab-room-101",
      senderId: "u-02",
      senderName: "Zainab Bello",
      senderAvatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      senderRole: "STUDENT",
      text: "Quick question on Q4: do we also consider the water equivalent of the calorimeter vessel?",
      timestamp: "10:05 AM",
      reactions: [{ emoji: "👍", count: 2, users: ["u-01"] }],
    },
    {
      id: "m-3",
      roomId: "colab-room-101",
      senderId: "u-01",
      senderName: "Chukwudi Nnamdi",
      senderAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      senderRole: "PEER_TUTOR",
      text: "Great catch Zainab! Yes, total heat gained = Heat gained by water + Heat gained by calorimeter (m_c * c_c * Δθ). Let me write it on the whiteboard.",
      timestamp: "10:06 AM",
      reactions: [{ emoji: "💡", count: 5, users: ["u-02", "u-03", "u-04"] }],
    },
    {
      id: "m-4",
      roomId: "colab-room-101",
      senderId: "u-03",
      senderName: "Tolu Olatunji",
      senderAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      senderRole: "STUDENT",
      text: "Can someone share the formula sheet PDF in the resources tab? Thanks!",
      timestamp: "10:08 AM",
    },
  ],
};

export const MOCK_QUESTIONS_STORE: Record<string, ColabQuestion[]> = {
  "colab-room-101": [
    {
      id: "q-1",
      roomId: "colab-room-101",
      studentId: "u-02",
      studentName: "Zainab Bello",
      studentAvatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      question:
        "Why is water commonly used as a cooling agent in car radiators compared to other liquids?",
      upvotes: 6,
      upvotedByMe: true,
      status: "ANSWERING",
      createdAt: "10:04 AM",
    },
    {
      id: "q-2",
      roomId: "colab-room-101",
      studentId: "u-03",
      studentName: "Tolu Olatunji",
      studentAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      question:
        "How do we handle heat losses to the surrounding atmosphere in experimental calculations?",
      upvotes: 4,
      upvotedByMe: false,
      status: "OPEN",
      createdAt: "10:07 AM",
    },
    {
      id: "q-3",
      roomId: "colab-room-101",
      studentId: "u-04",
      studentName: "Blessing Okon",
      studentAvatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      question:
        "What is the SI unit difference between Heat Capacity and Specific Heat Capacity?",
      upvotes: 8,
      upvotedByMe: true,
      status: "RESOLVED",
      answeredBy: "Chukwudi Nnamdi",
      createdAt: "10:01 AM",
    },
  ],
};

export const MOCK_RESOURCES_STORE: Record<string, ColabResource[]> = {
  "colab-room-101": [
    {
      id: "res-1",
      roomId: "colab-room-101",
      title: "Physics Heat Transfer & Thermodynamics Formula Sheet.pdf",
      fileType: "PDF",
      url: "#",
      addedBy: "Chukwudi Nnamdi",
      size: "1.4 MB",
    },
    {
      id: "res-2",
      roomId: "colab-room-101",
      title: "WAEC Past Questions 2020-2025 Heat & Gas Laws.pdf",
      fileType: "PDF",
      url: "#",
      addedBy: "Tolu Olatunji",
      size: "3.2 MB",
    },
    {
      id: "res-3",
      roomId: "colab-room-101",
      title: "Interactive PhET Thermal Simulation Link",
      fileType: "LINK",
      url: "https://phet.colorado.edu",
      addedBy: "Zainab Bello",
    },
  ],
};

// In-memory array for newly created live rooms during session
let dynamicRooms = [...MOCK_COLAB_ROOMS];
let dynamicScheduled = [...MOCK_SCHEDULED_SESSIONS];

// ============================================================================
// API METHODS (With seamless backend connection & robust mock fallback)
// ============================================================================

/**
 * 1. Fetch Rooms list with filtering and search
 * GET /student/colab/rooms
 */
export const fetchColabRooms = async (
  params?: ColabFilterParams,
): Promise<ColabRoomsResponse> => {
  try {
    const { data } = await api.get<ColabRoomsResponse>("/student/colab/rooms", {
      params,
    });
    if (data && data.rooms) return data;
  } catch (error) {
    // Graceful fallback to client mock data while backend routes are prepared
  }

  // Filter in-memory dynamic data
  let filtered = [...dynamicRooms];

  if (params?.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.subject.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  if (params?.subject && params.subject !== "All") {
    filtered = filtered.filter(
      (r) => r.subject.toLowerCase() === params.subject?.toLowerCase(),
    );
  }

  if (params?.type && params.type !== "ALL") {
    filtered = filtered.filter((r) => r.roomType === params.type);
  }

  if (params?.status && params.status !== "ALL") {
    filtered = filtered.filter((r) => r.status === params.status);
  }

  return {
    rooms: filtered,
    stats: MOCK_COLAB_STATS,
    total: filtered.length,
    page: params?.page || 1,
    totalPages: Math.ceil(filtered.length / (params?.limit || 12)) || 1,
  };
};

/**
 * 2. Fetch Room Details
 * GET /student/colab/rooms/:id
 */
export const fetchRoomDetails = async (roomId: string): Promise<ColabRoom> => {
  try {
    const { data } = await api.get<{ room: ColabRoom }>(
      `/student/colab/rooms/${roomId}`,
    );
    if (data?.room) return data.room;
  } catch {
    // Fallback
  }

  const room = dynamicRooms.find((r) => r.id === roomId || r.code === roomId);
  if (!room) {
    throw new Error("Room not found");
  }
  return room;
};

/**
 * 3. Create / Host a new Live Study Room
 * POST /student/colab/rooms
 */
export const createColabRoom = async (
  payload: CreateColabRoomDto,
  hostUser?: { id: string; name: string; avatar?: string },
): Promise<ColabRoom> => {
  try {
    const { data } = await api.post<{ room: ColabRoom }>(
      "/student/colab/rooms",
      payload,
    );
    if (data?.room) return data.room;
  } catch {
    // Fallback: create locally
  }

  const newCode = `${payload.subject.slice(0, 3).toUpperCase()}-${Math.floor(
    100 + Math.random() * 900,
  )}`;

  const newRoom: ColabRoom = {
    id: `colab-room-${Date.now()}`,
    code: newCode,
    title: payload.title,
    description:
      payload.description ||
      `Live collaboration and peer study session on ${payload.subject}.`,
    subject: payload.subject,
    courseName: payload.courseName,
    classLevel: payload.classLevel || "General Class",
    roomType: payload.roomType,
    status: "LIVE",
    host: {
      id: hostUser?.id || "u-self",
      name: hostUser?.name || "Student Host",
      avatar: hostUser?.avatar,
      role: "STUDENT_LEAD",
    },
    participantCount: 1,
    maxParticipants: payload.maxParticipants || 15,
    participants: [
      {
        id: hostUser?.id || "u-self",
        name: hostUser?.name || "Student Host",
        role: "STUDENT_LEAD",
        avatar: hostUser?.avatar,
        isMuted: false,
        isCameraOn: true,
        isSpeaking: true,
        joinedAt: "Just now",
      },
    ],
    isMutedByDefault: false,
    tags: payload.tags || [payload.subject, "Live Study"],
    whiteboardActive: payload.enableWhiteboard !== false,
    currentTopic: "Welcome! Setting up collaborative workspace...",
    isPrivate: payload.isPrivate || false,
    createdAt: new Date().toISOString(),
  };

  dynamicRooms.unshift(newRoom);
  MOCK_COLAB_STATS.activeRoomsCount += 1;
  MOCK_COLAB_STATS.livePeersCount += 1;

  // Initialize room chat
  MOCK_MESSAGES_STORE[newRoom.id] = [
    {
      id: `msg-${Date.now()}`,
      roomId: newRoom.id,
      senderId: hostUser?.id || "u-self",
      senderName: hostUser?.name || "Student Host",
      senderRole: "STUDENT_LEAD",
      text: `Hello everyone! Welcome to ${newRoom.title}. Feel free to use the Whiteboard and ask questions in the queue.`,
      timestamp: "Just now",
      isPinned: true,
    },
  ];

  return newRoom;
};

/**
 * 4. Fetch Room Live Chat Messages
 * GET /student/colab/rooms/:id/messages
 */
export const fetchRoomMessages = async (
  roomId: string,
): Promise<ColabChatMessage[]> => {
  try {
    const { data } = await api.get<{ messages: ColabChatMessage[] }>(
      `/student/colab/rooms/${roomId}/messages`,
    );
    if (data?.messages) return data.messages;
  } catch {
    // Fallback
  }

  return (
    MOCK_MESSAGES_STORE[roomId] || [
      {
        id: `msg-welcome-${roomId}`,
        roomId,
        senderId: "system",
        senderName: "tlearn Moderator Bot",
        senderRole: "MODERATOR",
        text: "👋 Welcome to tlearn coLab! Please uphold polite, respectful academic discussion.",
        timestamp: "Now",
      },
    ]
  );
};

/**
 * 5. Send Chat Message
 * POST /student/colab/rooms/:id/messages
 */
export const sendRoomMessage = async (
  roomId: string,
  text: string,
  sender: { id: string; name: string; avatar?: string; role?: any },
): Promise<ColabChatMessage> => {
  try {
    const { data } = await api.post<{ message: ColabChatMessage }>(
      `/student/colab/rooms/${roomId}/messages`,
      { text },
    );
    if (data?.message) return data.message;
  } catch {
    // Fallback
  }

  const newMsg: ColabChatMessage = {
    id: `msg-${Date.now()}`,
    roomId,
    senderId: sender.id,
    senderName: sender.name,
    senderAvatar: sender.avatar,
    senderRole: sender.role || "STUDENT",
    text,
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  if (!MOCK_MESSAGES_STORE[roomId]) {
    MOCK_MESSAGES_STORE[roomId] = [];
  }
  MOCK_MESSAGES_STORE[roomId].push(newMsg);
  return newMsg;
};

/**
 * 6. Fetch Room Questions / Doubt Queue
 * GET /student/colab/rooms/:id/questions
 */
export const fetchRoomQuestions = async (
  roomId: string,
): Promise<ColabQuestion[]> => {
  try {
    const { data } = await api.get<{ questions: ColabQuestion[] }>(
      `/student/colab/rooms/${roomId}/questions`,
    );
    if (data?.questions) return data.questions;
  } catch {
    // Fallback
  }

  return MOCK_QUESTIONS_STORE[roomId] || [];
};

/**
 * 7. Submit a new doubt / question
 * POST /student/colab/rooms/:id/questions
 */
export const submitRoomQuestion = async (
  roomId: string,
  question: string,
  student: { id: string; name: string; avatar?: string },
): Promise<ColabQuestion> => {
  try {
    const { data } = await api.post<{ question: ColabQuestion }>(
      `/student/colab/rooms/${roomId}/questions`,
      { question },
    );
    if (data?.question) return data.question;
  } catch {
    // Fallback
  }

  const newQ: ColabQuestion = {
    id: `q-${Date.now()}`,
    roomId,
    studentId: student.id,
    studentName: student.name,
    studentAvatar: student.avatar,
    question,
    upvotes: 1,
    upvotedByMe: true,
    status: "OPEN",
    createdAt: "Just now",
  };

  if (!MOCK_QUESTIONS_STORE[roomId]) {
    MOCK_QUESTIONS_STORE[roomId] = [];
  }
  MOCK_QUESTIONS_STORE[roomId].unshift(newQ);
  return newQ;
};

/**
 * 8. Upvote a question
 * POST /student/colab/rooms/:id/questions/:questionId/upvote
 */
export const upvoteRoomQuestion = async (
  roomId: string,
  questionId: string,
): Promise<ColabQuestion> => {
  try {
    const { data } = await api.post<{ question: ColabQuestion }>(
      `/student/colab/rooms/${roomId}/questions/${questionId}/upvote`,
    );
    if (data?.question) return data.question;
  } catch {
    // Fallback
  }

  const list = MOCK_QUESTIONS_STORE[roomId] || [];
  const q = list.find((item) => item.id === questionId);
  if (q) {
    if (q.upvotedByMe) {
      q.upvotes = Math.max(0, q.upvotes - 1);
      q.upvotedByMe = false;
    } else {
      q.upvotes += 1;
      q.upvotedByMe = true;
    }
    return { ...q };
  }
  throw new Error("Question not found");
};

/**
 * 9. Fetch Scheduled Study Sessions
 * GET /student/colab/scheduled
 */
export const fetchScheduledSessions = async (): Promise<
  ColabScheduledSession[]
> => {
  try {
    const { data } = await api.get<{ sessions: ColabScheduledSession[] }>(
      "/student/colab/scheduled",
    );
    if (data?.sessions) return data.sessions;
  } catch {
    // Fallback
  }

  return dynamicScheduled;
};

/**
 * 10. Toggle RSVP / Registration for a scheduled session
 * POST /student/colab/scheduled/:id/register
 */
export const toggleSessionRsvp = async (
  sessionId: string,
): Promise<ColabScheduledSession> => {
  try {
    const { data } = await api.post<{ session: ColabScheduledSession }>(
      `/student/colab/scheduled/${sessionId}/register`,
    );
    if (data?.session) return data.session;
  } catch {
    // Fallback
  }

  const sess = dynamicScheduled.find((s) => s.id === sessionId);
  if (sess) {
    sess.isRegistered = !sess.isRegistered;
    sess.registeredCount += sess.isRegistered ? 1 : -1;
    return { ...sess };
  }
  throw new Error("Session not found");
};

/**
 * 11. Report Content or Misconduct to Educational Moderator
 * POST /student/colab/moderation/report
 */
export const submitContentReport = async (
  payload: ColabReportDto,
): Promise<{ success: boolean; message: string }> => {
  try {
    const { data } = await api.post<{ success: boolean; message: string }>(
      "/student/colab/moderation/report",
      payload,
    );
    if (data) return data;
  } catch {
    // Fallback
  }

  return {
    success: true,
    message:
      "Thank you. Your report has been submitted to the academic moderation team for review.",
  };
};
