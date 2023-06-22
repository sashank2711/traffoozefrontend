import React from 'react';
import './AdminPortal.css';
import NavigationBar from '../components/NavigationBar';
import Dashboard from './Dashboard';


function AdminPortal() {
  return (
    <div className="admin-portal">
      <NavigationBar />
      <div className="admin-content">
        <header className="admin-header">
          <h1>Admin Portal</h1>
        </header>
        <Dashboard />
      </div>
    </div>
  );
}

export default AdminPortal;
