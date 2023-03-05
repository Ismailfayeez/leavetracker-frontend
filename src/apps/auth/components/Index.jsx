import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login/Index";
import Logout from "./logout/Index";
import NavBar from "../../../ui-kit/nav-bar/NavBar";
import SignUp from "./sign-up/SignUp";
import "./auth.scss";
function Index(props) {
  return (
    <div className="auth">
      <NavBar />
      <main className="auth__main">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  );
}

export default Index;
