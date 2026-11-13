import Search from "@/components/ui/Search";
import { Button } from "@/components/ui/button";
import { enSite } from "@/data/enSite";
import { LuPlus } from "react-icons/lu";
import Card from "@/components/ui/Card";
import { LuFolder, LuFolderPlus, LuEllipsis, LuGripVertical } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import clsx from "clsx";
import AddProject from "@/components/ui/AddProject";
import { useState } from "react";
import { Link } from "react-router";
import { useProjectStore } from "@/store/projectStore";

const Projects = () => {
  const projects = enSite.projects;
  const rowClass =
    "grid grid-cols-[minmax(300px,2fr)_160px_minmax(280px,2fr)_100px] items-center gap-6 px-4";

  const [Active, setActive] = useState(false);
  const savedProjects = useProjectStore((state) => state.projects);
  const moveProject = useProjectStore((state) => state.moveProject);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const resetDrag = () => {
    setDraggedId(null);
    setDropTargetId(null);
  };

  const announceMove = (name: string, position: number) => {
    setAnnouncement(`${name}: position ${position + 1} of ${savedProjects.length}`);
  };

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
        <p id="project-reorder-help" className="sr-only">
          Drag the handle onto another row to reorder. Or focus the handle and
          press Arrow Up or Arrow Down.
        </p>
        <p role="status" className="sr-only">{announcement}</p>
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
                <span className="sr-only @min-[240px]:not-sr-only">Create Project</span>
              </Button>
            </div>
          </div>
        ) : (
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
            {savedProjects.map((project, index) => (
              <div
                key={project.id}
                onDragOver={(event) => {
                  if (!draggedId || draggedId === project.id) return;
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "move";
                  setDropTargetId(project.id);
                }}
                onDragLeave={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setDropTargetId(null);
                  }
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  if (draggedId && draggedId !== project.id) {
                    const dragged = savedProjects.find((item) => item.id === draggedId);
                    moveProject(draggedId, project.id);
                    if (dragged) announceMove(dragged.name, index);
                  }
                  resetDrag();
                }}
                className={clsx(
                  rowClass,
                  "border-b border-border py-3 last:border-b-0",
                  draggedId === project.id && "opacity-50",
                  dropTargetId === project.id && "bg-muted ring-1 ring-inset ring-primary",
                )}
              >
                <div className="flex min-w-0 items-center gap-4">
                  <button
                    type="button"
                    draggable
                    aria-label={`Reorder ${project.name}`}
                    aria-describedby="project-reorder-help"
                    className="shrink-0 cursor-grab rounded p-2 text-muted-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary active:cursor-grabbing"
                    onDragStart={(event) => {
                      event.dataTransfer.effectAllowed = "move";
                      event.dataTransfer.setData("text/plain", project.id);
                      setDraggedId(project.id);
                    }}
                    onDragEnd={resetDrag}
                    onKeyDown={(event) => {
                      if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
                      event.preventDefault();
                      const targetIndex = index + (event.key === "ArrowUp" ? -1 : 1);
                      const target = savedProjects[targetIndex];
                      if (!target) return;
                      moveProject(project.id, target.id);
                      announceMove(project.name, targetIndex);
                    }}
                  >
                    <LuGripVertical size={18} aria-hidden="true" />
                  </button>
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

                <div className="flex w-fit items-center gap-2 whitespace-nowrap rounded-lg bg-muted px-2 py-1">
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
                  <span>—</span>
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
        )}
      </Card>

      <AddProject open={Active} onOpenChange={setActive} />
    </section>
  );
};

export default Projects;
