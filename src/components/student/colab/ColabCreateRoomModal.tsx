import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Sparkles,
  Users2,
  PenTool,
  Radio,
  BookOpen,
  HelpCircle,
  Clock,
} from "lucide-react";
import type { ColabRoomType, CreateColabRoomDto } from "@/types/colab.types";

interface ColabCreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dto: CreateColabRoomDto) => void;
  isSubmitting: boolean;
  studentClassLevel: string;
}

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English Literature",
  "Economics",
];

const ROOM_FORMATS: { id: ColabRoomType; label: string; desc: string; icon: any }[] = [
  {
    id: "LIVE_AUDIO_VIDEO",
    label: "Live Stage Room",
    desc: "Audio, video, screen share & live whiteboard collaboration",
    icon: Radio,
  },
  {
    id: "DOUBT_CLEARING",
    label: "Doubt Clearing Desk",
    desc: "Upvotable student question queue with step-by-step solutions",
    icon: HelpCircle,
  },
  {
    id: "EXAM_PREP",
    label: "Exam Sprint Circle",
    desc: "Timed speed practice solving past exam questions",
    icon: BookOpen,
  },
  {
    id: "STUDY_LOUNGE",
    label: "Silent Study & Co-working",
    desc: "Focus study room with synchronized Pomodoro intervals",
    icon: Clock,
  },
];

export const ColabCreateRoomModal: React.FC<ColabCreateRoomModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  studentClassLevel,
}) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Mathematics");
  const [roomType, setRoomType] = useState<ColabRoomType>("LIVE_AUDIO_VIDEO");
  const [description, setDescription] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("15");
  const [enableWhiteboard, setEnableWhiteboard] = useState(true);
  const [enableFocusTimer, setEnableFocusTimer] = useState(true);
  const [tagsInput, setTagsInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject) return;

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      subject,
      roomType,
      classLevel: studentClassLevel,
      maxParticipants: parseInt(maxParticipants) || 15,
      tags: tags.length > 0 ? tags : [subject, "Peer Study"],
      enableWhiteboard,
      enableFocusTimer,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
        <DialogHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </span>
            <DialogTitle className="text-xl sm:text-2xl font-black text-foreground">
              Host a Live Study Room
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Invite classmates to collaborate, share whiteboards, and work through problems live.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {/* Room Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs font-bold text-foreground">
              Study Room Title <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Physics Chapter 3: Vector Calculations & Forces"
              required
              className="rounded-2xl h-11 bg-muted/30 border-border text-xs sm:text-sm"
            />
          </div>

          {/* Subject & Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-foreground">
                Subject <span className="text-rose-500">*</span>
              </Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="rounded-2xl h-11 bg-muted/30 border-border text-xs sm:text-sm">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {SUBJECTS.map((sub) => (
                    <SelectItem key={sub} value={sub} className="text-xs sm:text-sm">
                      {sub}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-foreground">
                Max Participants
              </Label>
              <Select value={maxParticipants} onValueChange={setMaxParticipants}>
                <SelectTrigger className="rounded-2xl h-11 bg-muted/30 border-border text-xs sm:text-sm">
                  <SelectValue placeholder="Select limit" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="5">Small Group (5 peers)</SelectItem>
                  <SelectItem value="10">Standard Group (10 peers)</SelectItem>
                  <SelectItem value="15">Extended Class (15 peers)</SelectItem>
                  <SelectItem value="25">Workshop Hall (25 peers)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Room Format Selection */}
          <div className="space-y-2">
            <Label className="text-xs font-bold text-foreground">
              Room Format & Style
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ROOM_FORMATS.map((fmt) => {
                const isSelected = roomType === fmt.id;
                const IconComp = fmt.icon;
                return (
                  <div
                    key={fmt.id}
                    onClick={() => setRoomType(fmt.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-border/80 bg-card"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-7 w-7 rounded-lg flex items-center justify-center ${
                          isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <IconComp className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-black text-foreground">
                        {fmt.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                      {fmt.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="desc" className="text-xs font-bold text-foreground">
              What will be covered? (Optional)
            </Label>
            <Textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Solving 2024 past paper questions together. Bring your calculator and notes."
              rows={2}
              className="rounded-2xl bg-muted/30 border-border text-xs resize-none"
            />
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <Label htmlFor="tags" className="text-xs font-bold text-foreground">
              Tags (Comma separated)
            </Label>
            <Input
              id="tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Vectors, WAEC Prep, Calculations"
              className="rounded-2xl h-10 bg-muted/30 border-border text-xs"
            />
          </div>

          {/* Toggles: Whiteboard & Pomodoro */}
          <div className="pt-2 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-foreground">
                  Interactive Collaborative Whiteboard
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Allow students to draw, write formulas, and annotate together
                </p>
              </div>
              <Switch
                checked={enableWhiteboard}
                onCheckedChange={setEnableWhiteboard}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-foreground">
                  Pomodoro Focus Timer
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Include 25-minute focus intervals and 5-minute break chimes
                </p>
              </div>
              <Switch
                checked={enableFocusTimer}
                onCheckedChange={setEnableFocusTimer}
              />
            </div>
          </div>

          <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-2xl h-11 text-xs font-bold w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="rounded-2xl h-11 bg-primary text-primary-foreground font-black text-xs shadow-md shadow-primary/20 w-full sm:w-auto px-6"
            >
              {isSubmitting ? "Launching..." : "Launch Live Room"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
