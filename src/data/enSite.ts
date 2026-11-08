import {
  LuCalendarDays,
  LuFolder,
  LuGitBranch,
  LuSquareCheck,
} from "react-icons/lu";

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
      trackedProjects: {
        label: "Tracked projects",
        icon: LuFolder,
        value: 4,
        detailCount: 2,
        detail: (count: number) => `${count} in progress`,
      },
      commits: {
        label: "Commits · 7 days",
        icon: LuGitBranch,
        value: 38,
        detail: "Across tracked repositories",
      },
      activeDays: {
        label: "Active days",
        icon: LuCalendarDays,
        value: "6 / 7",
        detail: "Nov 1 – Nov 7",
      },
      openTasks: {
        label: "Open tasks",
        icon: LuSquareCheck,
        value: 5,
        detail: "2 in progress · 3 to do",
      },
    },
  },
  projects: {
    title: "Projects",
    description: "Manage your projects and keep track of what changed.",
    demoData: "Demo data",
    addProject: "Add project",
    searchPlaceholder: "Search projects...",
    statusFilter: "All statuses",
    sortBy: "Last updated",
    columns: {
      project: "Project",
      status: "Status",
      lastCommit: "Last commit",
      openTasks: "Open tasks",
    },
    statuses: {
      inProgress: "In progress",
      completed: "Completed",
      paused: "Paused",
    },
    actions: {
      repository: "Open GitHub repository",
      more: "More actions",
    },
    items: [
      {
        id: "workspace-dashboard",
        name: "workspace-dashboard",
        description: "Personal workspace for projects and coding.",
        status: "inProgress",
        lastCommit: { time: "24 min ago", message: "feat: add GitHub activity overview" },
        openTasks: 3,
      },
      {
        id: "portfolio",
        name: "portfolio",
        description: "My personal website and selected work.",
        status: "completed",
        lastCommit: { time: "2 hours ago", message: "fix: improve mobile navigation" },
        openTasks: 0,
      },
    ],
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
