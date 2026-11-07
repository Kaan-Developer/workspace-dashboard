import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { useState } from "react";

import { Outlet } from "react-router";

const StartPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`grid h-dvh bg-background text-foreground
    ${sidebarOpen
      ? "grid-cols-[220px_minmax(0,1fr)]"
      : "grid-cols-[minmax(0,1fr)]"
    }`}>
      {sidebarOpen && <Sidebar />}

      <div className="flex min-h-0 min-w-0 flex-col">
              <Navbar sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen((open) => !open)} />

            <main className="min-h-0 flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
      </div>

    </div>
  )
}

export default StartPage;
