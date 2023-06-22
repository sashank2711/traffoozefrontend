import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './LoginPage/LoginPage';
import Dashboard from './Dashboard/Dashboard';
function App() 
{
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
