import GithubActivity from "@/components/ui/GithubCalendar";
import Card from "@/components/ui/Card";
import { FaGithub } from "react-icons/fa";
import Githubİmage from "../assets/images/github-mark.svg";
import { ChartBarLabel } from "@/components/ui/Chart";
import { useWeeklyCommits } from "@/hooks/useWeeklyCommit";
import { Button } from "@/components/ui/button";
import { FiArrowRight, FiGitBranch } from "react-icons/fi";
import { useUserRepos } from "@/hooks/useUserRepos";
import RepoItem from "@/components/ui/RepoItem";
import type { IconType } from "react-icons/lib";
import { LuGitBranch, LuAppWindow, LuStar } from "react-icons/lu";

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
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-4">
        <Card className="flex-row items-center px-4 py-8">
          <div>
            <img src={Githubİmage} alt="" className="w-30 h-30" />
          </div>

          <div className="flex min-w-0 flex-col">
            <h2 className="font-semibold text-lg lg:text-xl">
              Github Overview
            </h2>
            <p className="text-md text-muted-foreground">
              Track your commits, repositories and development activicy all in
              one place
            </p>
          </div>
        </Card>

        {cardItems.map((item) => {
          const Icon = item.icon;

          return <Card key={item.id} className="flex items-start gap-2">
            <div className="flex p-2 bg-muted rounded-lg text-primary">
            <Icon size={20} />
            </div>

            <div>
                          <span className="text-2xl font-semibold">{item.count}</span>

            <p className="text-muted-foreground text-sm">{item.title}</p>
            </div>
          </Card>;
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <GithubActivity width />
        </Card>

        <Card>
          <ChartBarLabel commits={commits} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr] gap-4">
        <Card className="flex flex-col">
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

        <Card></Card>
      </div>
    </section>
  );
};

export default Activity;
