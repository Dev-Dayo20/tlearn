import React, { useState } from "react";
import { MetricCard } from "@/components/super-admin/MetricCard";
import { ProgressCharts } from "@/components/admin/ProgressCharts";
import { QuickActions } from "@/components/admin/QuickActions";
import { StatsCard } from "@/components/admin/Statscard";
import { RegisterStudents } from "@/components/admin/modals/RegisterStudent";
import { CreateClass } from "@/components/admin/modals/CreateClass";
import { UploadMaterial } from "@/components/admin/modals/UploadMaterial";

import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "@/services/api/admin/schLoginApi";
import { Loader2, Users, GraduationCap, BookOpen, Video } from "lucide-react";

const Dashboard = () => {
  const [showRegisterStudent, setShowRegisterStudent] = useState(false);
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showUploadMaterial, setShowUploadMaterial] = useState(false);

  const { data: statsData, isLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
  });

  const stats = statsData?.stats;

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <div className="absolute inset-0 blur-xl bg-primary/20 animate-pulse rounded-full" />
        </div>
        <p className="text-muted-foreground font-black uppercase tracking-widest text-xs animate-pulse">
          Syncing Dashboard Data...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={stats?.totalStudents || 0}
          icon={Users}
          variant="primary"
          trend={{ value: 0, isPositive: true }}
        />
        <StatsCard
          title="Total Teachers"
          value={85} // Assuming teachers stat isn't in current response or keeping as is if not available
          icon={GraduationCap}
          variant="success"
          trend={{ value: 0, isPositive: true }}
        />
        <StatsCard
          title="Total Classes"
          value={stats?.totalClasses || 0}
          icon={BookOpen}
          variant="accent"
          trend={{ value: 0, isPositive: false }}
        />
        <StatsCard
          title="Total Materials"
          value={stats?.totalMaterials || 0}
          icon={Video}
          variant="default"
          trend={{ value: 0, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProgressCharts />
        </div>
        <div>
          <QuickActions
            onRegisterStudent={() => setShowRegisterStudent(true)}
            onCreateClass={() => setShowCreateClass(true)}
            onUploadMaterial={() => setShowUploadMaterial(true)}
          />
        </div>
      </div>

      <RegisterStudents
        open={showRegisterStudent}
        onClose={() => setShowRegisterStudent(false)}
      />
      <CreateClass
        open={showCreateClass}
        onClose={() => setShowCreateClass(false)}
      />
      <UploadMaterial
        open={showUploadMaterial}
        onClose={() => setShowUploadMaterial(false)}
      />
    </>
  );
};

export default Dashboard;
