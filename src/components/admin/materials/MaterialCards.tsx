import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  FileText,
  HelpCircle,
  Clock,
  Download,
  Eye,
  Calendar,
  MoreVertical,
  Trash2,
  Pencil,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Material, MaterialType } from "@/types/types";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Helper function to capitalize first letter of each word
const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Helper function for sentence case
const toSentenceCase = (str: string) => {
  if (!str) return "";
  const cleaned = str.trim().toLowerCase();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};

interface MaterialCardProps {
  material: Material;
  onView?: (material: Material) => void;
  onDelete?: (material: Material) => void;
  onEdit?: (material: Material) => void;
}

export function MaterialCard({
  material,
  onView,
  onDelete,
  onEdit,
}: MaterialCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  // Infer type if not provided
  const inferType = (url: string): MaterialType => {
    const ext = url.split(".").pop()?.toLowerCase();
    if (["mp4", "mov", "avi", "mkv"].includes(ext || "")) return "video";
    if (["pdf", "doc", "docx", "ppt", "pptx", "tx", "csv"].includes(ext || ""))
      return "document";
    return "document"; // Default to document
  };

  const type = material.type || inferType(material.url);

  const typeIcons = {
    video: Play,
    document: FileText,
    quiz: HelpCircle,
  };

  const typeColors = {
    video: "bg-blue-100 text-blue-600 border-blue-200",
    document: "bg-emerald-100 text-emerald-600 border-emerald-200",
    quiz: "bg-amber-100 text-amber-600 border-amber-200",
  };

  const Icon = typeIcons[type] || FileText;

  const formatDuration = (duration: string | number | null | undefined) => {
    const seconds =
      typeof duration === "string" ? parseInt(duration, 10) : duration;
    if (!seconds || isNaN(seconds)) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="group relative bg-card rounded-2xl border border-muted/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Type Badge & Actions */}
      <div className="absolute top-3 left-3 z-10">
        <Badge
          className={cn(
            "rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border",
            typeColors[type],
          )}
        >
          <Icon className="w-3 h-3 mr-1" />
          {type}
        </Badge>
      </div>

      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-muted/50"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl w-40">
            <DropdownMenuLabel className="text-[10px] uppercase font-bold text-muted-foreground px-2 py-1.5">
              Manage
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onEdit?.(material)}
              className="rounded-lg gap-2 py-2"
            >
              <Pencil className="h-4 w-4 text-amber-500" />
              <span className="font-medium">Edit Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(material)}
              className="rounded-lg gap-2 py-2 text-rose-500 focus:text-rose-600 focus:bg-rose-50"
            >
              <Trash2 className="h-4 w-4" />
              <span className="font-medium">Delete Material</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Preview Area */}
      <div className="h-40 bg-muted/30 flex items-center justify-center relative overflow-hidden group/preview">
        {type === "video" ? (
          <>
            <video
              src={`${material.url}#t=0.1`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/preview:scale-110"
              preload="metadata"
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-black/20 group-hover/preview:bg-black/40 transition-colors flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-90 group-hover/preview:scale-100 transition-all duration-300">
                <Play className="w-6 h-6 fill-white" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent animate-pulse" />
            <Icon
              className={cn(
                "w-12 h-12 opacity-20",
                type === "document" ? "text-emerald-600" : "text-amber-600",
              )}
            />
          </>
        )}

        {type === "video" && material.duration && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono font-bold backdrop-blur-sm z-10">
            {formatDuration(material.duration)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div className="space-y-1">
          <h3 className="font-bold text-foreground leading-tight line-clamp-1 group-hover:text-primary transition-colors">
            {toTitleCase(material.title)}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2.5rem]">
            {toSentenceCase(material.description) || "No description provided."}
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <div className="flex items-center gap-2 bg-muted/30 px-2 py-1.5 rounded-lg border border-muted/50">
            <div className="h-5 w-5 rounded bg-white flex items-center justify-center shadow-sm">
              <Badge
                variant="outline"
                className="border-none p-0 text-[9px] font-black text-primary"
              >
                C
              </Badge>
            </div>
            <span className="text-[10px] font-bold truncate">
              {material.class?.name || "All Classes"}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-muted/30 px-2 py-1.5 rounded-lg border border-muted/50">
            <div className="h-5 w-5 rounded bg-white flex items-center justify-center shadow-sm">
              <Badge
                variant="outline"
                className="border-none p-0 text-[9px] font-black text-emerald-600"
              >
                A
              </Badge>
            </div>
            <span className="text-[10px] font-bold truncate">
              {material.arm?.name || "All Arms"}
            </span>
          </div>
          {material.subject && (
            <div className="flex items-center gap-2 bg-muted/30 px-2 py-1.5 rounded-lg border border-muted/50 col-span-2">
              <div className="h-5 w-5 rounded bg-white flex items-center justify-center shadow-sm">
                <Badge
                  variant="outline"
                  className="border-none p-0 text-[9px] font-black text-amber-600"
                >
                  S
                </Badge>
              </div>
              <span className="text-[10px] font-bold truncate">
                {material.subject.name}
              </span>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-muted/50 flex items-center justify-between mt-auto">
          <div className="flex items-center text-[10px] text-muted-foreground font-medium gap-1">
            <Calendar className="w-3 h-3" />
            {format(new Date(material.uploadedAt), "MMM d, yyyy")}
          </div>
          <div className="flex gap-1">
            {/* <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95"
              onClick={() => window.open(material.url, "_blank")}
            >
              <Download className="h-4 w-4" />
            </Button> */}
            <Button
              variant="prim"
              size="sm"
              className="h-8 rounded-lg px-3 font-bold text-xs shadow-sm hover:shadow-md transition-all active:scale-95"
              onClick={() => {
                if (type === "video") {
                  setIsPreviewOpen(true);
                } else {
                  onView?.(material);
                }
              }}
            >
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              {type === "video" ? "Preview" : "View"}
            </Button>
          </div>
        </div>
      </div>

      {/* Video Preview Modal */}
      {type === "video" && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none rounded-3xl">
            <DialogHeader className="p-4 absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
              <DialogTitle className="text-white font-bold flex items-center gap-2">
                <Play className="w-5 h-5 text-primary fill-primary" />
                {toTitleCase(material.title)}
              </DialogTitle>
            </DialogHeader>
            <div className="aspect-video w-full flex items-center justify-center">
              <video
                src={material.url}
                controls
                autoPlay
                className="w-full h-full"
                poster="/video-placeholder.png" // Optional placeholder
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-6 bg-card border-t border-muted/50">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20 text-[10px] font-bold uppercase py-0.5"
                    >
                      {material.class?.name}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-muted text-muted-foreground border-muted-foreground/20 text-[10px] font-bold uppercase py-0.5"
                    >
                      {material.arm?.name || "No Arm"}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground/80 font-medium">
                    {toSentenceCase(material.description)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsPreviewOpen(false)}
                    className="rounded-xl font-bold h-11 px-6 border-muted-foreground/20 hover:bg-muted"
                  >
                    Close
                  </Button>
                  {/* <Button
                    onClick={() => window.open(material.url, "_blank")}
                    className="rounded-xl font-bold gap-2 shrink-0 h-11 px-6 shadow-lg shadow-primary/20"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button> */}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
