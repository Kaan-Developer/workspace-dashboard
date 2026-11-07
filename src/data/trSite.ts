import type { SiteContent } from "./enSite";

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
      activeProjects: {
        label: "Aktif projeler",
        detail: (count: number) => `${count} proje sonraki adımın için hazır`,
      },
      tasksCompleted: {
        label: "Tamamlanan görevler",
        detail: (count: number) => `Geçen haftaya göre ${count} fazla`,
      },
      goalsInProgress: {
        label: "Devam eden hedefler",
        detail: (count: number) => `${count} kilometre taşı yaklaşıyor`,
      },
      connectedServices: {
        label: "Bağlı hizmetler",
        detail: "Tüm bağlantılar sorunsuz",
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
