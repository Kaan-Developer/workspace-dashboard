import Search from "@/components/ui/Search";
import { Button } from "@/components/ui/button";
import { enSite } from "@/data/enSite";
import { LuPlus } from "react-icons/lu";
import Card from "@/components/ui/Card";
import {
  LuFolderPlus,
  LuEllipsis,
  LuImage,
} from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import clsx from "clsx";
import AddProject from "@/components/ui/AddProject";
import { useState } from "react";
import { useProjectStore } from "@/store/projectStore";

const ProjectImage = ({
  src,
  alt,
}: {
  src: string | null;
  alt: string;
}) => {
  return (
    <div className="flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-md bg-muted">
      {src ? (
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : (
        <LuImage className="size-8 text-muted-foreground" aria-hidden="true" />
      )}
    </div>
  );
};

const Projects = () => {
  const projects = enSite.projects;

  const [Active, setActive] = useState(false);
  const savedProjects = useProjectStore((state) => state.projects);

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
        {savedProjects.length === 0 ? (
          <div className="@container relative isolate overflow-hidden rounded-b-lg">
            <div className="flex h-48 flex-col items-center justify-end gap-3 px-4 pb-5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-b from-card/10 via-card/70 to-card backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent,black_20%)]"
              />
              <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm">
                <LuFolderPlus className="size-4" aria-hidden="true" />
              </div>
              <p className="relative text-center text-sm text-muted-foreground">
                {projects.empty}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => setActive(true)}
                className="relative size-10 max-w-full gap-2 rounded-full border-border bg-linear-to-br from-secondary to-background px-2 text-foreground shadow-sm hover:from-muted hover:to-secondary dark:bg-background @min-[240px]:w-auto @min-[240px]:px-5"
              >
                <LuPlus className="size-4" aria-hidden="true" />
                <span className="sr-only @min-[240px]:not-sr-only">
                  Create Project
                </span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-4 mt-6">
            {savedProjects.map((project) => (
              <Card key={project.id} className="flex flex-col gap-2 p-2">
                <div className="relative">
                  <div className="absolute left-2 top-2 flex items-center gap-2 rounded-full bg-muted px-2 py-1 text-sm">
                    <span
                      aria-hidden="true"
                      className={clsx("size-2 shrink-0 rounded-full", {
                        "bg-green-500": project.status === "completed",
                        "bg-primary": project.status === "inProgress",
                        "bg-gray-400": project.status === "paused",
                      })}
                    />
                    {Object.entries(projects.statuses).find(
                      ([status]) => status === project.status,
                    )?.[1] ?? project.status}
                  </div>
                  <ProjectImage src={project.image} alt={project.name} />
                </div>

                <div>
                  <h2 className="text-xl">{project.name}</h2>
                  <p className="text-md text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <div className="border-t border-border flex items-center justify-between pt-2">
                  {project.repository && (
                    <a
                      href={project.repository}
                      target="_blank"
                      className="p-2 hover:bg-muted rounded-lg cursor-pointer"
                    >
                      <FaGithub size={22} aria-hidden="true" />
                    </a>
                  )}
                  <div className="p-2 hover:bg-muted rounded-lg cursor-pointer">
                    <LuEllipsis size={22} aria-hidden="true" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      <AddProject open={Active} onOpenChange={setActive} />
    </section>
  );
};

export default Projects;
