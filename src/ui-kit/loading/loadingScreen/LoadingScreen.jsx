import React, { useEffect, useState } from 'react';
import './loadingScreen.scss';

function LoadingScreen() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="loading-screen flex flex--center flex--column">
      <div className="loading-spinner-container">
        <span className="loader" />
      </div>
      {seconds > 8 && <p style={{ textAlign: 'center' }}>Loading takes more than usual!</p>}
    </div>
  );
}

export default LoadingScreen;
