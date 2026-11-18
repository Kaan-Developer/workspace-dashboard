import {
  LuLayoutGrid,
  LuFolder,
  LuSquareCheck,
  LuBot,
  LuUnplug,
  LuActivity,
  LuSettings,
  LuUsers,
} from "react-icons/lu";

import type { IconType } from "react-icons/lib";

type NavigationItem = {
  id: string;
  icon: IconType;
  title: string;
  to: string;
};

type NavigationGroup = {
  id: string;
  title: string;
  items: NavigationItem[];
};

export const Navigation: NavigationGroup[] = [
  {
    id: "workspace",
    title: "WORKSPACE",
    items: [
      { id: "overview", icon: LuLayoutGrid, title: "Overview", to: "/" },
      { id: "projects", icon: LuFolder, title: "Projects", to: "/projects" },
    ],
  },
/*   {
    id: "connect",
    title: "CONNECT",
    items: [
    ],
  }, */
  {
    id: "manage",
    title: "MANAGE",
    items: [
      { id: "activity", icon: LuActivity, title: "Activity", to: "/activity" },
      { id: "settings", icon: LuSettings, title: "Settings", to: "/settings" },
    ],
  },
];
