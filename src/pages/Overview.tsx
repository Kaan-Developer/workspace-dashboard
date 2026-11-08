import { enSite } from "@/data/enSite";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import Card from "@/components/ui/Card";
import ChartBarDefault from "@/components/ui/Chart";
import { LuFolder, LuEllipsis } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import clsx from "clsx";
import { Link } from "react-router";
import { LuArrowRight } from "react-icons/lu";

const Overview = () => {
  const overview = enSite.overview;
  const projects = enSite.projects;
  const rowClass =
    "grid grid-cols-[minmax(300px,2fr)_160px_minmax(280px,2fr)_100px] items-center gap-6 px-4";

  return (
    <section>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg lg:text-3xl">{overview.title}</h1>
            <p className="text-muted-foreground">{overview.description}</p>
          </div>

          <Button className="p-5" variant="default">
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
                className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                  <Icon
                    aria-hidden="true"
                    className="size-4 text-muted-foreground"
                  />
                </div>

                <span className="text-2xl font-semibold">{stat.value}</span>
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

        <Card></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4 mt-6">
        <Card className="mt-5 min-w-0">
          <div className="overflow-x-auto">
            <div className="min-w-[950px]">
              {/* Başlıklar */}
              <div className="flex items-center justify-between border-b border-border py-3">
                <span>Recent projects</span>
                <Link to="/projects" className="flex items-center gap-1">
                  All projects
                  <LuArrowRight size={18} />
                </Link>
              </div>

              {/* Proje satırları */}
              {projects.items.slice(0, 3).map((project) => {
                const index = project.id[3]

                return (
                  <div
                    key={project.id}
                    className={clsx(
                      rowClass,
                      "border-b border-border py-3 last:border-b-0",
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

                    <div className="flex w-fit items-center gap-2 whitespace-nowrap rounded-lg border border-border bg-muted px-2 py-1">
                      <span
                        className={clsx("size-3 shrink-0 rounded-full", {
                          "bg-primary": project.status === "inProgress",
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

                    <div className="flex items-center justify-end gap-4">
                      <FaGithub size={20} aria-hidden="true" />
                      <LuEllipsis size={20} aria-hidden="true" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <Card></Card>
      </div>
    </section>
  );
};

export default Overview;
