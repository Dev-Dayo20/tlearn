import {
  School,
  Users,
  Activity,
  TrendingUp,
  Video,
  CheckCircle,
} from "lucide-react";
import { MetricCard } from "@/components/super-admin/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuthStore } from "@/store/authStore";
import {
  useDashboardMetrics,
  useGetChartData,
  useRecentActivities,
} from "@/hooks/useSuperAdminLogin";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { data: metrics, isLoading: metricLoading } = useDashboardMetrics();
  const { data: chartData, isLoading: chartDataLoading } = useGetChartData();
  const { data: activities, isLoading: activitiesLoading } =
    useRecentActivities();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metricLoading ? (
          <>
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </>
        ) : (
          <>
            <MetricCard
              title="Total Schools"
              value={metrics?.metric.totalSchools || 0}
              icon={School}
              description={`${metrics?.metric.activeSchools}`}
              trend={{
                value: `+${metrics.metric?.recentSchools || 0}`,
                isPositive: true,
              }}
            />
            <MetricCard
              title="Total Students"
              value={metrics.metric.totalStudents || 0}
              icon={Users}
              description="Across all schools"
            />
            <MetricCard
              title="Total videos"
              value={metrics.metric?.totalVideos || 0}
              icon={Video}
              description="Learning Contents"
            />
            <MetricCard
              title="Growth Rate"
              value={metrics.metric?.growthRate || "0%"}
              icon={TrendingUp}
              description="Last 30 days"
              trend={{
                value: metrics.metric?.growthRate || "0%",
                isPositive: true,
              }}
            />
          </>
        )}
      </div>

      {/* Chart Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Student Growth (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            {chartDataLoading ? (
              <Skeleton className="h-[300px]" />
            ) : (
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Bar
                    dataKey="users"
                    fill="hsl(var(--accent))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activitiesLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
              </div>
            ) : activities && activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 pb-4 last:pb-0 border-b last:border-0 border-border"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.schoolName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.action}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.timeAgo}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No recent activities
              </p>
            )}
            {/* <div className="space-y-4">
              {[
                {
                  school: "Lincoln High School",
                  action: "New enrollment",
                  time: "2 min ago",
                },
                {
                  school: "Jefferson Academy",
                  action: "Updated profile",
                  time: "15 min ago",
                },
                {
                  school: "Washington Elementary",
                  action: "Added 3 teachers",
                  time: "1 hour ago",
                },
                {
                  school: "Roosevelt Middle",
                  action: "Generated report",
                  time: "2 hours ago",
                },
              ].map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 pb-4 last:pb-0 border-b last:border-0 border-border"
                >
                  <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.school}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.action}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
