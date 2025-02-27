import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './Profile.css';

function Profile() {
  const [account, setAccount] = useState(null);
  const [profile, setProfile] = useState({
    picture: '',
    name: '',
    surname: '',
    email: '',
    age: '',
    medicalHistory: '',
    allergies: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const connectMetaMask = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
          // Load profile information from blockchain or storage here
        } catch (error) {
          setErrorMessage('User rejected the request.');
        }
      } else {
        setErrorMessage('MetaMask is not installed. Please install it to use this feature.');
      }
    };
    connectMetaMask();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile information to blockchain or storage here
    console.log('Profile submitted:', profile);
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {!account ? (
        <button className="get-started-button" onClick={() => window.location.reload()}>
          Connect to MetaMask
        </button>
      ) : (
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-card">
            <img
              src={profile.picture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="profile-picture"
            />
            <label>
              Picture URL:
              <input
                type="text"
                name="picture"
                value={profile.picture}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Surname:
              <input
                type="text"
                name="surname"
                value={profile.surname}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Medical History:
              <textarea
                name="medicalHistory"
                value={profile.medicalHistory}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Allergies:
              <textarea
                name="allergies"
                value={profile.allergies}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Save Profile</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Profile;
