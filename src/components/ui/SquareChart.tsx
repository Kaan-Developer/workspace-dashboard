import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { GithubCommit } from "@/services/github";

export interface ActivityDataPoint {
  day: string;
  value: number;
  active?: boolean;
}

export const defaultChartData: ActivityDataPoint[] = [
  { day: "Tue", value: 3 },
  { day: "Wed", value: 1 },
  { day: "Thu", value: 1 },
  { day: "Fri", value: 2 },
  { day: "Sat", value: 2 },
  { day: "Sun", value: 3 },
  { day: "Mon", value: 2, active: true },
];

export interface SquareChartProps {
  data?: ActivityDataPoint[];
  commits?: GithubCommit[];
  className?: string;
  title?: string;
  description?: string;
}

const dayFormat = new Intl.DateTimeFormat("en-US", { weekday: "short" });

export function ChartBarLabelSquare({
  data,
  commits,
  className,
  title,
  description,
}: SquareChartProps) {
  const chartData = useMemo(() => {
    if (data && data.length > 0) return data;

    if (commits && commits.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (6 - i));
        const count = commits.filter((c) => {
          const d = c.commit?.author?.date;
          return d && new Date(d).toDateString() === date.toDateString();
        }).length;

        return {
          day: dayFormat.format(date),
          value: count,
          active: i === 6,
        };
      });
    }

    return defaultChartData;
  }, [data, commits]);

  const maxValue = Math.max(...chartData.map((d) => d.value), 4);
  const isDefaultScale = maxValue <= 4;
  const yTicks = isDefaultScale ? [0, 1, 2, 3, 4] : undefined;

  return (
    <Card className={cn("p-6", className)}>
      {title && (
        <header className="mb-4">
          <h2 className="text-base font-semibold">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </header>
      )}

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 16, right: 16, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--border, #e6e7ea)"
              strokeDasharray="none"
            />
            <YAxis
              domain={[0, isDefaultScale ? 4 : maxValue]}
              ticks={yTicks}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground, #6b7280)", fontSize: 13 }}
              width={32}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              tick={{ fill: "var(--muted-foreground, #4b5563)", fontSize: 13 }}
            />
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const entry = payload[0].payload as ActivityDataPoint;
                  return (
                    <div className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-card-foreground shadow-md">
                      <span className="font-medium text-muted-foreground">
                        {entry.day}
                      </span>
                      :{" "}
                      <span className="font-semibold text-primary">
                        {entry.value}
                      </span>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              barSize={32}
            >
              {chartData.map((entry, index) => {
                const isActive = entry.active ?? index === chartData.length - 1;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={isActive ? "#2563eb" : "#93c5fd"}
                    className="transition-colors hover:opacity-85"
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export { ChartBarLabelSquare as SquareChart };
export default ChartBarLabelSquare;
