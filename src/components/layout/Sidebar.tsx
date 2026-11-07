import { Link } from "react-router";
import { NavLink } from "react-router";
import { Navigation } from "../../data/navigation";
import SidebarProfile from "./SidebarProfile";
import W from "../../assets/images/Minimalist mavi W sembolü-1.png";

const Sidebar = () => {
  return (
    <aside
      id="workspace-sidebar"
      className="flex flex-col gap-4 overflow-y-auto border-r border-border py-6 px-4 bg-sidebar text-sidebar-foreground"
    >
      <div className="border-b border-border flex items-center pb-2 gap-1">
        <img src={W} alt="" className="h-10 w-10" />
        <h1 className="text-xl capitalize">
          {Navigation[0].title.toLowerCase()}
        </h1>
      </div>

      <nav className="flex flex-col gap-2">
        {Navigation.map((nav) => (
          <div key={nav.id}>
            <span className="text-xs text-muted-foreground">{nav.title}</span>

            {nav.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;

              return (
                <NavLink
                  key={item.id}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 p-2 text-sm
    ${
      isActive
        ? "bg-sidebar-accent text-sidebar-accent-foreground"
        : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    }`
                  }
                >
                  <Icon size={18} />
                  <span>{item.title}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="mt-auto border-t border-sidebar-border pt-3">
        <SidebarProfile name="Kaan Hamitler" email="kaan@example.com" />
      </div>
    </aside>
  );
};

export default Sidebar;
