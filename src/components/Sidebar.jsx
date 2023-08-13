import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
const Sidebar = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('TrafficJams');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const handleMouseEnter = () => {
    setIsSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSidebarOpen(false);
  };

  const handleLoginButtonClick = () => {
    setShowLoginForm(true);
  };

  const handleRegisterButtonClick = () => {
    setShowRegisterForm(true);
  };

  const handleLoginClose = () => {
    setShowLoginForm(false);
  };

  const handleRegisterClose = () => {
    setShowRegisterForm(false);
  };

  return (
    <div
      className={`sidebar${isSidebarOpen ? ' open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
      <button onClick={handleLoginButtonClick}>Login</button>
      <button onClick={handleRegisterButtonClick}>Register</button>
      

      {showLoginForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Login</h3>
            <form>
              <label htmlFor="login-username">Username</label>
              <input type="text" id="login-username" />

              <label htmlFor="login-password">Password</label>
              <input type="password" id="login-password" />

              <div className="popup-buttons">
                <button>Login</button>
                <button onClick={handleLoginClose}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showRegisterForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Register</h3>
            <form>
              <label htmlFor="register-name">Name</label>
              <input type="text" id="register-name" />

              <label htmlFor="register-email">Email</label>
              <input type="email" id="register-email" />

              <label htmlFor="register-username">Username</label>
              <input type="text" id="register-username" />

              <label htmlFor="register-password">Password</label>
              <input type="password" id="register-password" />

              <div className="popup-buttons">
                <button>Register</button>
                <button onClick={handleRegisterClose}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
