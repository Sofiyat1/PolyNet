import Navbar from "../components/Navbar";
import SubNavbar from "../components/SubNavbar";
import { Outlet } from "react-router-dom";
import "./AppLayout.css";

import { useRef, useState, useEffect } from "react";

function AppLayout() {
  const scrollRef = useRef(null);

  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const el = document.querySelector(".layout-body");

    if (!el) return;

    const handleScroll = () => {
      const current = el.scrollTop;

      if (current > lastScrollY.current + 5) {
        setShowNav(false); // scrolling down
      } else if (current < lastScrollY.current) {
        setShowNav(true); // scrolling up
      }

      lastScrollY.current = current;
    };

    el.addEventListener("scroll", handleScroll);

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app-layout">
      <Navbar scrollRef={scrollRef} />
      <main ref={scrollRef} className="layout-body">
        <Outlet />
      </main>
      <SubNavbar visible={showNav} />{" "}
    </div>
  );
}

export default AppLayout;
