import { useState } from "react";
import { LuPlus, LuFolderPlus, LuEllipsis, LuImage } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import AddProject from "@/components/ui/AddProject";
import { enSite } from "@/data/enSite";
import { useProjectStore } from "@/store/projectStore";
// Project tipini kendi store veya types dosyandan import et:
import type { Project } from "@/types/project";

type ProjectImageProps = {
  src?: Project["image"];
  alt: string;
};

const ProjectImage = ({ src, alt }: ProjectImageProps) => {
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
  const projectsContent = enSite.projects;
  const [isAddOpen, setIsAddOpen] = useState(false);
  const savedProjects = useProjectStore((state) => state.projects);

  const statusLabels = projectsContent.statuses as Record<string, string>;

  return (
    <section>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl lg:text-3xl">
            {projectsContent.title}
          </h1>
          <p className="text-muted-foreground">{projectsContent.description}</p>
        </div>

        <div className="flex">
          <Button
            type="button"
            className="gap-2 p-5"
            variant="default"
            onClick={() => setIsAddOpen(true)}
          >
            <LuPlus size={16} aria-hidden="true" />
            {projectsContent.addProject}
          </Button>
        </div>
      </div>

      <Card className="mt-5 min-w-0 bg-transparent shadow-none">
        {savedProjects.length === 0 ? (
          <div className="@container relative isolate overflow-hidden rounded-b-lg">
            <div className="flex h-48 flex-col items-center justify-end gap-3 px-4 pb-5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-card/10 via-card/70 to-card backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent,black_20%)]"
              />
              <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm">
                <LuFolderPlus className="size-4" aria-hidden="true" />
              </div>
              <p className="relative text-center text-sm text-muted-foreground">
                {projectsContent.empty}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddOpen(true)}
                className="relative size-10 max-w-full gap-2 rounded-full border-border bg-gradient-to-br from-secondary to-background px-2 text-foreground shadow-sm hover:from-muted hover:to-secondary dark:bg-background @min-[240px]:w-auto @min-[240px]:px-5"
              >
                <LuPlus className="size-4" aria-hidden="true" />
                <span className="sr-only @min-[240px]:not-sr-only">
                  Create Project
                </span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {savedProjects.map((project) => (
              <Card key={project.id} className="flex flex-col gap-3 p-3">
                <div className="relative">
                  <div className="absolute left-2 top-2 flex items-center gap-2 rounded-full bg-muted/90 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur-xs">
                    <span
                      aria-hidden="true"
                      className={clsx("size-2 shrink-0 rounded-full", {
                        "bg-green-500": project.status === "completed",
                        "bg-primary": project.status === "inProgress",
                        "bg-gray-400": project.status === "paused",
                      })}
                    />
                    {statusLabels[project.status] ?? project.status}
                  </div>
                  <ProjectImage src={project.image} alt={project.name} />
                </div>

                <div className="flex flex-1 flex-col gap-1">
                  <h2 className="line-clamp-1 text-lg font-semibold">
                    {project.name}
                  </h2>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-border pt-2">
                  {project.repository && (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} GitHub repository`}
                      className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted"
                    >
                      <FaGithub size={20} aria-hidden="true" />
                    </a>
                  )}
                  <button
                    type="button"
                    aria-label={`${project.name} options`}
                    className="ml-auto rounded-lg p-2 text-foreground transition-colors hover:bg-muted"
                  >
                    <LuEllipsis size={20} aria-hidden="true" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      <AddProject open={isAddOpen} onOpenChange={setIsAddOpen} />
    </section>
  );
};

export default Projects;