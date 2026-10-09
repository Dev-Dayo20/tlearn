import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Share2,
  Hand,
  PhoneOff,
  MessageSquare,
  HelpCircle,
  Clock,
  Users2,
  PenTool,
  Eraser,
  Download,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  FileText,
  Send,
  ThumbsUp,
  Maximize2,
  Minimize2,
  Radio,
  Play,
  Pause,
  Layers,
  ChevronRight,
  ChevronLeft,
  X,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type {
  ColabRoom,
  ColabChatMessage,
  ColabQuestion,
  ColabParticipant,
} from "@/types/colab.types";

interface ColabLiveStudioModalProps {
  room: ColabRoom | null;
  isOpen: boolean;
  onClose: () => void;
  // Controls
  isMuted: boolean;
  setIsMuted: (val: boolean) => void;
  isCameraOn: boolean;
  setIsCameraOn: (val: boolean) => void;
  isScreenSharing: boolean;
  setIsScreenSharing: (val: boolean) => void;
  isHandRaised: boolean;
  setIsHandRaised: (val: boolean) => void;
  // Workspace tabs
  activeWorkspaceTab: "WHITEBOARD" | "STAGE" | "RESOURCES";
  setActiveWorkspaceTab: (val: "WHITEBOARD" | "STAGE" | "RESOURCES") => void;
  sidebarTab: "CHAT" | "DOUBTS" | "TIMER" | "PEOPLE";
  setSidebarTab: (val: "CHAT" | "DOUBTS" | "TIMER" | "PEOPLE") => void;
  // Chat & Doubts
  messages: ColabChatMessage[];
  onSendMessage: (text: string) => void;
  isSendingMessage: boolean;
  questions: ColabQuestion[];
  onAskQuestion: (text: string) => void;
  onUpvoteQuestion: (qId: string) => void;
  onOpenReport: (roomId: string, userId?: string, userName?: string) => void;
  // Pomodoro
  pomodoroSeconds: number;
  setPomodoroSeconds: React.Dispatch<React.SetStateAction<number>>;
  isPomodoroRunning: boolean;
  setIsPomodoroRunning: React.Dispatch<React.SetStateAction<boolean>>;
  pomodoroMode: "FOCUS" | "BREAK";
  setPomodoroMode: (val: "FOCUS" | "BREAK") => void;
}

const DRAW_COLORS = ["#0284c7", "#ef4444", "#10b981", "#8b5cf6", "#f59e0b", "#0f172a", "#ffffff"];

export const ColabLiveStudioModal: React.FC<ColabLiveStudioModalProps> = ({
  room,
  isOpen,
  onClose,
  isMuted,
  setIsMuted,
  isCameraOn,
  setIsCameraOn,
  isScreenSharing,
  setIsScreenSharing,
  isHandRaised,
  setIsHandRaised,
  activeWorkspaceTab,
  setActiveWorkspaceTab,
  sidebarTab,
  setSidebarTab,
  messages,
  onSendMessage,
  isSendingMessage,
  questions,
  onAskQuestion,
  onUpvoteQuestion,
  onOpenReport,
  pomodoroSeconds,
  setPomodoroSeconds,
  isPomodoroRunning,
  setIsPomodoroRunning,
  pomodoroMode,
  setPomodoroMode,
}) => {
  if (!isOpen || !room) return null;

  // Local Chat input state
  const [chatInput, setChatInput] = useState("");
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Local Question input state
  const [questionInput, setQuestionInput] = useState("");

  // Whiteboard Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeTool, setActiveTool] = useState<"PEN" | "ERASER">("PEN");
  const [strokeColor, setStrokeColor] = useState("#0284c7");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [showGrid, setShowGrid] = useState(true);

  // Floating Emoji reactions
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; emoji: string; left: number }[]>([]);

  // Mobile sidebar open state
  const [isSidebarOpenOnMobile, setIsSidebarOpenOnMobile] = useState(false);

  // Auto-scroll chat on new messages
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Pomodoro countdown timer effect
  useEffect(() => {
    let interval: any = null;
    if (isPomodoroRunning) {
      interval = setInterval(() => {
        setPomodoroSeconds((prev) => {
          if (prev <= 1) {
            toast.info(pomodoroMode === "FOCUS" ? "Focus session complete! Take a 5-minute break." : "Break over! Ready to focus?");
            setIsPomodoroRunning(false);
            return pomodoroMode === "FOCUS" ? 5 * 60 : 25 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPomodoroRunning, pomodoroMode, setPomodoroSeconds, setIsPomodoroRunning]);

  // Whiteboard drawing logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set initial size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        // Save current canvas content
        const temp = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = rect.width;
        canvas.height = rect.height;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        if (temp.width > 0 && temp.height > 0) {
          ctx.putImageData(temp, 0, 0);
        }
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [activeWorkspaceTab]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = activeTool === "ERASER" ? "#ffffff" : strokeColor;
    ctx.lineWidth = activeTool === "ERASER" ? strokeWidth * 4 : strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    toast.success("Whiteboard cleared.");
  };

  const downloadCanvasNotes = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${room.title.replace(/[^a-zA-Z0-9]/g, "_")}_Notes.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast.success("Saved whiteboard snapshot to your device!");
  };

  // Chat send
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    onSendMessage(chatInput.trim());
    setChatInput("");
  };

  // Question submit
  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim()) return;
    onAskQuestion(questionInput.trim());
    setQuestionInput("");
  };

  // Burst emoji reaction
  const triggerEmoji = (emoji: string) => {
    const id = Date.now() + Math.random();
    const left = Math.floor(20 + Math.random() * 60);
    setFloatingEmojis((prev) => [...prev, { id, emoji, left }]);
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((item) => item.id !== id));
    }, 2200);
  };

  // Hand raise toggle
  const handleToggleHand = () => {
    const next = !isHandRaised;
    setIsHandRaised(next);
    if (next) {
      toast.info("✋ You raised your hand! The study lead will address you shortly.");
      triggerEmoji("✋");
    } else {
      toast.info("Hand lowered.");
    }
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col overflow-hidden text-slate-100 font-sans">
      {/* ─────────────────────────────────────────────────────────────────
          TOP BAR: Room Title, Subject, Code, Live Status, Leave
      ───────────────────────────────────────────────────────────────────── */}
      <header className="h-16 px-4 sm:px-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Badge
            variant="outline"
            className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border-rose-500/40 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shrink-0"
          >
            <span className="colab-live-dot" />
            Live
          </Badge>

          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-extrabold text-white truncate">
              {room.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span className="text-sky-400 font-semibold">{room.subject}</span>
              <span>•</span>
              <span className="font-mono text-slate-400">#{room.code}</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">{room.classLevel}</span>
            </div>
          </div>
        </div>

        {/* Top actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Workspace Tabs on Desktop */}
          <div className="hidden md:flex items-center bg-slate-800/80 rounded-xl p-1 border border-slate-700/60">
            <button
              onClick={() => setActiveWorkspaceTab("WHITEBOARD")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeWorkspaceTab === "WHITEBOARD"
                  ? "bg-sky-500 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <PenTool className="h-3.5 w-3.5" />
              Whiteboard
            </button>
            <button
              onClick={() => setActiveWorkspaceTab("STAGE")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeWorkspaceTab === "STAGE"
                  ? "bg-sky-500 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Video className="h-3.5 w-3.5" />
              Video Stage
            </button>
            <button
              onClick={() => setActiveWorkspaceTab("RESOURCES")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeWorkspaceTab === "RESOURCES"
                  ? "bg-sky-500 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              Resources
            </button>
          </div>

          {/* Report Misconduct Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenReport(room.id)}
            className="text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 h-8 px-2 rounded-lg text-xs font-semibold gap-1"
            title="Report inappropriate behavior to academic moderator"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Report</span>
          </Button>

          {/* Leave Room Button */}
          <Button
            variant="destructive"
            size="sm"
            onClick={onClose}
            className="h-8 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold gap-1.5 shadow-sm"
          >
            <PhoneOff className="h-3.5 w-3.5" />
            Leave
          </Button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────
          MAIN AREA: Left Collaborative Canvas / Stage + Right Side Dock
      ───────────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Floating animated emoji reactions */}
        <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
          {floatingEmojis.map((e) => (
            <div
              key={e.id}
              className="absolute bottom-24 text-3xl animate-bounce transition-all duration-1000"
              style={{ left: `${e.left}%` }}
            >
              {e.emoji}
            </div>
          ))}
        </div>

        {/* WORKSPACE COLUMN (Canvas / Video stage) */}
        <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
          {/* Mobile workspace switcher */}
          <div className="flex md:hidden items-center justify-around bg-slate-900 border-b border-slate-800 p-1 text-xs">
            <button
              onClick={() => setActiveWorkspaceTab("WHITEBOARD")}
              className={`px-3 py-1 rounded-md font-bold ${
                activeWorkspaceTab === "WHITEBOARD" ? "text-sky-400 bg-slate-800" : "text-slate-400"
              }`}
            >
              Whiteboard
            </button>
            <button
              onClick={() => setActiveWorkspaceTab("STAGE")}
              className={`px-3 py-1 rounded-md font-bold ${
                activeWorkspaceTab === "STAGE" ? "text-sky-400 bg-slate-800" : "text-slate-400"
              }`}
            >
              Stage ({room.participantCount})
            </button>
            <button
              onClick={() => setActiveWorkspaceTab("RESOURCES")}
              className={`px-3 py-1 rounded-md font-bold ${
                activeWorkspaceTab === "RESOURCES" ? "text-sky-400 bg-slate-800" : "text-slate-400"
              }`}
            >
              Resources
            </button>
          </div>

          {/* TAB 1: INTERACTIVE COLLABORATIVE WHITEBOARD */}
          {activeWorkspaceTab === "WHITEBOARD" && (
            <div className="flex-1 flex flex-col relative overflow-hidden bg-white dark:bg-slate-900">
              {/* Whiteboard Toolbar Floating Pill */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-2xl text-white">
                <button
                  onClick={() => setActiveTool("PEN")}
                  className={`p-2 rounded-xl transition-colors ${
                    activeTool === "PEN" ? "bg-sky-500 text-white" : "text-slate-400 hover:text-white"
                  }`}
                  title="Drawing Pen"
                >
                  <PenTool className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setActiveTool("ERASER")}
                  className={`p-2 rounded-xl transition-colors ${
                    activeTool === "ERASER" ? "bg-sky-500 text-white" : "text-slate-400 hover:text-white"
                  }`}
                  title="Eraser"
                >
                  <Eraser className="h-4 w-4" />
                </button>

                <div className="h-5 w-px bg-slate-700 mx-1" />

                {/* Color swatches */}
                <div className="flex items-center gap-1.5">
                  {DRAW_COLORS.map((col) => (
                    <button
                      key={col}
                      onClick={() => {
                        setStrokeColor(col);
                        setActiveTool("PEN");
                      }}
                      className={`h-5 w-5 rounded-full border transition-transform ${
                        strokeColor === col && activeTool === "PEN"
                          ? "scale-125 border-white ring-2 ring-sky-400"
                          : "border-transparent opacity-80 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>

                <div className="h-5 w-px bg-slate-700 mx-1" />

                {/* Stroke width */}
                <div className="flex items-center gap-1">
                  {[2, 4, 8].map((size) => (
                    <button
                      key={size}
                      onClick={() => setStrokeWidth(size)}
                      className={`h-6 w-6 rounded-lg text-xs font-black flex items-center justify-center transition-colors ${
                        strokeWidth === size ? "bg-slate-700 text-sky-400" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {size === 2 ? "S" : size === 4 ? "M" : "L"}
                    </button>
                  ))}
                </div>

                <div className="h-5 w-px bg-slate-700 mx-1" />

                {/* Actions: Clear, Download */}
                <button
                  onClick={clearCanvas}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  title="Clear Whiteboard"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={downloadCanvasNotes}
                  className="p-2 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                  title="Save Whiteboard Notes"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>

              {/* Canvas Area */}
              <div className={`flex-1 w-full h-full relative cursor-crosshair ${showGrid ? "colab-canvas-grid" : ""}`}>
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-full block touch-none"
                />
              </div>

              {/* Whiteboard bottom caption info */}
              <div className="absolute bottom-3 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-[11px] text-slate-300 font-semibold border border-slate-800">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Live Interactive Canvas: All peers in room can view real-time calculations</span>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE VIDEO / AUDIO STAGE */}
          {activeWorkspaceTab === "STAGE" && (
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto colab-scroll bg-slate-950">
              <div className="max-w-5xl mx-auto space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>Collaborators in this room ({room.participantCount})</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <span className="colab-live-dot" /> High Definition Audio Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Host Tile */}
                  <div className="relative aspect-video rounded-3xl bg-slate-900 border-2 border-sky-500/80 shadow-lg overflow-hidden flex flex-col justify-between p-4 group">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-500 text-white">
                        Study Lead / Host
                      </span>
                      <div className="colab-speaking-wave">
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center my-auto">
                      {room.host.avatar ? (
                        <img
                          src={room.host.avatar}
                          alt={room.host.name}
                          className="h-16 w-16 rounded-full object-cover border-2 border-sky-400 shadow-md mb-2"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-sky-500/20 text-sky-400 font-black text-xl flex items-center justify-center mb-2">
                          {room.host.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <p className="font-extrabold text-sm text-white">{room.host.name}</p>
                      <p className="text-[11px] text-sky-300 font-medium">Currently Explaining</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-1 font-bold">
                        <Mic className="h-3.5 w-3.5 text-emerald-400" /> Speaking
                      </span>
                      <span className="text-[10px] text-slate-400">720p HD</span>
                    </div>
                  </div>

                  {/* You / Self Tile */}
                  <div className="relative aspect-video rounded-3xl bg-slate-900/90 border border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                        You
                      </span>
                      {isHandRaised && (
                        <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black animate-pulse">
                          ✋ Hand Raised
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col items-center justify-center my-auto">
                      <div className="h-14 w-14 rounded-full bg-primary/20 text-primary font-black text-lg flex items-center justify-center mb-1 border border-primary/30">
                        YOU
                      </div>
                      <p className="font-extrabold text-sm text-white">You (Student)</p>
                      <p className="text-[11px] text-slate-400">
                        {isMuted ? "Muted" : "Microphone Active"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      {isMuted ? (
                        <span className="flex items-center gap-1 text-rose-400 font-bold">
                          <MicOff className="h-3.5 w-3.5" /> Muted
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-emerald-400 font-bold">
                          <Mic className="h-3.5 w-3.5" /> Mic Live
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400">
                        {isCameraOn ? "Camera On" : "Camera Off"}
                      </span>
                    </div>
                  </div>

                  {/* Other Peer Tiles */}
                  {room.participants.slice(1).map((p, idx) => (
                    <div
                      key={p.id || idx}
                      className="relative aspect-video rounded-3xl bg-slate-900/80 border border-slate-800/80 shadow-sm overflow-hidden flex flex-col justify-between p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                          Classmate
                        </span>
                        {p.isHandRaised && (
                          <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black">
                            ✋
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col items-center justify-center my-auto">
                        {p.avatar ? (
                          <img
                            src={p.avatar}
                            alt={p.name}
                            className="h-12 w-12 rounded-full object-cover border border-slate-700 mb-1"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-slate-800 text-slate-300 font-bold text-sm flex items-center justify-center mb-1">
                            {p.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <p className="font-extrabold text-sm text-white">{p.name}</p>
                        <p className="text-[10px] text-slate-400">{p.joinedAt}</p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{p.isMuted ? "Muted" : "Active"}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onOpenReport(room.id, p.id, p.name)}
                          className="h-6 px-1.5 text-[10px] text-slate-500 hover:text-rose-400"
                        >
                          Flag
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SHARED RESOURCES & NOTES */}
          {activeWorkspaceTab === "RESOURCES" && (
            <div className="flex-1 p-6 overflow-y-auto colab-scroll bg-slate-950">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-white">Study Documents & Materials</h3>
                    <p className="text-xs text-slate-400">
                      Download lesson handouts, formula sheets, and past question PDFs shared in this room.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold gap-1.5"
                    onClick={() => toast.info("Resource upload is ready. Backend file store link will bind here.")}
                  >
                    Share File / Link
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Physics Heat Transfer & Thermodynamics Formula Sheet.pdf
                        </p>
                        <p className="text-xs text-slate-400">Shared by Chukwudi Nnamdi • 1.4 MB</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-slate-700 text-white hover:bg-slate-800 text-xs font-bold gap-1 shrink-0"
                      onClick={() => toast.success("Downloading formula sheet...")}
                    >
                      <Download className="h-3.5 w-3.5" /> Download
                    </Button>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                        <ExternalLink className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          PhET Interactive Thermal Simulation Link
                        </p>
                        <p className="text-xs text-slate-400">External Lab Resource • Shared by Zainab Bello</p>
                      </div>
                    </div>
                    <a
                      href="https://phet.colorado.edu"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-700 text-white hover:bg-slate-800 text-xs font-bold shrink-0"
                    >
                      Open Link
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              BOTTOM MEDIA CONTROLS BAR (Mic, Cam, Screen, Hand, Emojis)
          ───────────────────────────────────────────────────────────────── */}
          <div className="h-20 bg-slate-900/95 border-t border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-2 shrink-0 z-30">
            {/* Left: Audio & Video toggles */}
            <div className="flex items-center gap-2">
              <Button
                variant={isMuted ? "destructive" : "default"}
                size="sm"
                onClick={() => {
                  const next = !isMuted;
                  setIsMuted(next);
                  toast(next ? "Microphone muted" : "Microphone unmuted");
                }}
                className={`h-11 px-3 sm:px-4 rounded-2xl font-bold text-xs gap-1.5 ${
                  isMuted
                    ? "bg-rose-600 hover:bg-rose-700 text-white"
                    : "bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700"
                }`}
              >
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                <span className="hidden sm:inline">{isMuted ? "Unmute" : "Mute"}</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const next = !isCameraOn;
                  setIsCameraOn(next);
                  toast(next ? "Camera turned on" : "Camera turned off");
                }}
                className={`h-11 px-3 sm:px-4 rounded-2xl font-bold text-xs gap-1.5 border-slate-700 ${
                  isCameraOn
                    ? "bg-slate-800 hover:bg-slate-700 text-white"
                    : "bg-rose-600/20 text-rose-400 hover:bg-rose-600/30 border-rose-500/30"
                }`}
              >
                {isCameraOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                <span className="hidden sm:inline">{isCameraOn ? "Stop Cam" : "Start Cam"}</span>
              </Button>
            </div>

            {/* Middle: Screen share & Raise Hand & Quick Reactions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const next = !isScreenSharing;
                  setIsScreenSharing(next);
                  toast.info(next ? "Screen sharing initiated" : "Screen sharing stopped");
                }}
                className={`h-11 px-3 rounded-2xl font-bold text-xs gap-1.5 border-slate-700 ${
                  isScreenSharing ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-300 hover:text-white"
                }`}
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden md:inline">Share Screen</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleHand}
                className={`h-11 px-3 sm:px-4 rounded-2xl font-black text-xs gap-1.5 border-slate-700 transition-all ${
                  isHandRaised
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-800 text-amber-400 hover:bg-slate-700"
                }`}
              >
                <Hand className="h-4 w-4" />
                <span className="hidden sm:inline">{isHandRaised ? "Lower Hand" : "Raise Hand"}</span>
              </Button>

              {/* Reaction Emojis */}
              <div className="hidden sm:flex items-center gap-1 bg-slate-800/80 p-1 rounded-2xl border border-slate-700/60">
                {["💡", "👏", "🔥", "❤️", "🚀"].map((em) => (
                  <button
                    key={em}
                    onClick={() => triggerEmoji(em)}
                    className="h-8 w-8 rounded-xl hover:bg-slate-700 flex items-center justify-center text-sm transition-transform hover:scale-125"
                    title={`Send ${em}`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Toggle Dock on mobile or status */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSidebarOpenOnMobile(!isSidebarOpenOnMobile)}
                className="lg:hidden h-11 px-3 rounded-2xl bg-slate-800 border-slate-700 text-sky-400 font-bold text-xs gap-1.5"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Panel</span>
              </Button>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT SIDE DOCK (Chat, Doubts Queue, Pomodoro, People)
        ───────────────────────────────────────────────────────────────── */}
        <aside
          className={`w-80 sm:w-96 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0 transition-transform duration-300 z-40 ${
            isSidebarOpenOnMobile
              ? "fixed inset-y-16 right-0 w-full sm:w-96 shadow-2xl"
              : "hidden lg:flex"
          }`}
        >
          {/* Dock Tab Selector */}
          <div className="h-12 border-b border-slate-800 flex items-center justify-between px-2 bg-slate-900/90 shrink-0">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSidebarTab("CHAT")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors flex items-center gap-1.5 ${
                  sidebarTab === "CHAT"
                    ? "bg-slate-800 text-sky-400 border border-slate-700"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Chat
              </button>

              <button
                onClick={() => setSidebarTab("DOUBTS")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors flex items-center gap-1.5 relative ${
                  sidebarTab === "DOUBTS"
                    ? "bg-slate-800 text-sky-400 border border-slate-700"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <HelpCircle className="h-3.5 w-3.5" />
                Doubts ({questions.length})
              </button>

              <button
                onClick={() => setSidebarTab("TIMER")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors flex items-center gap-1.5 ${
                  sidebarTab === "TIMER"
                    ? "bg-slate-800 text-sky-400 border border-slate-700"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Clock className="h-3.5 w-3.5" />
                Timer
              </button>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setIsSidebarOpenOnMobile(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* DOCK CONTENT: CHAT */}
          {sidebarTab === "CHAT" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Messages feed */}
              <div
                ref={chatScrollRef}
                className="flex-1 p-4 space-y-3 overflow-y-auto colab-scroll text-xs"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-3 rounded-2xl space-y-1 ${
                      m.isPinned
                        ? "bg-amber-500/10 border border-amber-500/25"
                        : "bg-slate-800/80 border border-slate-700/60"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-white">{m.senderName}</span>
                        {m.senderRole === "PEER_TUTOR" && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-sky-500/20 text-sky-300">
                            Tutor
                          </span>
                        )}
                        {m.senderRole === "MODERATOR" && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-300">
                            Mod
                          </span>
                        )}
                      </div>
                      <span className="text-slate-500 text-[10px]">{m.timestamp}</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed font-normal">{m.text}</p>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form
                onSubmit={handleChatSubmit}
                className="p-3 border-t border-slate-800 bg-slate-900/90 flex items-center gap-2"
              >
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message or formula..."
                  className="rounded-xl h-10 bg-slate-800 border-slate-700 text-xs text-white focus-visible:ring-sky-500"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!chatInput.trim() || isSendingMessage}
                  className="h-10 w-10 p-0 rounded-xl bg-sky-500 hover:bg-sky-400 text-white shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          )}

          {/* DOCK CONTENT: DOUBT QUEUE */}
          {sidebarTab === "DOUBTS" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-3 bg-slate-800/40 border-b border-slate-800 text-xs text-slate-300">
                <p className="font-bold">Peer & Tutor Doubt Desk</p>
                <p className="text-[11px] text-slate-400">
                  Upvote questions to help the study lead answer them on the whiteboard!
                </p>
              </div>

              <div className="flex-1 p-3 space-y-2.5 overflow-y-auto colab-scroll">
                {questions.map((q) => (
                  <div
                    key={q.id}
                    className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-white leading-snug">{q.question}</p>
                      <button
                        onClick={() => onUpvoteQuestion(q.id)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-black transition-colors shrink-0 ${
                          q.upvotedByMe
                            ? "bg-sky-500 text-white shadow-sm"
                            : "bg-slate-700 text-slate-300 hover:text-white"
                        }`}
                        title="Upvote this doubt"
                      >
                        <ThumbsUp className="h-3 w-3" />
                        {q.upvotes}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-700/60">
                      <span>Asked by {q.studentName}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded font-bold ${
                          q.status === "RESOLVED"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : q.status === "ANSWERING"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-slate-700 text-slate-400"
                        }`}
                      >
                        {q.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Question */}
              <form
                onSubmit={handleQuestionSubmit}
                className="p-3 border-t border-slate-800 bg-slate-900 flex items-center gap-2"
              >
                <Input
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  placeholder="Post a doubt to the queue..."
                  className="rounded-xl h-10 bg-slate-800 border-slate-700 text-xs text-white"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!questionInput.trim()}
                  className="h-10 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shrink-0"
                >
                  Ask
                </Button>
              </form>
            </div>
          )}

          {/* DOCK CONTENT: POMODORO TIMER */}
          {sidebarTab === "TIMER" && (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-6">
              <div className="space-y-1">
                <Badge
                  variant="outline"
                  className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border-sky-500/30 text-xs font-black"
                >
                  {pomodoroMode === "FOCUS" ? "🎯 Focus Session" : "☕ Break Time"}
                </Badge>
                <h4 className="text-sm font-extrabold text-white">Group Study Sprint</h4>
              </div>

              {/* Timer circle display */}
              <div className="h-44 w-44 rounded-full border-4 border-sky-500/40 flex flex-col items-center justify-center bg-slate-800/60 shadow-inner">
                <span className="text-4xl font-mono font-black text-white tracking-wider">
                  {formatTimer(pomodoroSeconds)}
                </span>
                <span className="text-xs text-slate-400 font-bold mt-1">
                  {pomodoroMode === "FOCUS" ? "25m Target" : "5m Rest"}
                </span>
              </div>

              {/* Timer controls */}
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  onClick={() => setIsPomodoroRunning(!isPomodoroRunning)}
                  className="rounded-xl h-10 px-5 bg-sky-500 hover:bg-sky-400 text-white font-black text-xs gap-1.5 shadow-md"
                >
                  {isPomodoroRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPomodoroRunning ? "Pause" : "Start"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsPomodoroRunning(false);
                    setPomodoroSeconds(pomodoroMode === "FOCUS" ? 25 * 60 : 5 * 60);
                  }}
                  className="rounded-xl h-10 border-slate-700 text-slate-300 hover:text-white text-xs font-bold"
                >
                  Reset
                </Button>
              </div>

              {/* Mode switch */}
              <div className="flex items-center gap-2 pt-2 text-xs">
                <button
                  onClick={() => {
                    setPomodoroMode("FOCUS");
                    setPomodoroSeconds(25 * 60);
                    setIsPomodoroRunning(false);
                  }}
                  className={`px-3 py-1 rounded-lg font-bold ${
                    pomodoroMode === "FOCUS" ? "bg-slate-700 text-white" : "text-slate-400"
                  }`}
                >
                  25m Focus
                </button>
                <button
                  onClick={() => {
                    setPomodoroMode("BREAK");
                    setPomodoroSeconds(5 * 60);
                    setIsPomodoroRunning(false);
                  }}
                  className={`px-3 py-1 rounded-lg font-bold ${
                    pomodoroMode === "BREAK" ? "bg-slate-700 text-white" : "text-slate-400"
                  }`}
                >
                  5m Break
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
