import React, { useState, useEffect } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DigitalCourse, CreateCoursePayload, CourseLevel, CourseStatus } from "@/types/digitalCourse.types";
import { Sparkles, Image as ImageIcon, Video, Link } from "lucide-react";

interface CourseFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCoursePayload) => void;
  initialData?: DigitalCourse | null;
  isSubmitting?: boolean;
}

const DEFAULT_FORM: CreateCoursePayload = {
  title: "",
  description: "",
  thumbnailUrl: "",
  videoUrl: "",
  externalUrl: "",
  durationMinutes: null,
  term: "First Term",
  pathway: "",
  level: "BEGINNER",
  status: "DRAFT",
};

export const CourseFormDialog: React.FC<CourseFormDialogProps> = ({
  isOpen, onClose, onSubmit, initialData, isSubmitting = false,
}) => {
  const [form, setForm] = useState<typeof DEFAULT_FORM & { durationStr: string }>({
    ...DEFAULT_FORM,
    durationStr: "",
  });

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        thumbnailUrl: initialData.thumbnailUrl || "",
        videoUrl: initialData.videoUrl || "",
        externalUrl: initialData.externalUrl || "",
        durationMinutes: initialData.durationMinutes,
        durationStr: initialData.durationMinutes?.toString() || "",
        term: initialData.term || "First Term",
        pathway: initialData.pathway || "",
        level: initialData.level || "BEGINNER",
        status: initialData.status || "DRAFT",
      });
    } else {
      setForm({ ...DEFAULT_FORM, durationStr: "" });
    }
  }, [initialData, isOpen]);

  const set = (field: string, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateCoursePayload = {
      title: form.title.trim(),
      description: form.description?.trim() || null,
      thumbnailUrl: form.thumbnailUrl?.trim() || null,
      videoUrl: form.videoUrl?.trim() || null,
      externalUrl: form.externalUrl?.trim() || null,
      durationMinutes: form.durationStr ? Number(form.durationStr) : null,
      term: (form.term as any) || null,
      pathway: form.pathway?.trim() || null,
      level: form.level as CourseLevel,
      status: form.status as CourseStatus,
    };
    onSubmit(payload);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl border-border">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-black text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {isEditMode ? "Edit Digital Course" : "Add New Digital Course"}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            {isEditMode
              ? "Update the course details. Only send fields you want to change."
              : "Create a new digital course. Only Title is required — all other fields are optional."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="basic" className="text-xs font-bold">1. Basic Info</TabsTrigger>
              <TabsTrigger value="media" className="text-xs font-bold">2. Media & Publishing</TabsTrigger>
            </TabsList>

            {/* TAB 1: BASIC INFO */}
            <TabsContent value="basic" className="space-y-3.5">
              {/* Title */}
              <div>
                <Label className="text-xs font-bold">Course Title <span className="text-destructive">*</span></Label>
                <Input
                  required
                  placeholder="e.g. Python Programming"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  className="h-10 mt-1"
                />
              </div>

              {/* Description */}
              <div>
                <Label className="text-xs font-bold">Description <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <Textarea
                  rows={3}
                  placeholder="Describe the course objectives and what students will learn..."
                  value={form.description || ""}
                  onChange={(e) => set("description", e.target.value)}
                  className="mt-1 resize-none"
                />
              </div>

              {/* Level + Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-bold">Difficulty Level</Label>
                  <Select value={form.level} onValueChange={(v) => set("level", v)}>
                    <SelectTrigger className="h-10 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BEGINNER">Beginner</SelectItem>
                      <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                      <SelectItem value="ADVANCED">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-bold">Status</Label>
                  <Select value={form.status} onValueChange={(v) => set("status", v)}>
                    <SelectTrigger className="h-10 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Term + Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-bold">Academic Term</Label>
                  <Select value={form.term || ""} onValueChange={(v) => set("term", v || null)}>
                    <SelectTrigger className="h-10 mt-1">
                      <SelectValue placeholder="Select Term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="First Term">First Term</SelectItem>
                      <SelectItem value="Second Term">Second Term</SelectItem>
                      <SelectItem value="Third Term">Third Term</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-bold">Duration (minutes)</Label>
                  <Input
                    type="number"
                    min={1}
                    placeholder="e.g. 120"
                    value={form.durationStr}
                    onChange={(e) => set("durationStr", e.target.value)}
                    className="h-10 mt-1"
                  />
                </div>
              </div>

              {/* Pathway */}
              <div>
                <Label className="text-xs font-bold">
                  Specialisation Pathway <span className="text-muted-foreground font-normal">(SS3 only, optional)</span>
                </Label>
                <Input
                  placeholder="e.g. Software & Web Development"
                  value={form.pathway || ""}
                  onChange={(e) => set("pathway", e.target.value)}
                  className="h-10 mt-1"
                />
              </div>
            </TabsContent>

            {/* TAB 2: MEDIA & PUBLISHING */}
            <TabsContent value="media" className="space-y-3.5">
              {/* Thumbnail */}
              <div>
                <Label className="text-xs font-bold flex items-center gap-1.5">
                  <ImageIcon className="h-3.5 w-3.5 text-primary" />
                  Thumbnail Image URL
                </Label>
                <Input
                  placeholder="https://example.com/thumbnail.jpg"
                  value={form.thumbnailUrl || ""}
                  onChange={(e) => set("thumbnailUrl", e.target.value)}
                  className="h-10 mt-1"
                />
                {form.thumbnailUrl && (
                  <div className="mt-2 h-24 w-full rounded-lg overflow-hidden bg-slate-900 border border-border">
                    <img
                      src={form.thumbnailUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
                    />
                  </div>
                )}
              </div>

              {/* Video URL */}
              <div>
                <Label className="text-xs font-bold flex items-center gap-1.5">
                  <Video className="h-3.5 w-3.5 text-primary" />
                  Video URL <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Input
                  placeholder="https://example.com/course-intro.mp4"
                  value={form.videoUrl || ""}
                  onChange={(e) => set("videoUrl", e.target.value)}
                  className="h-10 mt-1"
                />
              </div>

              {/* External URL */}
              <div>
                <Label className="text-xs font-bold flex items-center gap-1.5">
                  <Link className="h-3.5 w-3.5 text-primary" />
                  External Resource URL <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Input
                  placeholder="https://example.com/course-materials"
                  value={form.externalUrl || ""}
                  onChange={(e) => set("externalUrl", e.target.value)}
                  className="h-10 mt-1"
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  Link to an external LMS, slide deck, or reading material.
                </p>
              </div>

              {/* Status summary */}
              <div className="p-3 rounded-xl bg-muted/40 border border-border text-xs space-y-1">
                <p className="font-bold text-foreground">Publishing Note</p>
                <p className="text-muted-foreground">
                  Courses set to <strong>DRAFT</strong> are only visible to Super Admins.
                  Set to <strong>PUBLISHED</strong> to make the course available for school assignment.
                  Students will only see courses assigned to their class.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="pt-3 border-t border-border flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-10 rounded-xl font-bold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !form.title.trim()}
              className="h-10 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting
                ? "Saving..."
                : isEditMode
                  ? "Save Changes"
                  : "Create Digital Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
