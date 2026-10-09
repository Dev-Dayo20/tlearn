export type ColabRoomType =
  | "LIVE_AUDIO_VIDEO"
  | "DOUBT_CLEARING"
  | "EXAM_PREP"
  | "STUDY_LOUNGE"
  | "PROJECT_COLLAB";

export type ColabRoomStatus = "LIVE" | "STARTING_SOON" | "SCHEDULED" | "ENDED";

export type ColabParticipantRole =
  | "STUDENT"
  | "STUDENT_LEAD"
  | "PEER_TUTOR"
  | "TEACHER"
  | "MODERATOR";

export interface ColabParticipant {
  id: string;
  name: string;
  role: ColabParticipantRole;
  avatar?: string;
  isMuted: boolean;
  isCameraOn: boolean;
  isScreenSharing?: boolean;
  isHandRaised?: boolean;
  isSpeaking?: boolean;
  joinedAt: string;
}

export interface ColabChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  senderRole: ColabParticipantRole;
  text: string;
  timestamp: string;
  isPinned?: boolean;
  reactions?: {
    emoji: string;
    count: number;
    users: string[];
  }[];
}

export interface ColabQuestion {
  id: string;
  roomId: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  question: string;
  upvotes: number;
  upvotedByMe?: boolean;
  status: "OPEN" | "ANSWERING" | "RESOLVED";
  answeredBy?: string;
  createdAt: string;
}

export interface ColabResource {
  id: string;
  roomId: string;
  title: string;
  fileType: "PDF" | "DOC" | "LINK" | "IMAGE";
  url: string;
  addedBy: string;
  size?: string;
}

export interface ColabRoom {
  id: string;
  code: string;
  title: string;
  description: string;
  subject: string;
  courseName?: string;
  classLevel: string;
  roomType: ColabRoomType;
  status: ColabRoomStatus;
  host: {
    id: string;
    name: string;
    avatar?: string;
    role: ColabParticipantRole;
  };
  participantCount: number;
  maxParticipants: number;
  participants: ColabParticipant[];
  isMutedByDefault: boolean;
  tags: string[];
  whiteboardActive: boolean;
  currentTopic?: string;
  scheduledStartTime?: string;
  scheduledEndTime?: string;
  isPrivate?: boolean;
  createdAt: string;
}

export interface ColabScheduledSession {
  id: string;
  title: string;
  subject: string;
  courseName?: string;
  classLevel: string;
  hostName: string;
  hostRole: ColabParticipantRole;
  hostAvatar?: string;
  startTime: string;
  durationMinutes: number;
  registeredCount: number;
  isRegistered?: boolean;
  roomType: ColabRoomType;
  topic: string;
}

export interface ColabStats {
  activeRoomsCount: number;
  livePeersCount: number;
  resolvedTodayCount: number;
  scheduledCount: number;
}

export interface ColabFilterParams {
  search?: string;
  subject?: string;
  type?: string;
  status?: "ALL" | "LIVE" | "UPCOMING";
  page?: number;
  limit?: number;
}

export interface ColabRoomsResponse {
  rooms: ColabRoom[];
  stats: ColabStats;
  total: number;
  page: number;
  totalPages: number;
}

export interface CreateColabRoomDto {
  title: string;
  description?: string;
  subject: string;
  courseName?: string;
  roomType: ColabRoomType;
  classLevel: string;
  maxParticipants?: number;
  isPrivate?: boolean;
  tags?: string[];
  enableWhiteboard?: boolean;
  enableFocusTimer?: boolean;
}

export interface ColabReportDto {
  roomId: string;
  reportedUserId?: string;
  reportedUserName?: string;
  reason:
    | "INAPPROPRIATE_LANGUAGE"
    | "HARASSMENT"
    | "OFF_TOPIC_SPAM"
    | "CHEATING"
    | "OTHER";
  details: string;
}
