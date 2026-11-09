import Search from "../ui/Search";
import { LuBell, LuPanelLeft } from "react-icons/lu";
import { Button } from "../ui/button";
import { useLocation } from "react-router"
import { enSite } from "@/data/enSite";

type NavbarProps = {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
};

const pageTitles: Record<string, string> = {
  "/": enSite.navigation.items.overview,
  "/projects": enSite.navigation.items.projects,
  "/settings": enSite.navigation.items.settings,
}

const Navbar = ({ sidebarOpen, onToggleSidebar }: NavbarProps) => {

    const { pathname } = useLocation()
    const currentPage = pageTitles[pathname] ?? pathname


  return (
    <nav className="border-b border-border flex items-center justify-between py-6 px-4">
      <div className="flex items-center gap-2">
        <Button type="button" variant="ghost" size="icon" onClick={onToggleSidebar} aria-label={sidebarOpen ? enSite.navbar.closeSidebar : enSite.navbar.openSidebar} aria-expanded={sidebarOpen} aria-controls="workspace-sidebar"
        >
            <LuPanelLeft aria-hidden="true" />
        </Button>

        <ol className="hidden lg:flex items-center gap-3 text-sm">
            <li className="text-muted-foreground">
                {enSite.navbar.workspace}
            </li>

            <li aria-hidden="true" className="text-muted-foreground">
                /
            </li>

            <li aria-current="page" className="font-medium text-foreground">{currentPage}</li>
        </ol>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex">
        <Search title={enSite.search.placeholder} />

        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={enSite.navbar.notifications}
          className="rounded-full text-muted-foreground hover:text-foreground"
        >
          <LuBell aria-hidden="true" className="size-4" />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          aria-label={enSite.profile.label("Kaan Hamitler")}
          className="rounded-full text-xs font-medium"
        >
          KH
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
