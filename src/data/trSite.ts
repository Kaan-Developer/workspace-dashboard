import type { SiteContent } from "./enSite";
import {
  LuCalendarDays,
  LuFolder,
  LuGitBranch,
  LuSquareCheck,
} from "react-icons/lu";

export const trSite = {
  site: {
    name: "Workspace",
    title: "Workspace Paneli",
  },
  navigation: {
    label: "Ana menü",
    groups: {
      workspace: "Çalışma Alanı",
      connect: "Bağlantılar",
      manage: "Yönetim",
    },
    items: {
      overview: "Genel Bakış",
      projects: "Projeler",
      tasks: "Görevler",
      goals: "Hedefler",
      "ai-assistant": "Yapay Zekâ Asistanı",
      friends: "Arkadaşlar",
      integrations: "Entegrasyonlar",
      activity: "Etkinlik",
      settings: "Ayarlar",
    },
  },
  overview: {
    title: "Genel Bakış",
    description: "Projelerin, önceliklerin ve ilerlemen. Hepsi bir arada.",
    stats: {
      trackedProjects: {
        label: "Takip edilen projeler",
        icon: LuFolder,
        value: 4,
        detailCount: 2,
        detail: (count: number) => `${count} devam ediyor`,
      },
      commits: {
        label: "Commit · 7 gün",
        icon: LuGitBranch,
        value: 38,
        detail: "Takip edilen depolarda",
      },
      activeDays: {
        label: "Aktif günler",
        icon: LuCalendarDays,
        value: "6 / 7",
        detail: "1 Kas – 7 Kas",
      },
      openTasks: {
        label: "Açık görevler",
        icon: LuSquareCheck,
        value: 5,
        detail: "2 devam ediyor · 3 yapılacak",
      },
    },
  },
  navbar: {
    workspace: "Çalışma Alanı",
    breadcrumbLabel: "Sayfa yolu",
    openSidebar: "Yan menüyü aç",
    closeSidebar: "Yan menüyü kapat",
    notifications: "Bildirimler",
  },
  search: {
    label: "Ara",
    placeholder: "Ara...",
    results: (count: number) => `${count} sonuç`,
  },
  profile: {
    label: (name: string) => `Profil: ${name}`,
    account: "Hesap",
    logout: "Çıkış yap",
  },
  language: {
    label: "Dil",
    tr: "Türkçe",
    en: "English",
  },
  common: {
    close: "Kapat",
  },
} satisfies SiteContent;
