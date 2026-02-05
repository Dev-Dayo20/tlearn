import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Award,
  Clock,
  Loader2,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStudentAnalytics } from "@/services/api/admin/schLoginApi";
import api from "@/services/api/super-admin/super-admin"; // Direct API for student list for now
import { cn } from "@/lib/utils";

// Explicitly defining Student interface for the dropdown list query
interface StudentSummary {
  id: number;
  name: string;
  class: { name: string } | null;
}

const Analytics = () => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [open, setOpen] = useState(false);

  // 1. Fetch Students for Dropdown (Simple fetch for now, can be optimized to search later)
  const { data: studentsData, isLoading: isLoadingStudents } = useQuery({
    queryKey: ["students-list"],
    queryFn: async () => {
      const response = await api.get("/sch-admin/students?page=1&pageSize=100"); // Get a reasonable number for dropdown
      return response.data.students as StudentSummary[];
    },
  });

  // 2. Select first student automatically when load
  useEffect(() => {
    if (studentsData && studentsData.length > 0 && !selectedStudentId) {
      setSelectedStudentId(studentsData[0].id.toString());
    }
  }, [studentsData, selectedStudentId]);

  // 3. Fetch Analytics for Selected Student
  const { data: analyticsData, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ["studentAnalytics", selectedStudentId],
    queryFn: () => fetchStudentAnalytics(selectedStudentId),
    enabled: !!selectedStudentId,
  });

  if (isLoadingAnalytics || (isLoadingStudents && !studentsData)) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }

  // Safe access to data with fallback
  const student = analyticsData?.analytics?.student;
  const details = analyticsData?.analytics?.studentDetails;

  if (!student || !details) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Student Analytics
          </h1>
          <p className="text-muted-foreground">Individual progress tracking</p>
        </div>

        {/* Student Selector even if no data selected yet */}
        <div className="mb-6 rounded-2xl bg-card p-4 shadow-soft">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full sm:w-[400px] justify-between"
              >
                {selectedStudentId
                  ? studentsData?.find(
                      (s) => s.id.toString() === selectedStudentId,
                    )?.name +
                    " - " +
                    (studentsData?.find(
                      (s) => s.id.toString() === selectedStudentId,
                    )?.class?.name || "No Class")
                  : "Search student..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full sm:w-[400px] p-0">
              <Command>
                <CommandInput placeholder="Search by name or class..." />
                <CommandList>
                  <CommandEmpty>No student found.</CommandEmpty>
                  <CommandGroup>
                    {studentsData?.map((student) => (
                      <CommandItem
                        key={student.id}
                        value={`${student.name} ${student.class?.name || ""}`}
                        onSelect={() => {
                          setSelectedStudentId(student.id.toString());
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedStudentId === student.id.toString()
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        <div className="flex flex-col">
                          <span className="font-medium">{student.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {student.class?.name || "No Class"}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="rounded-2xl bg-card p-6 shadow-soft text-center text-muted-foreground">
          {isLoadingAnalytics
            ? "Loading data..."
            : "Select a student to view analytics."}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Student Analytics
        </h1>
        <p className="text-muted-foreground">Individual progress tracking</p>
      </div>

      {/* Student Selector - Combobox with Search */}
      <div className="mb-6 rounded-2xl bg-card p-4 shadow-soft">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full sm:w-[400px] justify-between"
            >
              {selectedStudentId
                ? studentsData?.find(
                    (s) => s.id.toString() === selectedStudentId,
                  )?.name +
                  " - " +
                  (studentsData?.find(
                    (s) => s.id.toString() === selectedStudentId,
                  )?.class?.name || "No Class")
                : "Search student..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full sm:w-[400px] p-0">
            <Command>
              <CommandInput placeholder="Search by name or class..." />
              <CommandList>
                <CommandEmpty>No student found.</CommandEmpty>
                <CommandGroup>
                  {studentsData?.map((student) => (
                    <CommandItem
                      key={student.id}
                      value={`${student.name} ${student.class?.name || ""}`}
                      onSelect={() => {
                        setSelectedStudentId(student.id.toString());
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedStudentId === student.id.toString()
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{student.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {student.class?.name || "No Class"}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-2xl bg-card p-6 shadow-soft">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary">
              {student.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                {student.name}
              </h3>
              <Badge
                variant="outline"
                className={`mt-1 border-opacity-20 ${
                  student.enrollmentStatus === "Active"
                    ? "bg-success/10 text-success border-success"
                    : "bg-warning/10 text-warning border-warning"
                }`}
              >
                {student.enrollmentStatus}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{student.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{student.phone || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{student.class}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">
                Joined {new Date(student.joinedDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mt-6 rounded-xl bg-secondary p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Overall Progress
              </span>
              <span className="text-lg font-bold text-primary">
                {student.progress}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${student.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="lg:col-span-2 rounded-2xl bg-card p-6 shadow-soft">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Progress Timeline
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              {details.progressTimeline &&
              details.progressTimeline.length > 0 ? (
                <LineChart data={details.progressTimeline}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="week"
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    name="Progress"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="completion"
                    name="Completion"
                    stroke="hsl(var(--success))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--success))", strokeWidth: 2 }}
                  />
                </LineChart>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  No timeline data available
                </div>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Subject Performance & Materials */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Subject Performance Radar */}
        <div className="rounded-2xl bg-card p-6 shadow-soft">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Subject Performance
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {details.subjectPerformance &&
              details.subjectPerformance.length > 0 ? (
                <RadarChart data={details.subjectPerformance}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 10,
                    }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  No performance data available
                </div>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Materials Status */}
        <div className="rounded-2xl bg-card p-6 shadow-soft">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Materials Status
          </h3>

          <div className="mb-4">
            <div className="mb-2 flex items-center gap-2">
              <Award className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-foreground">
                Completed
              </span>
            </div>
            <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
              {details.completedMaterials &&
              details.completedMaterials.length > 0 ? (
                details.completedMaterials.map((material, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-success/5 p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {material.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {material.date}
                      </p>
                    </div>
                    <Badge className="bg-success/10 text-success">
                      {material.score}%
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No completed materials yet
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent-foreground" />
              <span className="text-sm font-medium text-foreground">
                Pending
              </span>
            </div>
            <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
              {details.pendingMaterials &&
              details.pendingMaterials.length > 0 ? (
                details.pendingMaterials.map((material, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-accent/10 p-3"
                  >
                    <p className="text-sm font-medium text-foreground">
                      {material.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      Due: {material.dueDate}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No pending materials
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
