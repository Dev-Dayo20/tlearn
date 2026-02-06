import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlayCircle, FileText, Download, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Lessons = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const lessons = [
    {
      id: 1,
      title: "Algebraic Expressions",
      subject: "Mathematics",
      description:
        "Learn about variables, coefficients, and simplifying expressions.",
      type: "Video",
      duration: "15 mins",
      date: "2024-02-01",
    },
    {
      id: 2,
      title: "Cell Structure and Function",
      subject: "Biology",
      description: "Deep dive into animal and plant cells.",
      type: "PDF",
      size: "2.4 MB",
      date: "2024-01-28",
    },
    {
      id: 3,
      title: "The Industrial Revolution",
      subject: "History",
      description: "Impact of technological advancements in the 18th century.",
      type: "Video",
      duration: "22 mins",
      date: "2024-01-25",
    },
    {
      id: 4,
      title: "Waves and Sound",
      subject: "Physics",
      description: "Understanding properties of waves and how sound travels.",
      type: "Video",
      duration: "18 mins",
      date: "2024-01-20",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Lessons & Materials
          </h1>
          <p className="text-muted-foreground">
            Access your course content and study materials.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-card/50 p-4 rounded-2xl border border-muted/50 backdrop-blur-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for lessons..."
            className="pl-10 h-11 bg-background border-muted-foreground/20 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-11 rounded-xl px-4 shrink-0">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
        {lessons.map((lesson) => (
          <Card
            key={lesson.id}
            className="shadow-soft hover:shadow-md transition-all group overflow-hidden"
          >
            <div className="h-2 w-full bg-primary/20 group-hover:bg-primary transition-colors" />
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="space-y-1">
                <Badge variant="secondary" className="mb-2">
                  {lesson.subject}
                </Badge>
                <CardTitle className="text-xl group-hover:text-primary transition-colors cursor-pointer">
                  {lesson.title}
                </CardTitle>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                {lesson.type === "Video" ? (
                  <PlayCircle className="h-6 w-6 text-primary" />
                ) : (
                  <FileText className="h-6 w-6 text-primary" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {lesson.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium text-muted-foreground">
                  {lesson.type === "Video"
                    ? `Length: ${lesson.duration}`
                    : `Size: ${lesson.size}`}
                </div>
                <div className="flex gap-2">
                  {lesson.type === "PDF" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="default" className="rounded-xl px-4">
                    {lesson.type === "Video" ? "Watch Now" : "Read Online"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
