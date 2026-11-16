import { Button } from "./button";
import { useWeeklyCommits } from "@/hooks/useWeeklyCommit";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";

type Commit = {
  link?: boolean;
};

const RecendCommits = ({ link }: Commit) => {
  const {
    data: commits = [],
    isLoading,
    isError,
  } = useWeeklyCommits("kaan-developer");

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2">
      <div className="flex justify-between items-center gap-2 border-b border-border pb-4">
        <h2 className="text-lg">Recent commits</h2>

        <div>
          {link === true && (
            <div className="mt-auto flex shrink-0 justify-start">
              <Link to="/activity">
                <Button
                  variant="ghost"
                  className="h-9 gap-2 px-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  View activity
                  <FiArrowRight size={14} aria-hidden="true" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex flex-col">
          {isLoading && (
            <p className="mt-4 text-sm text-muted-foreground" role="status">
              Loading commits…
            </p>
          )}
          {isError && (
            <p className="mt-4 text-sm text-destructive" role="alert">
              GitHub activity could not be loaded. Check the username or try
              again later.
            </p>
          )}
          {!isLoading && !isError && commits.length === 0 && (
            <p className="mt-4 text-sm text-muted-foreground">
              No commits in the last 7 days.
            </p>
          )}
          {commits.length > 0 && (
            <div className="relative flex flex-col">
              <span
                aria-hidden="true"
                className="absolute bottom-2 left-4 top-2 w-px bg-border"
              />
              {commits.slice(0, 3).map((commit) => (
                <div key={commit.sha} className="mt-2 flex items-center gap-2 group">
                  <svg
                    aria-hidden="true"
                    className="relative z-10 h-6 w-8 shrink-0"
                    viewBox="0 0 32 24"
                    fill="none"
                  >
                    <path d="M8 12h16" stroke="var(--primary)" />
                    <circle
                      cx="16"
                      cy="12"
                      r="2.5"
                      fill="var(--card)"
                      stroke="var(--primary)"
                    />
                  </svg>

                  <div className="flex min-w-0 flex-col">
                    <h2 className="truncate max-w-md lg:max-w-xl group-hover:text-primary group-hover:cursor-pointer">
                      {commit.commit.message.split("\n")[0]}
                    </h2>

                    <span className="text-xs text-muted-foreground">
                      {commit.commit.author?.name ?? "Unknown author"}
                    </span>

                    <p className="text-xs text-muted-foreground">
                      {commit.commit.author?.date
                        ? new Date(commit.commit.author.date).toLocaleDateString(
                            "tr-TR",
                          )
                        : "Unknown date"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecendCommits;
