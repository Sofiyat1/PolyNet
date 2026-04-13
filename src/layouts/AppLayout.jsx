import Navbar from "../components/Navbar";
import SubNavbar from "../components/SubNavbar";
import { Outlet } from "react-router-dom";
import "./AppLayout.css";

function AppLayout() {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="layout-body">
        <Outlet />
      </main>

      <SubNavbar />
    </div>
  );
}

export default AppLayout;