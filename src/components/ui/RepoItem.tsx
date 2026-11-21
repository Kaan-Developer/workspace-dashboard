import { LuStar, LuGitFork, LuArrowUpRight } from "react-icons/lu";
import type { GithubRepo } from "@/services/github";

const RepoItem = ({ repo }: { repo: GithubRepo }) => (
  <a
    href={repo.html_url}
    target="_blank"
    rel="noreferrer"
    className="group flex items-center justify-between gap-4 rounded-lg overflow-hidden p-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary"
  >
    <div className="flex min-w-0 flex-col gap-1">
      <span className="font-medium">{repo.name}</span>
      <span className="truncate text-sm text-muted-foreground">
        {repo.description ?? "No description"}
      </span>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <LuStar size={14} aria-hidden="true" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <LuGitFork size={14} aria-hidden="true" />
          {repo.forks_count}
        </span>
        <span>
          Updated {new Date(repo.updated_at).toLocaleDateString("tr-TR")}
        </span>
      </div>
    </div>

    <LuArrowUpRight
      size={18}
      aria-hidden="true"
      className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
    />
  </a>
);

export default RepoItem;