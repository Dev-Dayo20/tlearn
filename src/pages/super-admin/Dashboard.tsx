import { School, Users, Activity, TrendingUp } from "lucide-react";
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

const chartData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 185 },
  { month: "Mar", users: 240 },
  { month: "Apr", users: 310 },
  { month: "May", users: 395 },
  { month: "Jun", users: 450 },
];

const Dashboard = () => {
  const logOut = useAuthStore((state) => state.logout);
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
        <MetricCard
          title="Total Schools"
          value={24}
          icon={School}
          description="from last month"
          trend={{ value: "+3", isPositive: true }}
        />
        <MetricCard
          title="Active Users"
          value="1,284"
          icon={Users}
          description="across all schools"
          trend={{ value: "+12%", isPositive: true }}
        />
        <MetricCard
          title="Active Sessions"
          value={342}
          icon={Activity}
          description="currently online"
        />
        <MetricCard
          title="Growth Rate"
          value="23.5%"
          icon={TrendingUp}
          description="month over month"
          trend={{ value: "+5.2%", isPositive: true }}
        />
      </div>

      {/* Chart Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
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
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
