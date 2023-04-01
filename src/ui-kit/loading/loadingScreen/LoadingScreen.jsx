import React from 'react';
import './loadingScreen.scss';

function LoadingScreen() {
  return (
    <div className="loading-screen flex flex--center">
      <div className="loading-spinner-container">
        <span className="loader" />
      </div>
    </div>
  );
}

export default LoadingScreen;
