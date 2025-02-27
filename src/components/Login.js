import React, { useState, useContext } from 'react';
import Web3 from 'web3';
import './Login.css';
import { AccountContext } from '../contexts/AccountContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { account, setAccount } = useContext(AccountContext); // <-- Use account from context
  const [errorMessage, setErrorMessage] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const navigate = useNavigate();

  const connectMetaMask = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        setErrorMessage(null);
        setShowRegistration(false);
        navigate('/profile'); // <-- Redirect to profile page after login
      } catch (error) {
        setErrorMessage('User rejected the request.');
        setShowRegistration(true);
      }
    } else {
      setErrorMessage('MetaMask is not installed. Please install it to use this feature.');
      setShowRegistration(true);
    }
  };

  return (
    <div className="login-container">
      <h2>Login with MetaMask</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {!account ? (
        <button className="get-started-button" onClick={connectMetaMask}>
          Connect to MetaMask
        </button>
      ) : (
        <p>Logged in as: {account}</p>
      )}
      {showRegistration && (
        <form className="registration-form">
          <h3>Register</h3>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
}

export default Login;
