import Card from "@/components/ui/Card";
import RepoItem from "@/components/ui/RepoItem";
import { useWeeklyCommits } from "@/hooks/useWeeklyCommit";
import { useUserRepos } from "@/hooks/useUserRepos";
import { LuBook, LuGitBranch, LuStar } from "react-icons/lu";
import type { IconType } from "react-icons/lib";

type StatCard = {
  id: string;
  icon: IconType;
  count: number;
  title: string;
};

const Repositories = () => {
  const {
    data: commits = [],
    isLoading: commitsLoading,
    isError: commitsError,
  } = useWeeklyCommits("kaan-developer");
  const {
    data: repos = [],
    isLoading: reposLoading,
    isError: reposError,
  } = useUserRepos("kaan-developer");

  const totalStars = repos.reduce((total, repo) => total + repo.stargazers_count, 0);
  const cardItems: StatCard[] = [
    { id: "commits", icon: LuGitBranch, count: commits.length, title: "Commits (7 days)" },
    { id: "repositories", icon: LuBook, count: repos.length, title: "Repositories" },
    { id: "stars", icon: LuStar, count: totalStars, title: "Total Stars" },
  ];

  return (
    <section className="space-y-5">
      <div className="flex flex-col">
        <h1 className="text-2xl lg:text-3xl">Repositories</h1>
        <p className="text-muted-foreground">
          Explore my GitHub repositories, projects and contributions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {cardItems.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.id} className="border border-border">
              <div className="flex items-center justify-between gap-2">
                <div className="grid size-9 shrink-0 place-items-center rounded-xl border border-primary/15 bg-primary/10 text-primary">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <span className="text-2xl font-semibold tracking-tight tabular-nums">
                  {item.count}
                </span>
              </div>
              <p className="m-0 text-sm font-medium text-muted-foreground">
                {item.title}
              </p>
            </Card>
          );
        })}
      </div>

      <div className="border-t border-border"></div>

      <Card>
        <h2 className="text-lg font-semibold">GitHub repositories</h2>
        {reposLoading && <p className="text-sm text-muted-foreground">Loading repositories…</p>}
        {reposError && <p role="alert">Could not load repositories from GitHub.</p>}
        {!reposLoading && !reposError && repos.length === 0 && (
          <p className="text-sm text-muted-foreground">No repositories found.</p>
        )}
        {!reposLoading && !reposError && repos.length > 0 && (
          <div className="divide-y divide-border">
            {repos.map((repo) => <RepoItem key={repo.id} repo={repo} />)}
          </div>
        )}
      </Card>

      {commitsError && (
        <p role="status" className="text-sm text-muted-foreground">
          Weekly commit count is unavailable right now.
        </p>
      )}
      {commitsLoading && (
        <p role="status" className="text-sm text-muted-foreground">
          Loading weekly commit count…
        </p>
      )}
    </section>
  );
};

export default Repositories;
