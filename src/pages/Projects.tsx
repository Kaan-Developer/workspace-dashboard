import Search from "@/components/ui/Search";
import { Button } from "@/components/ui/button";
import { enSite } from "@/data/enSite";
import { LuPlus } from "react-icons/lu";
import Card from "@/components/ui/Card";
import { LuFolder, LuEllipsis } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import clsx from "clsx";
import AddProject from "@/components/ui/AddProject";
import { useState } from "react";
import { Line } from "recharts";
import { Link } from "react-router";

const Projects = () => {
  const projects = enSite.projects;
  const rowClass =
    "grid grid-cols-[minmax(300px,2fr)_160px_minmax(280px,2fr)_100px] items-center gap-6 px-4";

  const [Active, setActive] = useState(false);

  return (
    <section>
      <div className="flex flex-col lg:flex-row gap-2 lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg lg:text-3xl">{projects.title}</h1>
            <p className="text-muted-foreground">{projects.description}</p>
          </div>
          <Search title={projects.searchPlaceholder} />
        </div>

        <div className="flex">
          <Button
            className="p-5"
            variant="default"
            onClick={() => setActive(true)}
          >
            <LuPlus size={14} aria-hidden="true" />
            {projects.addProject}
          </Button>
        </div>
      </div>

      <Card className="mt-5 min-w-0">
        <div className="overflow-x-auto">
          <div className="min-w-[950px]">
            {/* Başlıklar */}
            <div className={clsx(rowClass, "border-b border-border py-3")}>
              <span>{projects.columns.project}</span>
              <span>{projects.columns.status}</span>
              <span>{projects.columns.lastCommit}</span>
              <span className="sr-only">{projects.actions.more}</span>
            </div>

            {/* Proje satırları */}
            {projects.items.map((project) => (
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

                <div className="min-w-0">
                  <p>{project.lastCommit.time}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {project.lastCommit.message}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-4">
                  <div className="p-2 hover:bg-muted rounded-lg cursor-pointer">
                    <Link className="" to={project.description}>
                                        <FaGithub size={20} aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="p-2 hover:bg-muted rounded-lg cursor-pointer">
                    <LuEllipsis size={20} aria-hidden="true" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <AddProject open={Active} onOpenChange={setActive} />
    </section>
  );
};

export default Projects;
