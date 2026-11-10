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
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],

  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),
}));
