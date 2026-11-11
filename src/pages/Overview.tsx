import { enSite } from "@/data/enSite";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import Card from "@/components/ui/Card";
import ChartBarDefault from "@/components/ui/Chart";
import { FiGitBranch } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import AddProject from "@/components/ui/AddProject";
import {
  LuFolder,
  LuFolderOpen,
  LuFolderPlus,
  LuEllipsis,
  LuArrowRight,
  LuArrowUpRight,
} from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import clsx from "clsx";
import { Link } from "react-router";
import { useProjectStore } from "@/store/projectStore";

const Overview = () => {
  const overview = enSite.overview;
  const projects = enSite.projects;
  const rowClass =
    "grid grid-cols-[minmax(300px,2fr)_160px_minmax(280px,2fr)_100px] items-center gap-6 px-4";
  const projectItems = Array.isArray(projects?.items) ? projects.items : [];

  const [Active, setActive] = useState(false);
  const savedProjects = useProjectStore((state) => state.projects);

  return (
    <section>
      <div>
        <div className="flex flex-col lg:flex-row gap-2 lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg lg:text-3xl">{overview.title}</h1>
            <p className="text-muted-foreground">{overview.description}</p>
          </div>

          <Button className="p-5" variant="default" onClick={() => setActive(true)} >
            <LuPlus size={14} aria-hidden="true" />
            New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 mt-3 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(overview.stats).map(([id, stat]) => {
            const Icon = stat.icon;
            const detail =
              "detailCount" in stat
                ? stat.detail(stat.detailCount)
                : stat.detail;

            return (
              <Card
                key={id}
                className="flex flex-col transition-all gap-2 rounded-xl bg-card p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                  <div className="p-2 bg-muted rounded-lg">
                    <Icon
                      aria-hidden="true"
                      className="size-4 text-muted-foreground"
                    />
                  </div>
                </div>

                <span className="text-2xl font-normal tracking-tight tabular-nums">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground">{detail}</span>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4 mt-6">
        <Card>
          <ChartBarDefault />
        </Card>

        <Card>
          <div className="flex min-h-0 flex-1 flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaGithub size={28} className="shrink-0" aria-hidden="true" />
              <div className="flex flex-col">
                <h2 className="text-lg">Recent commits</h2>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <FiGitBranch size={20} color="#b5b5bd" />

              <div className="flex flex-col">
                <h2>a</h2>
                <span></span>
                <p>a</p>
              </div>
            </div>

            <div className="mt-auto flex shrink-0 justify-start border-t border-border pt-2">
              <Button variant="outline">
                <FaArrowRight size={18} />
                View activity
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4 mt-6">
        <Card className="min-w-0">
          <div className="flex items-center justify-between gap-4 border-b border-border py-3">
            <span>Recent projects</span>
          </div>
          <div className="@container relative isolate overflow-hidden rounded-b-lg">
            <div className="overflow-x-auto">
              <div className="min-w-[950px]">
                {projectItems.length === 3 ? (
                  <div className="absolute inset-x-0 bottom-0 z-10 flex h-48 flex-col items-center justify-end gap-3 px-1 pb-5 @min-[240px]:px-4">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-linear-to-b from-card/10 via-card/70 to-card backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent,black_20%)]"
                    />
                    <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm">
                      <LuFolderOpen className="size-4" aria-hidden="true" />
                    </div>
                    <p className="relative hidden text-center text-sm text-muted-foreground @min-[240px]:block"></p>
                    <Button
                      asChild
                      variant="outline"
                      className="relative size-10 max-w-full gap-2 rounded-full border-border bg-linear-to-br from-secondary to-background px-2 text-foreground shadow-sm hover:from-muted hover:to-secondary dark:bg-background @min-[240px]:w-auto @min-[240px]:px-5"
                    >
                      <Link to="/projects">
                        <LuArrowUpRight className="size-4" aria-hidden="true" />
                        <span className="sr-only @min-[240px]:not-sr-only">
                          View all projects
                        </span>
                      </Link>
                    </Button>
                  </div>
                ) : (
                  savedProjects.slice(0, 3).map((project, index) => {
                    const isThird = index === 2;

                    return (
                      <div
                        key={project.id}
                        className={clsx(
                          rowClass,
                          "border-b border-border py-3 last:border-b-0",
                          isThird && "min-h-48 items-start pt-5",
                        )}
                      >
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                            <LuFolder size={20} aria-hidden="true" />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate">{project.name}</p>
                            <p className="truncate text-sm text-muted-foreground">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex w-fit items-center gap-2 whitespace-nowrap rounded-lg border border-border bg-muted">
                          <span
                            className={clsx("rounded-full", {
                              "bg-primary w-1 h-1":
                                project.status === "inProgress",
                              "bg-green-500": project.status === "completed",
                              "bg-gray-400": project.status === "paused",
                            })}
                          />
                          {
                            Object.entries(projects.statuses).find(
                              ([status]) => status === project.status,
                            )?.[1]
                          }
                        </div>

                        <div className="col-start-4 flex items-center justify-end gap-4">
                          <div className="p-2 hover:bg-muted rounded-lg cursor-pointer">
                            <FaGithub size={20} aria-hidden="true" />
                          </div>
                          <div className="p-2 hover:bg-muted rounded-lg cursor-pointer">
                            <LuEllipsis size={20} aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {savedProjects.length === 0 && (
              <div className="flex h-48 flex-col items-center justify-end gap-3 px-1 pb-5 @min-[240px]:px-4">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-b from-card/10 via-card/70 to-card backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent,black_20%)]"
                />
                <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm">
                  <LuFolderPlus className="size-4" aria-hidden="true" />
                </div>
                <p className="relative hidden text-center text-sm text-muted-foreground @min-[240px]:block">
                  No projects yet.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="relative size-10 max-w-full gap-2 rounded-full border-border bg-linear-to-br from-secondary to-background px-2 text-foreground shadow-sm hover:from-muted hover:to-secondary dark:bg-background @min-[240px]:w-auto @min-[240px]:px-5"
                >
                  <Link to="/projects">
                    <LuPlus className="size-4" aria-hidden="true" />
                    <span className="sr-only @min-[240px]:not-sr-only">
                      Create Project
                    </span>
                  </Link>
                </Button>
              </div>
            )}

            {savedProjects.length >= 3 && (
              <div className="absolute inset-x-0 bottom-0 z-10 flex h-48 flex-col items-center justify-end gap-3 px-1 pb-5 @min-[240px]:px-4">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-b from-card/10 via-card/70 to-card backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent,black_20%)]"
                />
                <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm">
                  <LuFolderOpen className="size-4" aria-hidden="true" />
                </div>
                <p className="relative hidden text-center text-sm text-muted-foreground @min-[240px]:block">
                  Open the full project list.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="relative size-10 max-w-full gap-2 rounded-full border-border bg-linear-to-br from-secondary to-background px-2 text-foreground shadow-sm hover:from-muted hover:to-secondary dark:bg-background @min-[240px]:w-auto @min-[240px]:px-5"
                >
                  <Link to="/projects">
                    <LuArrowUpRight className="size-4" aria-hidden="true" />
                    <span className="sr-only @min-[240px]:not-sr-only">
                      Go to projects
                    </span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </Card>

        <Card></Card>
      </div>

      <AddProject open={Active} onOpenChange={setActive} />
    </section>
  );
};

export default Overview;
