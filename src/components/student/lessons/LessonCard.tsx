import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PlayCircle,
  Pause,
  FileText,
  Download,
  Clock,
  BookOpen,
  CheckCircle2,
  Eye,
  User,
  RotateCcw,
} from "lucide-react";

import { SUBJECT_THEME } from "@/data/lessons.constants";
import type { Lesson } from "@/types/lessons.types";
import { updateVideoProgress } from "@/services/api/student/studentLessonsApi";
import { formatTitleCase } from "@/lib/utils";

interface LessonCardProps {
  lesson: Lesson;
  onProgressUpdate?: (
    lessonId: number,
    progress: number,
    isCompleted?: boolean,
  ) => void;
}

export function LessonCard({ lesson, onProgressUpdate }: LessonCardProps) {
  const theme = SUBJECT_THEME[lesson.subject] || SUBJECT_THEME.Default;
  const isVideo = lesson.type?.toLowerCase() === "video";
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(lesson.progress || 0);

  useEffect(() => {
    setProgress(lesson.progress || 0);
  }, [lesson.progress]);

  const lastSentTimeRef = useRef<number>(0);
  const progressRef = useRef<number>(lesson.progress || 0);
  progressRef.current = progress;

  const handleSendProgress = async (
    watchedDuration: number,
    videoDuration: number,
  ) => {
    if (!videoDuration || videoDuration <= 0 || watchedDuration < 0) return;

    const rawPercent = Math.min(
      100,
      Math.round((watchedDuration / videoDuration) * 100),
    );
    // 90% threshold marks completion
    const isCompleted = rawPercent >= 90;
    const progressPercent = isCompleted ? 100 : rawPercent;

    if (progressPercent > progressRef.current) {
      setProgress(progressPercent);
      onProgressUpdate?.(lesson.id, progressPercent, isCompleted);
    }

    try {
      const response = await updateVideoProgress(lesson.id, {
        watchedDuration: Math.round(watchedDuration),
        videoDuration: Math.round(videoDuration),
      });

      if (response && response.success) {
        const returnedProgress = response.progress ?? progressPercent;
        const returnedCompleted = response.isCompleted ?? isCompleted;
        setProgress(returnedProgress);
        onProgressUpdate?.(lesson.id, returnedProgress, returnedCompleted);
      }
    } catch (error) {
      console.warn(
        `Failed to update video progress for lesson ${lesson.id}:`,
        error,
      );
    }
  };

  const isLessonCompleted = progress >= 90 || progress === 100;

  return (
    <Card className="tl-card overflow-hidden p-0 gap-0 flex flex-col justify-between">
      <div>
        {/* Banner Area: Interactive Video Interface for Video, Faded Fill Banner for PDF */}
        {isVideo ? (
          <div className="tl-video-container group">
            {isPlaying ? (
              <div className="relative w-full h-full bg-black">
                <video
                  src={lesson.videoUrl || (lesson as any).url}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                  onTimeUpdate={(e) => {
                    const v = e.currentTarget;
                    if (!v.duration) return;
                    const now = Date.now();
                    // Throttle progress trigger every 6 seconds
                    if (now - lastSentTimeRef.current >= 6000) {
                      lastSentTimeRef.current = now;
                      handleSendProgress(v.currentTime, v.duration);
                    }
                  }}
                  onPause={(e) => {
                    const v = e.currentTarget;
                    if (v.duration) {
                      handleSendProgress(v.currentTime, v.duration);
                    }
                  }}
                  onEnded={(e) => {
                    const v = e.currentTarget;
                    if (v.duration) {
                      handleSendProgress(v.duration, v.duration);
                    }
                  }}
                />
                <button
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-2 right-2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-1.5 backdrop-blur-md transition-colors"
                  title="Close player"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                className="relative w-full h-full cursor-pointer overflow-hidden"
                onClick={() => setIsPlaying(true)}
              >
                {/* Video Thumbnail background with subtle dark overlay */}
                {lesson.thumbnailUrl ? (
                  <img
                    src={lesson.thumbnailUrl}
                    alt={lesson.title}
                    className="w-full h-full object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-300"
                  />
                ) : lesson.videoUrl || (lesson as any).url ? (
                  <video
                    src={`${lesson.videoUrl || (lesson as any).url}#t=0.1`}
                    className="w-full h-full object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-300"
                    preload="metadata"
                    muted
                    playsInline
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: theme.bgColor }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                {/* Top overlay elements */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <Badge
                    variant="outline"
                    className="tl-icon-badge font-semibold text-xs px-2.5 py-0.5 rounded-lg shadow-sm"
                    style={{ color: theme.textColor }}
                  >
                    {formatTitleCase(lesson.subject)}
                  </Badge>

                  <span className="text-[10px] font-bold tracking-wider uppercase bg-black/60 text-white px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/20">
                    HD Video
                  </span>
                </div>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/40 transition-all shadow-xl">
                    <PlayCircle className="h-7 w-7 text-white fill-white/20" />
                  </div>
                </div>

                {/* Bottom overlay: Duration & Progress */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-medium z-10">
                  <span className="inline-flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm text-[11px]">
                    <Clock className="h-3 w-3 text-cyan-400" />
                    {lesson.duration || "Video"}
                  </span>
                  {progress > 0 && (
                    <span className="bg-primary/90 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                      {progress}% watched
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* PDF Faded Simple Fill Banner */
          <div
            className="tl-banner-faded flex items-center justify-between px-4"
            style={{
              backgroundColor: theme.bgColor,
              borderColor: theme.borderColor,
            }}
          >
            <Badge
              variant="outline"
              className="tl-icon-badge font-semibold text-xs px-3 py-1 rounded-lg shadow-sm"
              style={{
                color: theme.textColor,
                backgroundColor: theme.badgeBg,
                borderColor: theme.borderColor,
              }}
            >
              {formatTitleCase(lesson.subject)}
            </Badge>

            <div
              className="h-10 w-10 rounded-full flex items-center justify-center shadow-sm"
              style={{
                backgroundColor: theme.badgeBg,
                color: theme.textColor,
              }}
            >
              <FileText className="h-5 w-5" />
            </div>
          </div>
        )}

        <CardHeader className="pt-4 pb-0">
          <div className="flex items-start justify-between gap-3">
            <CardTitle
              className="tl-display text-lg leading-snug cursor-pointer hover:opacity-80 transition-opacity"
              style={{ color: "hsl(var(--primary))" }}
            >
              {formatTitleCase(lesson.title)}
            </CardTitle>
            {lesson.isNew && (
              <span className="tl-new-badge text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0">
                New
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-3">
          <p
            className="text-sm mb-3 line-clamp-2"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            {lesson.description}
          </p>

          {/* Instructor & Date details */}
          <div
            className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium mb-4 pt-2 border-t border-border/50"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            {lesson.instructorName && (
              <span className="inline-flex items-center gap-1 truncate max-w-[140px]">
                <User className="h-3.5 w-3.5 text-primary/70 shrink-0" />
                {lesson.instructorName}
              </span>
            )}

            <span className="inline-flex items-center gap-1">
              <BookOpen
                className="h-3.5 w-3.5"
                style={{ color: "hsl(var(--prim))" }}
              />
              {new Date(lesson.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>

            {lesson.viewsCount !== undefined && (
              <span className="inline-flex items-center gap-1 text-[11px] opacity-80">
                <Eye className="h-3 w-3" />
                {lesson.viewsCount}
              </span>
            )}
          </div>

          {isVideo && progress > 0 && progress < 100 && (
            <div className="tl-progress-track h-1.5 w-full mb-4">
              <div
                className="tl-progress-fill h-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            {isLessonCompleted ? (
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: "hsl(var(--success))" }}
              >
                <CheckCircle2 className="h-4 w-4" /> Completed
              </span>
            ) : (
              <span
                className="text-xs"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {!isVideo
                  ? "Not opened yet"
                  : progress > 0
                    ? `${progress}% completed`
                    : "Not started"}
              </span>
            )}

            <div className="flex items-center gap-2">
              {!isVideo ? (
                <a
                  href={lesson.pdfUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Button
                    variant="outline"
                    className="rounded-xl px-3.5 h-9 text-xs font-semibold gap-1.5"
                    style={{
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--primary))",
                    }}
                  >
                    <Download className="h-3.5 w-3.5" />
                    PDF {lesson.size ? `(${lesson.size})` : ""}
                  </Button>
                </a>
              ) : (
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="tl-btn-primary rounded-xl px-4 h-9 text-xs font-semibold gap-1.5"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-3.5 w-3.5" /> Pause
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-3.5 w-3.5" />
                      {progress > 0 ? "Resume Video" : "Play Video"}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
