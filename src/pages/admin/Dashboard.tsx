import React, { useState } from "react";
import { MetricCard } from "@/components/super-admin/MetricCard";
import { ProgressCharts } from "@/components/admin/ProgressCharts";
import { QuickActions } from "@/components/admin/QuickActions";
import { StatsCard } from "@/components/admin/Statscard";
import { RegisterStudents } from "@/components/admin/modals/RegisterStudent";
import { CreateClass } from "@/components/admin/modals/CreateClass";
import { UploadMaterial } from "@/components/admin/modals/UploadMaterial";

import { Users, GraduationCap, BookOpen, Video } from "lucide-react";

const Dashboard = () => {
  const [showRegisterStudent, setShowRegisterStudent] = useState(false);
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showUploadMaterial, setShowUploadMaterial] = useState(false);
  return (
    <>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={1250}
          icon={Users}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Teachers"
          value={85}
          icon={GraduationCap}
          variant="success"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Total Classes"
          value={42}
          icon={BookOpen}
          variant="accent"
          trend={{ value: 3, isPositive: false }}
        />
        <StatsCard
          title="Total Materials"
          value={120}
          icon={Video}
          variant="default"
          trend={{ value: 8, isPositive: true }}
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
