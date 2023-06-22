import React from 'react';
import './NavigationBar.css';

function NavigationBar() {
  return (
    <div className="navigation-bar">
      <ul>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="dropdown">
          <a href="/admin/user-accounts">User Accounts</a>
          <ul className="dropdown-menu">
            <li>
              <Link to="/admin/user-accounts/view">View Accounts</Link>
            </li>
            <li>
              <Link to="/admin/user-accounts/create">Create Accounts</Link>
            </li>
            <li>
              <Link to="/admin/user-accounts/update">Update Accounts</Link>
            </li>
            <li>
              <Link to="/admin/user-accounts/suspend">Suspend Account</Link>
            </li>
            <li>
              <Link to="/admin/user-accounts/search">Search Account</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/admin/traffic-jam">Traffic Jam Updates</Link>
        </li>
        <li>
          <Link to="/admin/road-closure">Road Closure Updates</Link>
        </li>
        <li>
          <Link to="/admin/road-accident">Road Accident Updates</Link>
        </li>
        <li>
          <Link to="/admin/traffic-forecast">Traffic Forecast Updates</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavigationBar;