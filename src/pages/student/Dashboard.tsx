import React from "react";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/authStore";

const StudentDashboard = () => {
  const { user } = useAuthStore();

  const stats = [
    {
      title: "Courses Enrolled",
      value: "8",
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Completed Lessons",
      value: "24",
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

  const recentLessons = [
    {
      id: 1,
      title: "Introduction to Calculus",
      subject: "Mathematics",
      progress: 65,
      type: "Video",
    },
    {
      id: 2,
      title: "Quantum Mechanics Basics",
      subject: "Physics",
      progress: 30,
      type: "PDF",
    },
    {
      id: 3,
      title: "Organic Chemistry: Alkanes",
      subject: "Chemistry",
      progress: 90,
      type: "Video",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Welcome back, {user?.name || "Student"}! 👋
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your learning today.
        </p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Lessons */}
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Recent Lessons</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-muted hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    {lesson.type === "Video" ? (
                      <PlayCircle className="h-6 w-6 text-primary" />
                    ) : (
                      <FileText className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base truncate group-hover:text-primary transition-colors">
                      {lesson.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {lesson.subject}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge variant="secondary" className="mb-2">
                      {lesson.progress}%
                    </Badge>
                    <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden hidden sm:block">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${lesson.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
    </div>
  );
};

export default StudentDashboard;
