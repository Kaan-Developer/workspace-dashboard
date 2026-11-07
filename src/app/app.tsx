import { Route, Routes } from "react-router";
import StartPage from "../pages/StartPage";
import Overview from "@/pages/Overview";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />}>
        <Route index element={<Overview />} />
        <Route path="projects" element={<div>Projects</div>} />
      </Route>
    </Routes>
  );
}
