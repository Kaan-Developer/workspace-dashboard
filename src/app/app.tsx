import { Route, Routes } from "react-router";
import StartPage from "../pages/StartPage";
import Overview from "@/pages/Overview";
import Projects from "@/pages/Projects";
import Activity from "@/pages/Activicy";
import Repositories from "@/pages/Repositories";
import Settings from "@/components/ui/Settings";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />}>
        <Route index element={<Overview />} />
        <Route path="projects" element={<Projects />} />
      <Route path="activity" element={<Activity />} />
      <Route path="repositories" element={<Repositories />} />
      <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};
