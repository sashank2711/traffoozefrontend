import React, { useState } from 'react';
import './NavigationBar.css';

const NavigationBar = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('TrafficJams');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const handleLogin = () => {
    // Perform login logic here (e.g., authenticate user)
    if (loginUsername === 'example' && loginPassword === 'password') {
      setLoggedInUser(loginUsername);
      setLoginUsername('');
      setLoginPassword('');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const handleRegister = () => {
    // Perform registration logic here
    if (registerUsername !== '' && registerPassword !== '') {
      setLoggedInUser(registerUsername);
      setRegisterUsername('');
      setRegisterPassword('');
    }
  };

  return (
    <nav>
      <button
        className={selectedCategory === 'TrafficJams' ? 'active' : ''}
        onClick={() => handleCategorySelection('TrafficJams')}
      >
        Traffic Jams
      </button>
      <button
        className={selectedCategory === 'RoadAccidents' ? 'active' : ''}
        onClick={() => handleCategorySelection('RoadAccidents')}
      >
        Road Accidents
      </button>
      <button
        className={selectedCategory === 'RoadClosures' ? 'active' : ''}
        onClick={() => handleCategorySelection('RoadClosures')}
      >
        Road Closures
      </button>
      <button
        className={selectedCategory === 'TrafficForecast' ? 'active' : ''}
        onClick={() => handleCategorySelection('TrafficForecast')}
      >
        Traffic Forecast
      </button>
      {loggedInUser ? (
        <div className="user-info">
          Logged in as: {loggedInUser}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="login-register">
          <input
            type="text"
            placeholder="Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
