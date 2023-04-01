import React from 'react';
import { Link } from 'react-router-dom';

function Logout() {
  return (
    <div>
      You have been logged out successfully.click &nbsp;
      <Link to="/auth/login">here</Link> to redirect to login page
    </div>
  );
}

export default Logout;
