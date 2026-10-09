import React from "react";
import { useTLearnCoLab } from "@/hooks/useTLearnCoLab";
import {
  ColabHero,
  ColabStatsStrip,
  ColabFilterBar,
  ColabRoomCard,
  ColabLiveStudioModal,
  ColabCreateRoomModal,
  ColabJoinByCodeModal,
  ColabScheduleDrawer,
  ColabGuidelinesModal,
  ColabReportModal,
} from "@/components/student/colab";
import { Loader2, Radio, Sparkles, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import "@/pages/student/lessons.css";
import "@/pages/student/colab.css";

const TLearnCoLab: React.FC = () => {
  const {
    studentClassLevel,
    searchQuery,
    setSearchQuery,
    selectedSubject,
    setSelectedSubject,
    selectedRoomType,
    setSelectedRoomType,
    statusFilter,
    setStatusFilter,
    rooms,
    stats,
    isLoadingRooms,
    scheduledSessions,
    // Modals
    isCreateRoomModalOpen,
    setIsCreateRoomModalOpen,
    isJoinByCodeModalOpen,
    setIsJoinByCodeModalOpen,
    isScheduleDrawerOpen,
    setIsScheduleDrawerOpen,
    isGuidelinesModalOpen,
    setIsGuidelinesModalOpen,
    isReportModalOpen,
    setIsReportModalOpen,
    reportTarget,
    handleOpenReport,
    // Active Live Room
    activeLiveRoom,
    isLiveStudioOpen,
    handleJoinLiveRoom,
    handleLeaveLiveRoom,
    handleJoinByCode,
    // Live Studio Controls
    isMuted,
    setIsMuted,
    isCameraOn,
    setIsCameraOn,
    isScreenSharing,
    setIsScreenSharing,
    isHandRaised,
    setIsHandRaised,
    liveStudioTab,
    setLiveStudioTab,
    sidebarTab,
    setSidebarTab,
    roomMessages,
    roomQuestions,
    // Pomodoro
    pomodoroSeconds,
    setPomodoroSeconds,
    isPomodoroRunning,
    setIsPomodoroRunning,
    pomodoroMode,
    setPomodoroMode,
    // Mutations
    createRoom,
    isCreatingRoom,
    sendMessage,
    isSendingMessage,
    askQuestion,
    upvoteQuestion,
    toggleRsvp,
    submitReport,
    isSubmittingReport,
  } = useTLearnCoLab();

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedSubject("All");
    setSelectedRoomType("ALL");
    setStatusFilter("ALL");
  };

  return (
    <div className="tl-scope tl-page-bg min-h-full w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Hero Section */}
        <ColabHero
          studentClassLevel={studentClassLevel}
          activeRoomsCount={stats?.activeRoomsCount ?? rooms.length}
          livePeersCount={stats?.livePeersCount ?? 42}
          onOpenCreateRoom={() => setIsCreateRoomModalOpen(true)}
          onOpenJoinByCode={() => setIsJoinByCodeModalOpen(true)}
          onOpenSchedule={() => setIsScheduleDrawerOpen(true)}
          onOpenGuidelines={() => setIsGuidelinesModalOpen(true)}
        />

        {/* Real-time stats strip */}
        <ColabStatsStrip stats={stats} />

        {/* Filter and Search Bar */}
        <ColabFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
          selectedRoomType={selectedRoomType}
          onRoomTypeChange={setSelectedRoomType}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onResetFilters={handleResetFilters}
        />

        {/* Rooms Grid / States */}
        {isLoadingRooms ? (
          <div className="flex flex-col items-center justify-center text-center py-24 rounded-3xl bg-card border border-border shadow-soft">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="font-extrabold text-lg text-foreground">
              Connecting to live collaborative rooms...
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Synchronizing active student whiteboards & study circles
            </p>
          </div>
        ) : rooms.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text-sm font-bold text-muted-foreground">
                Showing <strong className="text-foreground">{rooms.length}</strong> collaborative{" "}
                {rooms.length === 1 ? "room" : "rooms"}{" "}
                {selectedSubject !== "All" && (
                  <span>
                    in <strong className="text-primary">{selectedSubject}</strong>
                  </span>
                )}
              </p>

              <button
                onClick={() => setIsScheduleDrawerOpen(true)}
                className="text-xs font-bold text-primary hover:underline hidden sm:inline"
              >
                View {scheduledSessions.length} upcoming scheduled sessions →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <ColabRoomCard
                  key={room.id}
                  room={room}
                  onJoin={handleJoinLiveRoom}
                  onReport={handleOpenReport}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
            <div className="h-16 w-16 mx-auto rounded-3xl bg-primary/10 text-primary flex items-center justify-center">
              <Radio className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="text-lg font-black text-foreground">
                No Active Study Rooms Match Your Filters
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Be the first to host a collaboration session for this subject or clear your filters to explore other study circles.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="rounded-xl text-xs font-bold"
              >
                Reset Filters
              </Button>
              <Button
                size="sm"
                onClick={() => setIsCreateRoomModalOpen(true)}
                className="rounded-xl text-xs font-black bg-primary text-primary-foreground gap-1.5"
              >
                <PlusCircle className="h-4 w-4" />
                Host a Room for this Subject
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LIVE STUDIO MODAL (Fullscreen virtual collaborative space)
      ───────────────────────────────────────────────────────────────── */}
      <ColabLiveStudioModal
        room={activeLiveRoom}
        isOpen={isLiveStudioOpen}
        onClose={handleLeaveLiveRoom}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isCameraOn={isCameraOn}
        setIsCameraOn={setIsCameraOn}
        isScreenSharing={isScreenSharing}
        setIsScreenSharing={setIsScreenSharing}
        isHandRaised={isHandRaised}
        setIsHandRaised={setIsHandRaised}
        activeWorkspaceTab={liveStudioTab}
        setActiveWorkspaceTab={setLiveStudioTab}
        sidebarTab={sidebarTab}
        setSidebarTab={setSidebarTab}
        messages={roomMessages}
        onSendMessage={sendMessage}
        isSendingMessage={isSendingMessage}
        questions={roomQuestions}
        onAskQuestion={askQuestion}
        onUpvoteQuestion={upvoteQuestion}
        onOpenReport={handleOpenReport}
        pomodoroSeconds={pomodoroSeconds}
        setPomodoroSeconds={setPomodoroSeconds}
        isPomodoroRunning={isPomodoroRunning}
        setIsPomodoroRunning={setIsPomodoroRunning}
        pomodoroMode={pomodoroMode}
        setPomodoroMode={setPomodoroMode}
      />

      {/* Host Room Modal */}
      <ColabCreateRoomModal
        isOpen={isCreateRoomModalOpen}
        onClose={() => setIsCreateRoomModalOpen(false)}
        onSubmit={createRoom}
        isSubmitting={isCreatingRoom}
        studentClassLevel={studentClassLevel}
      />

      {/* Join by Code Modal */}
      <ColabJoinByCodeModal
        isOpen={isJoinByCodeModalOpen}
        onClose={() => setIsJoinByCodeModalOpen(false)}
        onJoin={handleJoinByCode}
      />

      {/* Schedule Drawer */}
      <ColabScheduleDrawer
        isOpen={isScheduleDrawerOpen}
        onClose={() => setIsScheduleDrawerOpen(false)}
        sessions={scheduledSessions}
        onToggleRsvp={toggleRsvp}
      />

      {/* Guidelines Modal */}
      <ColabGuidelinesModal
        isOpen={isGuidelinesModalOpen}
        onClose={() => setIsGuidelinesModalOpen(false)}
      />

      {/* Academic Misconduct / Report Modal */}
      <ColabReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={submitReport}
        isSubmitting={isSubmittingReport}
        target={reportTarget}
      />
    </div>
  );
};

export default TLearnCoLab;
