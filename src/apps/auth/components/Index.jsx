import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './login/Index';
import Logout from './logout/Index';
import SignUp from './sign-up/SignUp';
import './auth.scss';

function Index() {
  return (
    <div className="auth">
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
