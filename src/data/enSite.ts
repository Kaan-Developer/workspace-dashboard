export const enSite = {
  site: {
    name: "Workspace",
    title: "Workspace Dashboard",
  },
  navigation: {
    label: "Main navigation",
    groups: {
      workspace: "Workspace",
      connect: "Connect",
      manage: "Manage",
    },
    items: {
      overview: "Overview",
      projects: "Projects",
      tasks: "Tasks",
      goals: "Goals",
      "ai-assistant": "AI Assistant",
      friends: "Friends",
      integrations: "Integrations",
      activity: "Activity",
      settings: "Settings",
    },
  },
  overview: {
    title: "Overview",
    description: "Your projects, priorities, and progress. All in one place.",
    stats: {
      activeProjects: {
        label: "Active projects",
        detail: (count: number) => `${count} ready for your next step`,
      },
      tasksCompleted: {
        label: "Tasks completed",
        detail: (count: number) => `${count} more than last week`,
      },
      goalsInProgress: {
        label: "Goals in progress",
        detail: (count: number) => `${count} ${count === 1 ? "milestone" : "milestones"} approaching`,
      },
      connectedServices: {
        label: "Connected services",
        detail: "All connections healthy",
      },
    },
  },
  navbar: {
    workspace: "Workspace",
    breadcrumbLabel: "Breadcrumb",
    openSidebar: "Open sidebar",
    closeSidebar: "Close sidebar",
    notifications: "Notifications",
  },
  search: {
    label: "Search",
    placeholder: "Search...",
    results: (count: number) => `${count} ${count === 1 ? "result" : "results"}`,
  },
  profile: {
    label: (name: string) => `Profile: ${name}`,
    account: "Account",
    logout: "Log out",
  },
  language: {
    label: "Language",
    tr: "Türkçe",
    en: "English",
  },
  common: {
    close: "Close",
  },
};

export type SiteContent = typeof enSite;
