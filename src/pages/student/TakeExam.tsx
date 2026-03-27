import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Timer,
  Flag,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockQuestions = [
  {
    id: 1,
    question: "What is the result of 15 * 12?",
    options: ["160", "180", "190", "170"],
    correctAnswer: "180",
  },
  {
    id: 2,
    question: "Solve for x: 2x + 5 = 15",
    options: ["x = 5", "x = 10", "x = 7.5", "x = 20"],
    correctAnswer: "x = 5",
  },
  {
    id: 3,
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "14"],
    correctAnswer: "12",
  },
];

export default function TakeExam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [isFinished, setIsFinished] = useState(false);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0 || isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (option: string) => {
    setAnswers({
      ...answers,
      [mockQuestions[currentQuestionIndex].id]: option,
    });
  };

  const progress = (Object.keys(answers).length / mockQuestions.length) * 100;
  const currentQuestion = mockQuestions[currentQuestionIndex];

  if (isFinished) {
    const score = mockQuestions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);

    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6 text-center animate-fade-in">
        <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Exam Completed!</h2>
          <p className="text-muted-foreground mt-2">
            Your results have been submitted successfully.
          </p>
        </div>
        <div className="bg-card border p-8 rounded-3xl shadow-soft w-full max-w-sm">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-1">
            Your Score
          </p>
          <p className="text-5xl font-black text-primary">
            {Math.round((score / mockQuestions.length) * 100)}%
          </p>
          <div className="mt-6 pt-6 border-t flex justify-between text-sm">
            <div>
              <p className="text-muted-foreground">Correct</p>
              <p className="font-bold text-emerald-600">{score}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total</p>
              <p className="font-bold">{mockQuestions.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <p className="font-bold text-emerald-600">Passed</p>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/student/exams")}
          className="rounded-xl px-10 h-12"
        >
          Back to Exams
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 bg-background/95 backdrop-blur-sm z-20 py-4 border-b">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/student/exams")}
            className="rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Mathematics Unit 5 Quiz</h1>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Mathematics • 20 Questions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl border bg-card shadow-sm font-mono font-bold text-lg",
              timeLeft < 300
                ? "text-rose-500 border-rose-200 bg-rose-50 animate-pulse"
                : "border-border",
            )}
          >
            <Timer className="h-5 w-5" />
            {formatTime(timeLeft)}
          </div>
          <Button
            variant="prim"
            onClick={() => setIsFinished(true)}
            className="rounded-xl font-bold shadow-lg shadow-primary/20"
          >
            Finish Exam
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-bold">
          <span className="text-muted-foreground">Course Progress</span>
          <span className="text-primary">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {/* Question Card */}
          <Card className="rounded-3xl shadow-soft border-none overflow-hidden bg-card">
            <CardContent className="p-8">
              <div className="mb-8">
                <Badge
                  variant="secondary"
                  className="mb-4 bg-primary/10 text-primary border-none font-bold"
                >
                  Question {currentQuestionIndex + 1} of {mockQuestions.length}
                </Badge>
                <h2 className="text-2xl font-bold text-foreground leading-tight">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="grid gap-4">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option)}
                    className={cn(
                      "flex items-center justify-between p-5 rounded-2xl border-2 text-left transition-all duration-200 group relative overflow-hidden",
                      answers[currentQuestion.id] === option
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                        : "border-border hover:border-primary/40 hover:bg-muted/50",
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold transition-colors",
                          answers[currentQuestion.id] === option
                            ? "bg-primary text-white"
                            : "bg-muted group-hover:bg-primary/10",
                        )}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="font-semibold text-foreground">
                        {option}
                      </span>
                    </div>
                    {answers[currentQuestion.id] === option && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              disabled={currentQuestionIndex === 0}
              className="rounded-2xl px-6 h-12 border-2 hover:bg-muted transition-all"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-rose-500"
              >
                <Flag className="h-5 w-5" />
              </Button>
            </div>

            <Button
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              disabled={currentQuestionIndex === mockQuestions.length - 1}
              className="rounded-2xl px-8 h-12 bg-foreground text-background hover:bg-foreground/90 transition-all font-bold"
            >
              Next Question
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Sidebar Question Navigator */}
        <div className="space-y-6">
          <Card className="rounded-3xl shadow-soft border-none bg-card p-6 sticky top-24">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-primary" />
              Question Flow
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {mockQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all",
                    currentQuestionIndex === idx
                      ? "ring-2 ring-primary ring-offset-2 bg-primary text-white"
                      : answers[q.id]
                        ? "bg-emerald-500 text-white"
                        : "bg-muted text-muted-foreground hover:bg-primary/20",
                  )}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <div className="h-3 w-3 bg-emerald-500 rounded" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <div className="h-3 w-3 bg-primary rounded" />
                <span>Current</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <div className="h-3 w-3 bg-muted rounded" />
                <span>Not-Visited</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
