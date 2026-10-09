import React from "react";
import { Laptop, Globe, FileText, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/super-admin/MetricCard";
import type { AdminDigitalCoursesMetrics } from "@/services/api/super-admin/digitalCoursesSuperAdminApi";

interface DigitalCoursesMetricsProps {
  metrics?: AdminDigitalCoursesMetrics;
  isLoading?: boolean;
}

export const DigitalCoursesMetrics: React.FC<DigitalCoursesMetricsProps> = ({
  metrics, isLoading,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Courses"
        value={isLoading ? "..." : metrics?.totalCourses ?? 0}
        icon={Laptop}
        description="Full course catalog"
      />
      <MetricCard
        title="Published"
        value={isLoading ? "..." : metrics?.publishedCourses ?? 0}
        icon={Globe}
        description="Live & visible to students"
      />
      <MetricCard
        title="Draft"
        value={isLoading ? "..." : metrics?.draftCourses ?? 0}
        icon={FileText}
        description="Pending review"
      />
      <MetricCard
        title="School Assignments"
        value={isLoading ? "..." : metrics?.totalAssignments ?? 0}
        icon={TrendingUp}
        description="Total class-level assignments"
      />
    </div>
  );
};
