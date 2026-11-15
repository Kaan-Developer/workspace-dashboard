import { LuStar, LuGitFork } from "react-icons/lu";
import type { GithubRepo } from "@/services/github";

const RepoItem = ({ repo }: { repo: GithubRepo }) => (
  <a
    href={repo.html_url}
    target="_blank"
    rel="noreferrer"
    className="flex flex-col gap-1 rounded-lg overflow-hidden p-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary "
  >
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
  </a>
);

export default RepoItem;
