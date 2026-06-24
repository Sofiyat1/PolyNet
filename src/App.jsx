import { Routes, Route } from "react-router-dom";
import { supabase } from "./lib/supabase";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/Homepage";
import ConnectionPage from "./pages/ConnectionPage";
import Settings from "./pages/Settings";
import Notification from "./pages/Notification";
import ProfilePage from "./pages/ProfilePage";

import AppLayout from "./layouts/AppLayout";
import "./App.css";

import Login from "./pages/Login";
import AddPostPage from "./pages/AddPostPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutPage from "./pages/AboutPage";
import IdentityGuidePage from "./pages/IdentityGuidePage";

import Wrapper from "./pages/context/Wrapper";

import SignUp from "./pages/Signup";
import Gender from "./pages/Gender";
import Name from "./pages/Name";
import Birthday from "./pages/Birthday";
import MobileNumber from "./pages/MobileNumber";
import Password from "./pages/Password";

function App() {
  console.log(supabase);
  return (
    
    <Wrapper>
      <Routes>

        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Signup flow */}
        <Route path="/signup">
          <Route index element={<Name />} />
          <Route path="gender" element={<Gender />} />
          <Route path="birthday" element={<Birthday />} />
          <Route path="password" element={<Password />} />
          <Route path="mobilenumber" element={<MobileNumber />} />
        </Route>

        {/* Static pages */}
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/identityguide" element={<IdentityGuidePage />} />

        {/* App layout routes */}
        <Route element={<AppLayout />}>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/connectionpage" element={<ConnectionPage />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/addpostpage" element={<AddPostPage />} />
        </Route>

      </Routes>
    </Wrapper>
  );
}

export default App;
