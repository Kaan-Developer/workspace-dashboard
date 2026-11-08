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
  projects: {
    title: "Projeler",
    description: "Projelerini yönet ve değişiklikleri takip et.",
    demoData: "Örnek veriler",
    addProject: "Proje ekle",
    searchPlaceholder: "Proje ara...",
    statusFilter: "Tüm durumlar",
    sortBy: "Son güncellenen",
    columns: {
      project: "Proje",
      status: "Durum",
      lastCommit: "Son commit",
      openTasks: "Açık görevler",
    },
    statuses: {
      inProgress: "Devam ediyor",
      completed: "Tamamlandı",
      paused: "Duraklatıldı",
    },
    actions: {
      repository: "GitHub deposunu aç",
      more: "Diğer işlemler",
    },
    items: [
      {
        id: "workspace-dashboard",
        name: "workspace-dashboard",
        description: "Projeler ve kodlama için kişisel çalışma alanı.",
        status: "inProgress",
        lastCommit: { time: "24 dk önce", message: "feat: add GitHub activity overview" },
        openTasks: 3,
      },
      {
        id: "portfolio",
        name: "portfolio",
        description: "Kişisel web sitem ve seçtiğim çalışmalar.",
        status: "completed",
        lastCommit: { time: "2 saat önce", message: "fix: improve mobile navigation" },
        openTasks: 0,
      },
      {
        id: "ui-components",
        name: "ui-components",
        description: "React projeleri için tekrar kullanılabilir bileşenler.",
        status: "inProgress",
        lastCommit: { time: "Dün", message: "refactor: simplify button variants" },
        openTasks: 2,
      },
      {
        id: "weather-app",
        name: "weather-app",
        description: "Şehir araması içeren basit bir hava durumu uygulaması.",
        status: "paused",
        lastCommit: { time: "3 gün önce", message: "fix: handle empty search" },
        openTasks: 2,
      },
    ],
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
