import GithubActivity from "@/components/ui/GithubCalendar";
import Card from "@/components/ui/Card";
import { FaGithub } from "react-icons/fa";
import GithubImage from "../assets/images/github-mark.svg";
import { ChartBarDefault as ChartBarLabel } from "@/components/ui/Chart";
import { useWeeklyCommits } from "@/hooks/useWeeklyCommit";
import { Button } from "@/components/ui/button";
import { FiArrowRight, FiGitBranch } from "react-icons/fi";
import { useUserRepos } from "@/hooks/useUserRepos";
import RepoItem from "@/components/ui/RepoItem";
import type { IconType } from "react-icons/lib";
import { LuGitBranch, LuAppWindow, LuStar } from "react-icons/lu";
import RecendCommits from "@/components/ui/RecentCommits";

type Cards = {
  id: string;
  icon: IconType;
  count: number;
  title: string;
};

const Activity = () => {
  const { data: commits = [] } = useWeeklyCommits("kaan-developer");
  const {
    data: repos = [],
    isLoading,
    isError,
  } = useUserRepos("kaan-developer");

  const cardItems: Cards[] = [
    {
      id: "branch",
      icon: LuGitBranch,
      count: commits.length,
      title: "Total Commits",
    },
    {
      id: "app",
      icon: LuAppWindow,
      count: repos.length,
      title: "Repositories",
    },
    { id: "favorite", icon: LuStar, count: 1, title: "Total Stars" },
  ];

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr_1fr_1fr] gap-4">
        <Card className="relative isolate flex-row items-center gap-5 overflow-hidden px-6 py-6">
          <div className="relative z-10 shrink-0">
            <img src={GithubImage} alt="" className="h-21 w-21" />
          </div>

          <div className="relative z-10 flex min-w-0 flex-col">
            <h2 className="text-lg font-semibold tracking-tight lg:text-xl">
              GitHub Overview
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Track your commits, repositories, and development activity in one
              place.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -right-28 size-72 rounded-full border-[18px] border-primary/10"
          >
            <span className="absolute inset-8 rounded-full border-[14px] border-primary/10" />
          </div>
        </Card>

        {cardItems.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.id}
              className="relative isolate flex min-h-33 flex-col justify-between gap-2 overflow-hidden border border-primary/10 bg-linear-to-br from-card to-primary/[0.04] transition hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              <div className="relative z-10 flex items-center justify-between gap-2">
                <div className="grid size-9 shrink-0 place-items-center rounded-xl border border-primary/15 bg-primary/10 text-primary">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <span className="text-2xl font-semibold tracking-tight tabular-nums">
                  {item.count}
                </span>
              </div>

              <p className="relative z-10 m-0 max-w-[85%] text-sm font-medium text-muted-foreground">
                {item.title}
              </p>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-1 right-2 h-12 w-[4.5rem] opacity-50"
              >
                <svg viewBox="0 0 64 44">
                  <path
                    className="fill-none stroke-primary stroke-[1.5] [stroke-linecap:round]"
                    d="M2 37 C12 35, 13 25, 22 28 S34 34, 40 23 S51 25, 62 10"
                  />
                </svg>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Card>
            <GithubActivity />
          </Card>

          <Card>
            <div className="flex items-center justify-between border-b border-border pb-2">
              <div className="flex items-center gap-2">
                <h2>Your Repositories</h2>
              </div>

              <Button
                variant="ghost"
                className="h-9 gap-2 px-2 text-sm text-muted-foreground hover:text-foreground"
              >
                View All
                <FiArrowRight size={14} aria-hidden="true" />
              </Button>
            </div>

            {isLoading && (
              <p className="text-sm text-muted-foreground">
                Loading repositories...
              </p>
            )}

            {isError && (
              <p className="text-sm text-destructive">
                Repositories could not be loaded.
              </p>
            )}

            {!isLoading && !isError && repos.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No repositories found.
              </p>
            )}

            {!isLoading && !isError && repos.length > 0 && (
              <div className="grid min-w-0 gap-1">
                {repos.slice(0, 5).map((repo) => (
                  <RepoItem key={repo.id} repo={repo} />
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="flex flex-col gap-4">
                  <Card className="flex gap-4">
          <ChartBarLabel commits={commits} />
        </Card>

        <Card>
          <RecendCommits />
        </Card>
        </div>

      </div>
    </section>
  );
};

export default Activity;
