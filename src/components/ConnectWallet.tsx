import React, { useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';

const ConnectWallet: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        // Fetch balance from backend
        const response = await axios.get(`http://localhost:5000/balance/${accounts[0]}`);
        setBalance(response.data.balance);
      } catch (error) {
        setError("User rejected the request or an error occurred.");
        console.error(error);
      }
    } else {
      setError('Please install MetaMask!');
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {account && <p>Connected Account: {account}</p>}
      {balance && <p>Balance: {balance} ETH</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ConnectWallet;
