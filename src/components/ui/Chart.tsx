import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { LuTrendingUp } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import type { GithubCommit } from "@/services/github";

const dayFormat = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const rangeFormat = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short" });

const ChartBarDefault = ({ commits }: { commits: GithubCommit[] }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const data = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - i));
    const count = commits.filter((c) => {
      const d = c.commit.author?.date;
      return d && new Date(d).toDateString() === date.toDateString();
    }).length;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return {
      day: dayFormat.format(date),
      commits: count,
      date: `${year}-${month}-${day}`,
    };
  });

  const total = data.reduce((sum, d) => sum + d.commits, 0);
  const start = new Date(today);
  start.setDate(today.getDate() - 6);

  return (
    <>
      <div className="flex items-center gap-2 p-4">
        <FaGithub size={28} aria-hidden="true" />
        <div>
          <h3 className="text-base leading-none">Commit activity</h3>
          <p className="text-xs text-muted-foreground">Commits by day over the last 7 days</p>
        </div>
      </div>

      <div className="h-70 w-full px-4 text-xs">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 20, left: 12, right: 12 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const entry = payload[0].payload as {
                    day: string;
                    commits: number;
                    date: string;
                  };
                  return (
                    <div className="pointer-events-none select-none rounded-lg border border-border bg-white px-2.5 py-2 text-xs leading-tight text-neutral-900 shadow-sm">
                      {entry.commits} contributions on {entry.date}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              dataKey="commits"
              type="natural"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={{ fill: "var(--chart-1)" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-2 p-4 text-sm">
        <div className="flex gap-2 font-medium">
          {total} commits <LuTrendingUp className="size-4" aria-hidden="true" />
        </div>
        <div className="text-muted-foreground">
          {rangeFormat.format(start)} – {rangeFormat.format(today)}
        </div>
      </div>
    </>
  );
};

export { ChartBarDefault };
export default ChartBarDefault;