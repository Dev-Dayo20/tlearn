import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ProgressChartProps {
  data?: Array<{
    name?: string;
    month?: string;
    value?: number;
    students?: number;
    completion?: number;
  }>;
  title?: string;
}

export function ProgressCharts({
  data,
  title = "Class Distribution Overview",
}: ProgressChartProps) {
  const chartData =
    data && data.length > 0
      ? data.map((item) => ({
          name: item.name || item.month || "N/A",
          students: item.students ?? item.value ?? 0,
          completion: item.completion ?? 0,
        }))
      : [];

  const hasCompletion = chartData.some((item) => item.completion > 0);

  return (
    <div className="rounded-2xl bg-card p-6 shadow-soft">
      <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
      <div className="h-[300px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "var(--shadow-lg)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "16px" }}
                formatter={(value) => (
                  <span style={{ color: "hsl(var(--foreground))" }}>{value}</span>
                )}
              />
              <Bar
                dataKey="students"
                name="Students / Count"
                fill="hsl(var(--primary))"
                radius={[6, 6, 0, 0]}
              />
              {hasCompletion && (
                <Bar
                  dataKey="completion"
                  name="Completion %"
                  fill="hsl(var(--success))"
                  radius={[6, 6, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
            No chart distribution data available
          </div>
        )}
      </div>
    </div>
  );
}

