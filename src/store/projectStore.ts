import { create } from "zustand";

type Project = {
  id: string;
  name: string;
  description: string;
  status: string;
  repository: string;
};

type ProjectStore = {
  projects: Project[];
  addProject: (project: Project) => void;
  moveProject: (activeId: string, targetId: string) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],

  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  moveProject: (activeId, targetId) =>
    set((state) => {
      const from = state.projects.findIndex((project) => project.id === activeId);
      const to = state.projects.findIndex((project) => project.id === targetId);

      if (from === -1 || to === -1 || from === to) return state;

      const projects = [...state.projects];
      const [project] = projects.splice(from, 1);
      projects.splice(to, 0, project);
      return { projects };
    }),
}));
