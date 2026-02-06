import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ClipboardCheck,
  Calendar,
  Clock,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Exams = () => {
  const availableExams = [
    {
      id: 1,
      title: "Mathematics Unit 5 Quiz",
      subject: "Mathematics",
      questions: 20,
      duration: "30 mins",
      points: 100,
      deadline: "Today, 11:59 PM",
    },
    {
      id: 2,
      title: "General Science Assessment",
      subject: "Science",
      questions: 40,
      duration: "60 mins",
      points: 200,
      deadline: "Tomorrow, 02:00 PM",
    },
  ];

  const pastExams = [
    {
      id: 101,
      title: "English Term 1 Exam",
      score: 85,
      date: "2024-01-15",
      status: "Passed",
    },
    {
      id: 102,
      title: "Geography Mock Test",
      score: 42,
      date: "2024-01-10",
      status: "Failed",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Exams & Assessments
        </h1>
        <p className="text-muted-foreground">
          Take tests and view your academic performance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Exams */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            Available Now
          </h2>
          {availableExams.map((exam) => (
            <Card
              key={exam.id}
              className="shadow-soft hover:shadow-md transition-all border-l-4 border-l-primary"
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{exam.subject}</Badge>
                      <span className="text-xs text-rose-500 font-bold flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Due: {exam.deadline}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{exam.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <ClipboardCheck className="h-4 w-4" />
                        {exam.questions} Questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {exam.duration}
                      </span>
                      <span className="flex items-center gap-1 font-medium text-emerald-600">
                        {exam.points} Points
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center shrink-0">
                    <Button className="w-full sm:w-auto rounded-xl px-8 py-6 group">
                      Proceed to Exam
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Exam History */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Recent History
          </h2>
          <Card className="shadow-soft">
            <CardContent className="p-0">
              <div className="divide-y">
                {pastExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-semibold truncate pr-2">
                        {exam.title}
                      </h4>
                      <Badge
                        variant={
                          exam.status === "Passed" ? "secondary" : "destructive"
                        }
                        className={
                          exam.status === "Passed"
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                            : ""
                        }
                      >
                        {exam.score}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{exam.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/10 shadow-soft">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Exam Readiness</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You've completed 85% of required assessments for this term. Keep
                it up!
              </p>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[85%]" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Exams;
