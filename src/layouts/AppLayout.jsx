import Navbar from "../components/Navbar";
import SubNavbar from "../components/SubNavbar";
import { Outlet } from "react-router-dom";
import "./AppLayout.css";

import { useRef } from "react";

function AppLayout() {
  const scrollRef = useRef(null);

  return (
    <div className="app-layout">
      <Navbar scrollRef={scrollRef} />

      <main ref={scrollRef} className="layout-body">
        <Outlet />
      </main>

      <SubNavbar />
    </div>
  );
}

export default AppLayout;
