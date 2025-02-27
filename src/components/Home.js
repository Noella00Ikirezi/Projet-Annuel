import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './Home.css';
import Button from './Button';
import Loading from './Loading';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsLoading(true);
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 3000); // 3 seconds delay
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <img src={logo} className="home-logo" alt="logo" />
        <h1>Decentralized Identity Application To Store Sensible Patient Medical Data</h1>
        <Button onClick={handleButtonClick} />
        {isLoading && <Loading />}
      </header>
    </div>
  );
}

export default Home;
