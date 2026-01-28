import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  UserCheck,
  UserMinus,
  UserPlus,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
} from "recharts";

interface StudentStatsProps {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  newEnrollments: number;
  classDistribution: { name: string; value: number }[];
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export const StudentStats = ({
  totalStudents,
  activeStudents,
  inactiveStudents,
  newEnrollments,
  classDistribution,
}: StudentStatsProps) => {
  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Students",
      value: activeStudents,
      icon: UserCheck,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Inactive Students",
      value: inactiveStudents,
      icon: UserMinus,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
    {
      title: "New Enrollments",
      value: newEnrollments,
      icon: UserPlus,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      subtitle: "Last 30 days",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-black mt-1">
                    {stat.value.toLocaleString()}
                  </h3>
                  {stat.subtitle && (
                    <p className="text-[10px] text-muted-foreground font-medium mt-0.5">
                      {stat.subtitle}
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-2xl ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-5 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <PieChartIcon className="h-4 w-4 text-primary" />
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Class Split
            </p>
          </div>
          <div className="flex-1 min-h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={classDistribution}
                  innerRadius={35}
                  outerRadius={50}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {classDistribution.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                  itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
