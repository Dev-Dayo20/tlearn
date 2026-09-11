import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BookOpen,
  Trophy,
  Clock,
  Star,
  PlayCircle,
  FileText,
  Crown,
  Medal,
  ChevronRight,
  Loader2,
  LucideIcon,
  IdCard,
  GraduationCap,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/authStore";
import { Link } from "react-router-dom";
import { fetchStudentLessons } from "@/services/api/student/studentLessonsApi";
import type { Lesson, LessonsStats } from "@/types/lessons.types";
import { MOCK_LESSONS } from "@/data/lessons.data";
import { formatTitleCase } from "@/lib/utils";
import { DigitalCoursesDashboardSection } from "@/components/student/dashboard/DigitalCoursesDashboardSection";

// ─── Leaderboard Preview Row (extracted to honour Rules of Hooks) ─────────────
interface PreviewEntry {
  rank: number;
  name: string;
  score: number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  profilePicture: string | null;
}

const LeaderboardPreviewRow = ({ entry }: { entry: PreviewEntry }) => {
  const [imgErr, setImgErr] = useState(false);
  const showImg = entry.profilePicture && !imgErr;
  const IconComp = entry.icon;
  const initials = entry.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-muted hover:bg-muted/40 transition-colors">
      {/* Avatar with medal overlay */}
      <div className="relative shrink-0">
        <div
          className={`h-9 w-9 rounded-xl ${
            showImg ? "" : entry.iconBg
          } flex items-center justify-center overflow-hidden`}
        >
          {showImg ? (
            <img
              src={entry.profilePicture!}
              alt={entry.name}
              className="h-full w-full object-cover"
              onError={() => setImgErr(true)}
            />
          ) : (
            <span className={`text-xs font-bold ${entry.iconColor}`}>
              {initials}
            </span>
          )}
        </div>
        <div className="absolute -top-1.5 -right-1.5 rounded-full bg-background p-0.5 shadow-sm">
          <IconComp className={`h-3 w-3 ${entry.iconColor}`} />
        </div>
      </div>

      {/* Name + progress bar */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{entry.name}</p>
        <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary/60 rounded-full"
            style={{ width: `${entry.score}%` }}
          />
        </div>
      </div>

      <Badge variant="secondary" className="shrink-0 font-bold">
        #{entry.rank}
      </Badge>
    </div>
  );
};

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoadingLessons, setIsLoadingLessons] = useState(true);
  const [statsData, setStatsData] = useState<LessonsStats | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Resolve formatted student metadata with robust fallbacks
  const studentIdDisplay =
    user?.studentId ||
    user?.registrationNumber ||
    user?.regNumber ||
    (user?.id ? `STU-${String(user.id).padStart(4, "0")}` : "STU-0024");

  const classDisplay =
    typeof user?.class === "object" && user?.class !== null
      ? formatTitleCase((user.class as { id: number; name: string }).name || "")
      : user?.className
        ? formatTitleCase(user.className)
        : typeof user?.class === "string" && user?.class
          ? formatTitleCase(user.class)
          : "Primary 1";

  const armDisplay =
    typeof user?.arm === "object" && user?.arm !== null
      ? (user.arm as { id: number; name: string }).name
      : user?.armName
        ? String(user.armName)
        : typeof user?.arm === "string" && user?.arm
          ? user.arm
          : "Diamond";

  const handleCopyStudentId = () => {
    if (studentIdDisplay) {
      navigator.clipboard.writeText(String(studentIdDisplay));
      setCopiedId(true);
      toast.success("Student ID copied to clipboard!");
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadDashboardLessons = async () => {
      setIsLoadingLessons(true);
      try {
        const response = await fetchStudentLessons({
          limit: 5,
          sortBy: "date",
          sortOrder: "desc",
        });
        if (isMounted && response.success) {
          setLessons(response.lessons || []);
          if (response.stats) setStatsData(response.stats);
        }
      } catch (error) {
        console.warn("Failed to fetch student lessons for dashboard:", error);
      } finally {
        if (isMounted) setIsLoadingLessons(false);
      }
    };

    loadDashboardLessons();
    return () => {
      isMounted = false;
    };
  }, []);

  const stats = [
    {
      title: "Courses Enrolled",
      value: statsData?.totalLessons ? String(statsData.totalLessons) : "8",
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Completed Lessons",
      value:
        statsData?.completedCount !== undefined
          ? String(statsData.completedCount)
          : "24",
      icon: Trophy,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      title: "Average Score",
      value: "88%",
      icon: Star,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      title: "Study Hours",
      value: "32h",
      icon: Clock,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  const displayedLessons = lessons.length > 0 ? lessons : MOCK_LESSONS;

  // Mini leaderboard data (top 3 + current user position)
  const leaderboardPreview = [
    {
      rank: 1,
      name: "Amara Okonkwo",
      score: 95,
      icon: Crown,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
      profilePicture: null as string | null,
    },
    {
      rank: 2,
      name: "Tobenna Eze",
      score: 90,
      icon: Trophy,
      iconColor: "text-slate-500",
      iconBg: "bg-slate-50",
      profilePicture: null as string | null,
    },
    {
      rank: 3,
      name: "Chisom Adeyemi",
      score: 86,
      icon: Medal,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-50",
      profilePicture: null as string | null,
    },
  ];

  const myRank = 5;

  return (
    <div className="space-y-6">
      {/* Welcome & Student Identity Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 p-5 sm:p-6 lg:p-7 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/[0.04] to-background border border-primary/15 dark:border-primary/20 shadow-sm relative overflow-hidden">
        {/* Subtle decorative background ambient glow */}
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left: Greeting & Status Badge */}
        <div className="flex flex-col gap-2 relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Active Student Portal
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground">
            Welcome back, {user?.name ? formatTitleCase(user.name) : "Student"}!
            👋
          </h1>
          <p className="text-xs sm:text-sm font-medium text-muted-foreground leading-relaxed">
            Here's what's happening with your learning journey today. Pick up
            right where you left off!
          </p>
        </div>

        {/* Right: Dedicated Student Identity Space (Student ID & Class) */}
        <div className="relative z-10 w-full lg:w-auto shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-center gap-3 p-2 sm:p-2.5 rounded-2xl bg-card/85 dark:bg-slate-900/85 backdrop-blur-md border border-border/80 dark:border-border/60 shadow-soft">
            {/* Student ID Card */}
            <div
              onClick={handleCopyStudentId}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleCopyStudentId()}
              title="Click to copy Student ID"
              className="group flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-muted/40 hover:bg-muted/70 dark:bg-slate-800/40 dark:hover:bg-slate-800/70 border border-border/40 hover:border-primary/40 transition-all cursor-pointer select-none"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <IdCard className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-none">
                    Student ID
                  </p>
                  <p className="font-mono text-xs sm:text-sm font-black text-primary tracking-tight mt-1 truncate">
                    {studentIdDisplay}
                  </p>
                </div>
              </div>
              <div className="h-7 w-7 rounded-lg bg-background/80 dark:bg-slate-900/80 border border-muted/80 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-1">
                {copiedId ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </div>
            </div>

            {/* Class & Arm Card */}
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-muted/40 dark:bg-slate-800/40 border border-border/40 min-w-0">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-none">
                  Class & Arm
                </p>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-xs sm:text-sm font-black text-foreground tracking-tight truncate">
                    {classDisplay}
                  </span>
                  {armDisplay && (
                    <Badge
                      variant="secondary"
                      className="px-1.5 py-0 h-4 text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-300 border-none shrink-0"
                    >
                      {armDisplay}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="shadow-soft hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Digital Courses Tailored for Class Level */}
      <DigitalCoursesDashboardSection />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Lessons */}
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Lessons</CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </div>
            <Link
              to="/student/lessons"
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              View all <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent>
            {isLoadingLessons ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="text-sm font-medium">
                  Loading recent lessons...
                </span>
              </div>
            ) : (
              <div className="space-y-4">
                {displayedLessons.map((lesson) => {
                  const isVideo = lesson.type?.toLowerCase() === "video";
                  const videoSrc = lesson.videoUrl || (lesson as any).url;
                  return (
                    <Link
                      to="/student/lessons"
                      key={lesson.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-muted hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                      {isVideo && (lesson.thumbnailUrl || videoSrc) ? (
                        <div className="relative h-14 w-20 rounded-lg overflow-hidden bg-black/20 shrink-0 border border-muted/50">
                          {lesson.thumbnailUrl ? (
                            <img
                              src={lesson.thumbnailUrl}
                              alt={lesson.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <video
                              src={`${videoSrc}#t=0.1`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              preload="metadata"
                              muted
                              playsInline
                            />
                          )}
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <PlayCircle className="h-5 w-5 text-white fill-white/20" />
                          </div>
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          {isVideo ? (
                            <PlayCircle className="h-6 w-6 text-primary" />
                          ) : (
                            <FileText className="h-6 w-6 text-primary" />
                          )}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base truncate group-hover:text-primary transition-colors">
                          {formatTitleCase(lesson.title)}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {formatTitleCase(lesson.subject)}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <Badge variant="secondary" className="mb-2">
                          {lesson.progress || 0}%
                        </Badge>
                        <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden hidden sm:block">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${lesson.progress || 0}%` }}
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Exams</CardTitle>
            <CardDescription>Don't miss these!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 p-3 rounded-xl bg-orange-50 border border-orange-100">
                <div className="h-10 w-10 rounded-lg bg-orange-100 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-orange-600 uppercase">
                    Feb
                  </span>
                  <span className="text-sm font-bold text-orange-700">12</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-orange-900 leading-tight">
                    Physics Mid-term
                  </h4>
                  <p className="text-xs text-orange-700 mt-1">
                    10:00 AM • 2 Hours
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-3 rounded-xl bg-blue-50 border border-blue-100">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-blue-600 uppercase">
                    Feb
                  </span>
                  <span className="text-sm font-bold text-blue-700">15</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-blue-900 leading-tight">
                    English Essay
                  </h4>
                  <p className="text-xs text-blue-700 mt-1">
                    09:00 AM • 1 Hour
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard Preview */}
      <Card className="shadow-soft">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                Class Leaderboard
              </CardTitle>
              <CardDescription>Top performers in your class</CardDescription>
            </div>
            <Link
              to="/student/leaderboard"
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboardPreview.map((entry) => (
              <LeaderboardPreviewRow key={entry.rank} entry={entry} />
            ))}
          </div>

          {/* Current user rank */}
          <div className="mt-4 flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
            <p className="text-sm font-semibold text-muted-foreground">
              Your position
            </p>
            <p className="text-lg font-black text-primary">
              #{myRank} in class
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
