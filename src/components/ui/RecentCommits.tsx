import { Button } from "./button"
import { FiGitBranch } from "react-icons/fi";
import { FaGithub, FaArrowRight } from "react-icons/fa"
import { useProjectStore } from "@/store/projectStore";
import { useState, useEffect     } from "react";
import { getUserCommits, type GithubCommit } from "@/services/github";


const RecendCommits = () => {
    const savedProjects = useProjectStore((state) => state.projects);
    const [commits, setCommits] = useState<GithubCommit[]>([]);
    const [commitsLoading, setCommitsLoading] = useState(true);
    const [commitsError, setCommitsError] = useState(false);

    useEffect(() => {
        const fetchCommits = async () => {
            try {
                const weekStart = new Date();
                weekStart.setHours(0, 0, 0, 0);
                weekStart.setDate(weekStart.getDate() -6);
                const data = await getUserCommits("kaan-developer", weekStart.toISOString());
                setCommits(data);
            } catch {
                setCommitsError(true);
            } finally {
                setCommitsLoading(false);
            };
        };

        fetchCommits();
    }, []);

    return (
          <div className="flex min-h-0 flex-1 flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaGithub size={28} className="shrink-0" aria-hidden="true" />
              <div className="flex flex-col">
                <h2 className="text-lg">Recent commits</h2>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex flex-col">
                {commitsLoading && (
                  <p className="mt-4 text-sm text-muted-foreground" role="status">
                    Loading commits…
                  </p>
                )}
                {commitsError && (
                  <p className="mt-4 text-sm text-destructive" role="alert">
                    GitHub activity could not be loaded. Check the username or try again later.
                  </p>
                )}
                {!commitsLoading && !commitsError && commits.length === 0 && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    No commits in the last 7 days.
                  </p>
                )}
                {commits.slice(0, 3).map((commit) => (
                  <div
                    key={commit.sha}
                    className="mt-4 flex items-center gap-2"
                  >
                    <FiGitBranch size={20} color="#b5b5bd" />

                    <div className="flex min-w-0 flex-col">
                      <h2 className="truncate max-w-md lg:max-w-xl">
                        {commit.commit.message.split("\n")[0]}
                      </h2>

                      <span className="text-xs text-muted-foreground">
                        {commit.commit.author?.name ?? "Unknown author"}
                      </span>

                      <p className="text-xs text-muted-foreground">
                        {commit.commit.author?.date
                          ? new Date(
                              commit.commit.author.date,
                            ).toLocaleDateString("tr-TR")
                          : "Unknown date"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto flex shrink-0 justify-start border-t border-border pt-2">
              <Button
                variant="ghost"
                className="h-9 gap-2 px-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <FaArrowRight size={14} aria-hidden="true" />
                View activity
              </Button>
            </div>
          </div>
    );
};

export default RecendCommits;