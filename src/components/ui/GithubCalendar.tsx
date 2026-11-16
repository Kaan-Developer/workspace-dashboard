import { useRef, useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { LuCalendarDays } from "react-icons/lu";

type Activity = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const GithubActivity = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [total, setTotal] = useState<number | null>(null);

  // Taşarsa en yeni haftalar (sağ taraf) görünsün
  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollLeft = el.scrollWidth;
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <LuCalendarDays size={20} aria-hidden="true" />

        <h2 className="text-lg">Contributions</h2>
      </div>
      <div ref={ref} className="w-full overflow-x-auto pb-2">
        <GitHubCalendar
          username="kaan-developer"
          colorScheme="light"
          blockSize={10}
          blockMargin={4}
          fontSize={12}
          showTotalCount={false}
          theme={{
            light: ["#F0F1F3", "#DBEAFE", "#93C5FD", "#60A5FA", "#2563EB"],
          }}
          transformData={(data: Activity[]) => {
            const sum = data.reduce((acc, day) => acc + day.count, 0);
            // render sırasında setState çağırmamak için ertele
            queueMicrotask(() => setTotal(sum));
            return data;
          }}
          tooltips={{
            activity: {
              text: (activity) =>
                `${activity.count} contributions on ${activity.date}`,
            },
          }}
        />
      </div>

      <p className="border-t border-border pt-3">
        <span className="text-3xl font-normal tracking-tight tabular-nums">
          {total ?? "–"}
        </span>
        <span className="ml-2 text-sm text-muted-foreground">
          contributions in the last year
        </span>
      </p>
    </div>
  );
};

export default GithubActivity;
