import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Star, BookOpen, Crown, TrendingUp } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

// ─── Types ──────────────────────────────────────────────────────────────────

type FilterTab = "overall" | "score" | "completion";

interface LeaderboardEntry {
  id: number;
  name: string;
  avgScore: number;
  completedLessons: number;
  totalLessons: number;
  combinedScore: number;
  profilePicture?: string | null; // URL from Cloudinary (or null → show initials)
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
// Replace with real API data when available.
// Set profilePicture to a URL string to test the image path, or null/undefined for initials fallback.

const MOCK_CLASS_DATA: LeaderboardEntry[] = [
  { id: 1, name: "Amara Okonkwo", avgScore: 96, completedLessons: 30, totalLessons: 32, combinedScore: 95, profilePicture: null },
  { id: 2, name: "Tobenna Eze", avgScore: 91, completedLessons: 28, totalLessons: 32, combinedScore: 90, profilePicture: null },
  { id: 3, name: "Chisom Adeyemi", avgScore: 88, completedLessons: 27, totalLessons: 32, combinedScore: 86, profilePicture: null },
  { id: 4, name: "Funmilayo Bello", avgScore: 85, completedLessons: 26, totalLessons: 32, combinedScore: 83, profilePicture: null },
  { id: 5, name: "You", avgScore: 82, completedLessons: 24, totalLessons: 32, combinedScore: 79, profilePicture: null },
  { id: 6, name: "Emeka Nwachukwu", avgScore: 79, completedLessons: 22, totalLessons: 32, combinedScore: 75, profilePicture: null },
  { id: 7, name: "Sade Lawal", avgScore: 76, completedLessons: 20, totalLessons: 32, combinedScore: 71, profilePicture: null },
  { id: 8, name: "Yusuf Musa", avgScore: 72, completedLessons: 19, totalLessons: 32, combinedScore: 67, profilePicture: null },
  { id: 9, name: "Ngozi Obi", avgScore: 68, completedLessons: 18, totalLessons: 32, combinedScore: 63, profilePicture: null },
  { id: 10, name: "Adaeze Nwosu", avgScore: 65, completedLessons: 16, totalLessons: 32, combinedScore: 59, profilePicture: null },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getSortedData(data: LeaderboardEntry[], tab: FilterTab): LeaderboardEntry[] {
  const sorted = [...data];
  if (tab === "score") return sorted.sort((a, b) => b.avgScore - a.avgScore);
  if (tab === "completion")
    return sorted.sort(
      (a, b) =>
        b.completedLessons / b.totalLessons - a.completedLessons / a.totalLessons
    );
  return sorted.sort((a, b) => b.combinedScore - a.combinedScore);
}

function getScoreLabel(entry: LeaderboardEntry, tab: FilterTab): string {
  if (tab === "score") return `${entry.avgScore}% avg`;
  if (tab === "completion") return `${entry.completedLessons}/${entry.totalLessons}`;
  return `${entry.combinedScore} pts`;
}

function getProgressValue(entry: LeaderboardEntry, tab: FilterTab): number {
  if (tab === "score") return entry.avgScore;
  if (tab === "completion")
    return Math.round((entry.completedLessons / entry.totalLessons) * 100);
  return entry.combinedScore;
}

// ─── StudentAvatar ────────────────────────────────────────────────────────────
// Renders profilePicture if available, otherwise falls back to initials.

interface StudentAvatarProps {
  name: string;
  profilePicture?: string | null;
  /** Tailwind size classes e.g. "h-14 w-14" */
  size?: string;
  /** Tailwind bg class when no picture */
  bgColor?: string;
  /** Tailwind rounded class */
  rounded?: string;
  /** Tailwind ring classes for border */
  ring?: string;
  isCurrentUser?: boolean;
}

const StudentAvatar = ({
  name,
  profilePicture,
  size = "h-10 w-10",
  bgColor = "bg-muted-foreground/70",
  rounded = "rounded-xl",
  ring = "",
  isCurrentUser = false,
}: StudentAvatarProps) => {
  const [imgError, setImgError] = useState(false);
  const showImage = profilePicture && !imgError;

  return (
    <div
      className={`${size} ${rounded} ${ring} ${showImage ? "" : bgColor
        } flex items-center justify-center text-white font-bold shrink-0 overflow-hidden shadow-md`}
    >
      {showImage ? (
        <img
          src={profilePicture}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={`${isCurrentUser ? "text-primary-foreground" : "text-white"} select-none font-bold`}>
          {getInitials(name)}
        </span>
      )}
    </div>
  );
};

// ─── Podium Card ─────────────────────────────────────────────────────────────

interface PodiumCardProps {
  entry: LeaderboardEntry;
  rank: 1 | 2 | 3;
  isCurrentUser: boolean;
  tab: FilterTab;
}

const podiumConfig = {
  1: {
    platformH: "h-28 sm:h-36",
    ringColor: "ring-amber-400",
    icon: <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />,
    label: "1st",
    avatarBg: "bg-amber-500",
    platformBg: "bg-gradient-to-b from-amber-400 to-amber-600",
    shadow: "shadow-amber-200",
    avatarSize: "h-12 w-12 sm:h-16 sm:w-16",
  },
  2: {
    platformH: "h-20 sm:h-28",
    ringColor: "ring-slate-400",
    icon: <Medal className="h-4 w-4 sm:h-5 sm:w-5 text-slate-500" />,
    label: "2nd",
    avatarBg: "bg-slate-500",
    platformBg: "bg-gradient-to-b from-slate-400 to-slate-600",
    shadow: "shadow-slate-200",
    avatarSize: "h-10 w-10 sm:h-14 sm:w-14",
  },
  3: {
    platformH: "h-16 sm:h-24",
    ringColor: "ring-orange-400",
    icon: <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />,
    label: "3rd",
    avatarBg: "bg-orange-500",
    platformBg: "bg-gradient-to-b from-orange-400 to-orange-600",
    shadow: "shadow-orange-200",
    avatarSize: "h-10 w-10 sm:h-14 sm:w-14",
  },
};

const PodiumCard = ({ entry, rank, isCurrentUser, tab }: PodiumCardProps) => {
  const cfg = podiumConfig[rank];
  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-1 max-w-[100px] sm:max-w-[130px]">
      {/* Avatar with badge icon */}
      <div className="relative">
        <StudentAvatar
          name={isCurrentUser ? (entry.name === "You" ? "You" : entry.name) : entry.name}
          profilePicture={entry.profilePicture}
          size={cfg.avatarSize}
          bgColor={cfg.avatarBg}
          rounded="rounded-2xl"
          ring={`ring-4 ${cfg.ringColor} ${isCurrentUser ? "ring-offset-2" : ""}`}
          isCurrentUser={isCurrentUser}
        />
        <div className="absolute -top-2 -right-2 rounded-full bg-background p-0.5 shadow">
          {cfg.icon}
        </div>
      </div>

      {/* Name + score */}
      <div className="text-center w-full px-1">
        <p
          className={`text-xs sm:text-sm font-bold truncate ${isCurrentUser ? "text-primary" : ""
            }`}
        >
          {isCurrentUser ? "You" : entry.name.split(" ")[0]}
        </p>
        <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
          {getScoreLabel(entry, tab)}
        </p>
      </div>

      {/* Platform */}
      <div
        className={`w-full ${cfg.platformH} rounded-t-xl sm:rounded-t-2xl ${cfg.platformBg} flex items-center justify-center shadow-lg ${cfg.shadow}`}
      >
        <span className="text-white font-black text-base sm:text-xl">{cfg.label}</span>
      </div>
    </div>
  );
};

// ─── Rank Row ─────────────────────────────────────────────────────────────────

interface RankRowProps {
  entry: LeaderboardEntry;
  rank: number;
  isCurrentUser: boolean;
  tab: FilterTab;
  currentUserPicture?: string | null;
  animationDelay: number;
}

const RankRow = ({
  entry,
  rank,
  isCurrentUser,
  tab,
  currentUserPicture,
  animationDelay,
}: RankRowProps) => {
  const progress = getProgressValue(entry, tab);
  const picture = isCurrentUser ? currentUserPicture : entry.profilePicture;

  return (
    <div
      className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:shadow-md group ${isCurrentUser
        ? "border-primary/40 bg-primary/5 shadow-sm"
        : "border-border bg-card hover:border-primary/20"
        }`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Rank badge */}
      <div
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center text-xs sm:text-sm font-black shrink-0 ${rank === 1
          ? "bg-amber-100 text-amber-700"
          : rank === 2
            ? "bg-slate-100 text-slate-600"
            : rank === 3
              ? "bg-orange-100 text-orange-700"
              : isCurrentUser
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground"
          }`}
      >
        {rank}
      </div>

      {/* Avatar */}
      <StudentAvatar
        name={entry.name}
        profilePicture={picture}
        size="h-9 w-9 sm:h-10 sm:w-10"
        bgColor={isCurrentUser ? "bg-primary" : "bg-muted-foreground/70"}
        rounded="rounded-lg sm:rounded-xl"
        isCurrentUser={isCurrentUser}
      />

      {/* Name + progress bar */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
          <p
            className={`text-xs sm:text-sm font-semibold truncate ${isCurrentUser ? "text-primary" : ""
              }`}
          >
            {isCurrentUser ? `${entry.name} (You)` : entry.name}
          </p>
          {isCurrentUser && (
            <Badge
              variant="outline"
              className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0 border-primary text-primary shrink-0 hidden xs:inline-flex"
            >
              You
            </Badge>
          )}
        </div>
        <div className="h-1 sm:h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${isCurrentUser
              ? "bg-primary"
              : "bg-muted-foreground/40 group-hover:bg-primary/50"
              }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Score column */}
      <div className="text-right shrink-0">
        <p
          className={`text-xs sm:text-sm font-bold ${isCurrentUser ? "text-primary" : ""
            }`}
        >
          {getScoreLabel(entry, tab)}
        </p>
        {tab === "overall" && (
          <p className="text-[9px] sm:text-[10px] text-muted-foreground hidden sm:block">
            {entry.avgScore}% • {entry.completedLessons} lessons
          </p>
        )}
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const Leaderboard = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<FilterTab>("overall");

  const sorted = getSortedData(MOCK_CLASS_DATA, activeTab);

  // Current user's rank (mock: the entry named "You" represents the logged-in student)
  const currentUserRank = sorted.findIndex((e) => e.name === "You") + 1;
  const currentUserEntry = MOCK_CLASS_DATA.find((e) => e.name === "You");

  // Podium: 2nd left, 1st center (tallest), 3rd right
  const podiumOrder: [LeaderboardEntry, LeaderboardEntry, LeaderboardEntry] = [
    sorted[1],
    sorted[0],
    sorted[2],
  ];

  const tabs: { key: FilterTab; label: string; icon: React.ReactNode }[] = [
    { key: "overall", label: "Overall", icon: <TrendingUp className="h-3.5 w-3.5" /> },
    { key: "score", label: "By Score", icon: <Star className="h-3.5 w-3.5" /> },
    { key: "completion", label: "By Completion", icon: <BookOpen className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col gap-0.5 sm:gap-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight flex items-center gap-2">
          <Trophy className="h-6 w-6 sm:h-7 sm:w-7 text-amber-500 shrink-0" />
          Class Leaderboard
        </h1>
        <p className="text-sm text-muted-foreground">
          See how you rank against your classmates in academic performance.
        </p>
      </div>

      {/* My Rank Banner */}
      <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10 shadow-soft">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {/* Current user's profile picture or initials */}
              <StudentAvatar
                name={user?.name || "You"}
                profilePicture={user?.profilePicture}
                size="h-10 w-10 sm:h-12 sm:w-12"
                bgColor="bg-primary"
                rounded="rounded-xl sm:rounded-2xl"
                isCurrentUser
              />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground">Your current rank</p>
                <p className="text-lg sm:text-xl font-black text-primary leading-tight">
                  #{currentUserRank} in your class
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] sm:text-sm text-muted-foreground">Combined Score</p>
              <p className="text-xl sm:text-2xl font-black">
                {currentUserEntry?.combinedScore ?? "—"} pts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Tabs — scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border whitespace-nowrap shrink-0 ${activeTab === tab.key
              ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
              : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Podium */}
      <Card className="shadow-soft overflow-hidden">
        <CardHeader className="pb-0 pt-4 sm:pt-6 px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg">Top Performers</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            The leading students in your class
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
          <div className="flex items-end justify-center gap-2 sm:gap-6 pb-2">
            <PodiumCard
              entry={podiumOrder[0]}
              rank={2}
              isCurrentUser={podiumOrder[0].name === "You"}
              tab={activeTab}
            />
            <PodiumCard
              entry={podiumOrder[1]}
              rank={1}
              isCurrentUser={podiumOrder[1].name === "You"}
              tab={activeTab}
            />
            <PodiumCard
              entry={podiumOrder[2]}
              rank={3}
              isCurrentUser={podiumOrder[2].name === "You"}
              tab={activeTab}
            />
          </div>
        </CardContent>
      </Card>

      {/* Full Ranked List */}
      <Card className="shadow-soft">
        <CardHeader className="pb-3 px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg">Full Rankings</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            All students in your class
          </CardDescription>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-4 sm:pb-6">
          <div className="space-y-2">
            {sorted.map((entry, index) => (
              <RankRow
                key={entry.id}
                entry={entry}
                rank={index + 1}
                isCurrentUser={entry.name === "You"}
                tab={activeTab}
                currentUserPicture={user?.profilePicture}
                animationDelay={index * 40}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer note */}
      <p className="text-center text-[10px] sm:text-xs text-muted-foreground">
        Rankings update based on exam scores and lesson completion.
      </p>
    </div>
  );
};

export default Leaderboard;
