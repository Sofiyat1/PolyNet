import Navbar from "../components/Navbar";
import SubNavbar from "../components/SubNavbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <Navbar />
      <SubNavbar />
      <Outlet />
    </>
  );
}

export default AppLayout;
