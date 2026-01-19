import Navbar from "../components/Navbar";
import Onboarding from "../components/Onboarding";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page-card">
      <Navbar variant="landing" />
      <Onboarding />
    </div>
  );
}

export default LandingPage;
