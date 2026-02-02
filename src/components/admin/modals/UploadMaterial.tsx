import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  FileVideo,
  FileText,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFetchClassesList } from "@/hooks/useSchAdmHooks";
import { uploadMaterial } from "@/services/api/admin/schLoginApi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UploadMaterialModalProps {
  open: boolean;
  onClose: () => void;
}

const createMaterialSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  classId: z.string().min(1, "Class is required"),
  armId: z.string().optional(),
  subjectId: z.string().optional(),
});

type FormValues = z.infer<typeof createMaterialSchema>;

export function UploadMaterial({ open, onClose }: UploadMaterialModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const queryClient = useQueryClient();

  const { data: classesData } = useFetchClassesList();
  const classes = classesData?.classes || [];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(createMaterialSchema),
    defaultValues: {
      title: "",
      description: "",
      classId: "",
      armId: "all",
      subjectId: "all",
    },
  });

  const selectedClassId = watch("classId");
  const selectedClass = classes.find(
    (c: any) => c.id.toString() === selectedClassId,
  );
  const arms = selectedClass?.arms || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    formData.append("classId", data.classId);
    if (data.armId && data.armId !== "all")
      formData.append("armId", data.armId);
    if (data.subjectId && data.subjectId !== "all")
      formData.append("subjectId", data.subjectId);
    formData.append("video", file);

    try {
      await uploadMaterial(formData);
      toast.success("Material uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      handleClose();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to upload material");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    reset();
    onClose();
  };

  const getFileIcon = () => {
    if (!file) return <Upload className="w-10 h-10 text-muted-foreground/40" />;
    if (file.type.startsWith("video/"))
      return <FileVideo className="w-10 h-10 text-blue-500" />;
    return <FileText className="w-10 h-10 text-emerald-500" />;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh] p-0 rounded-3xl border-none shadow-2xl">
        <div className="bg-gradient-to-br from-primary/10 via-background to-background p-6 border-b border-muted/50">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-prim/10 flex items-center justify-center text-primary">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black text-foreground">
                  Upload Learning Material
                </DialogTitle>
                <DialogDescription className="font-medium text-muted-foreground">
                  Videos, documents, and interactive content for your students.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* File Upload Area */}
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">
              Select Material File
            </Label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={cn(
                "relative group flex flex-col items-center justify-center py-10 px-6 rounded-3xl border-2 border-dashed transition-all duration-300",
                dragActive
                  ? "border-primary bg-primary/5 scale-[0.99]"
                  : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30",
                file ? "bg-muted/10 border-solid border-primary/20" : "",
              )}
            >
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleFileChange}
                accept="video/*,.pdf,.doc,.docx,.ppt,.pptx,.txt"
              />
              <div className="flex flex-col items-center text-center gap-4">
                <div
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-inner",
                    file ? "bg-primary/10" : "bg-muted/50",
                  )}
                >
                  {getFileIcon()}
                </div>
                {file ? (
                  <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <p className="text-sm font-bold text-foreground">
                      {file.name}
                    </p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded-full inline-block">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB •{" "}
                      {file.type.split("/")[1] || "File"}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="absolute top-4 right-4 p-2 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all z-20"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">
                      Click or drag & drop to upload
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">
                      MP4, PDF, DOCX, PPTX up to 100MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="title"
                className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1"
              >
                Material Title
              </Label>
              <Input
                id="title"
                placeholder="e.g., Introduction to Quadratic Equations"
                className={cn(
                  "h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 focus:ring-2 focus:ring-primary/20 transition-all font-semibold",
                  errors.title && "border-rose-500 focus:ring-rose-200",
                )}
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs font-bold text-rose-500 flex items-center gap-1 ml-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="description"
                className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1"
              >
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="What will students learn from this material?"
                className="min-h-[100px] rounded-2xl bg-muted/30 border-muted-foreground/20 focus:ring-2 focus:ring-primary/20 transition-all resize-none font-medium"
                {...register("description")}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">
                Class Level
              </Label>
              <Select
                onValueChange={(v) => setValue("classId", v)}
                defaultValue={watch("classId")}
              >
                <SelectTrigger
                  className={cn(
                    "h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 transition-all font-semibold",
                    errors.classId && "border-rose-500",
                  )}
                >
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl shadow-xl">
                  {classes.map((c: any) => (
                    <SelectItem
                      key={c.id}
                      value={c.id.toString()}
                      className="rounded-xl font-medium"
                    >
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">
                Class Arm (Optional)
              </Label>
              <Select
                onValueChange={(v) => setValue("armId", v)}
                defaultValue={watch("armId")}
                disabled={!selectedClassId}
              >
                <SelectTrigger className="h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 transition-all font-semibold">
                  <SelectValue placeholder="All Arms" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl shadow-xl">
                  <SelectItem value="all" className="rounded-xl font-medium">
                    All Arms
                  </SelectItem>
                  {arms.map((arm: any) => (
                    <SelectItem
                      key={arm.id}
                      value={arm.id.toString()}
                      className="rounded-xl font-medium"
                    >
                      {arm.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">
                Subject
              </Label>
              <Select
                onValueChange={(v) => setValue("subjectId", v)}
                defaultValue={watch("subjectId")}
              >
                <SelectTrigger className="h-12 rounded-2xl bg-muted/30 border-muted-foreground/20 transition-all font-semibold">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl shadow-xl">
                  <SelectItem value="all" className="rounded-xl font-medium">
                    All Subjects
                  </SelectItem>
                  {/* Subjects should ideally come from an API */}
                  <SelectItem value="1" className="rounded-xl font-medium">
                    Mathematics
                  </SelectItem>
                  <SelectItem value="2" className="rounded-xl font-medium">
                    English Language
                  </SelectItem>
                  <SelectItem value="3" className="rounded-xl font-medium">
                    Basic Science
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-6 border-t border-muted/50 flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={isUploading}
              className="flex-1 h-12 rounded-2xl font-bold hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUploading || !file}
              className="flex-[2] h-12 rounded-2xl font-black bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Uploading Material...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Confirm Upload
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
