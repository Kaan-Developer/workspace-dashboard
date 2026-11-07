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


      <Navbar sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen((open) => !open)} />
    </div>
  )
}

export default StartPage;
