import Search from "@/components/ui/Search";
import { Button } from "@/components/ui/button";
import { enSite } from "@/data/enSite";
import { LuPlus } from "react-icons/lu";
import Card from "@/components/ui/Card";
import { LuFolder, LuEllipsis } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import clsx from "clsx";

const Projects = () => {
  const projects = enSite.projects;

  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-lg lg:text-3xl">{projects.title}</h1>
            <p className="text-muted-foreground">{projects.description}</p>
          </div>
          <Search title={projects.searchPlaceholder} />
        </div>

        <div className="flex">
          <Button className="p-5" variant="default">
            <LuPlus size={14} aria-hidden="true" />
            Add project
          </Button>
        </div>
      </div>

      <Card className="mt-5">
        <div className="flex items-center justify-between">
          <span>Project</span>
          <span>Status</span>
          <span>Last commit</span>
        </div>

        <div className="flex flex-col gap-3">
          {projects.items.map((project) => {
            const FolderIcon = LuFolder;
            const GithubIcon = FaGithub;
            const Three = LuEllipsis;

            return (
              <div className="flex items-center rounded-lg justify-between gap-4 border-b border-border pb-2">
                <div className="flex items-center gap-4">
                  <div className="bg-muted w-10 h-10 rounded-lg flex items-center justify-center">
                    <FolderIcon size={20} />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-md">{project.name}</span>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-muted rounded-lg px-2 py-1 border border-border">
                  <span
                    className={clsx("w-3 h-3 rounded-full", {
                      "bg-primary": project.status === "inProgress",
                      "bg-green-500": project.status === "completed",
                      "bg-gray-400": project.status === "paused",
                    })}
                  />
                  {project.status}
                </div>

                <div className="flex flex-col items-start">
                  <span>{project.lastCommit.time}</span>
                  <p className="text-muted-foreground">
                    {project.lastCommit.message}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hover:bg-muted cursor-pointer rounded-lg p-2 flex items-center justify-center">
                    <GithubIcon size={20} />
                  </div>

                  <div className="hover:bg-muted cursor-pointer rounded-lg p-2 flex items-center justify-center">
                    <LuEllipsis size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </section>
  );
};

export default Projects;
