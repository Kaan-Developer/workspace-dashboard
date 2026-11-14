import { GitHubCalendar } from "react-github-calendar";
import { useEffect, useRef, useState } from "react";

const WEEKS = 52;
const MARGIN = 4;

const GithubActivity = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [blockSize, setBlockSize] = useState(12);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(([ entry ]) => {
      const width = entry.contentRect.width;
      const size = Math.floor(width / WEEKS) - MARGIN;
      setBlockSize(Math.min(Math.max(size, 8), 20));
    });;

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full overflow-x-auto">
            <GitHubCalendar
      username="kaan-developer"
      colorScheme="light"
      blockSize={blockSize}
      blockMargin={MARGIN}
      fontSize={12}
      theme={{
        light: ["#F0F1F3", "#DBEAFE", "#93C5FD", "#60A5FA", "#2563EB"],
      }}
    />
    </div>
  );
};

export default GithubActivity;
