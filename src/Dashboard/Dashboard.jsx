import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import './Dashboard.css';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [trafficData, setTrafficData] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchTrafficData = async () => {
      if (selectedCategory) {
        try {
          let url;
          switch (selectedCategory) {
            case 'TrafficJams':
              url = 'https://traffooze-flask.onrender.com/trafficjam';
              break;
            case 'RoadAccidents':
              url = 'https://traffooze-flask.onrender.com/roadaccident';
              break;
            case 'RoadClosures':
              url = 'https://traffooze-flask.onrender.com/roadclosure';
              break;
            case 'TrafficForecast':
              // You can handle the TrafficForecast API here if needed
              break;
            default:
              setTrafficData([]);
              return;
          }

          const response = await fetch(url);
          if (!response.ok) {
            // Handle the case when the API request fails
            setTrafficData([]);
            return;
          }

          const data = await response.json();
          setTrafficData(data);
        } catch (error) {
          // Handle any errors that occur during the API request
          setTrafficData([]);
        }
      } else {
        setTrafficData([]);
      }
    };

    fetchTrafficData();
  }, [selectedCategory]);

  const renderTrafficData = () => {
    if (trafficData && trafficData.length > 0) {
      return (
        <table className="traffic-table">
          <thead>
            <tr>
              <th>Date</th>  
              <th>Time</th>
              <th>Message</th>
              <th>Location</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {trafficData.map((data) => (
              <tr key={data.id}>
                <td>{data.date}</td>
                <td>{data.time}</td>
                <td>{data.message}</td>
                <td>
                </td>
                <td>{data.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return <div>No data available</div>;
    }
  };

  const renderCategoryPage = () => {
    if (selectedCategory === 'TrafficForecast') {
      return (
        <div className="category-page">
          <h2 className="category-title">{selectedCategory}</h2>
          <div>
           
          </div>
          {renderTrafficData()}
        </div>
      );
    } else {
      return (
        <div className="category-page">
          <h2 className="category-title">{selectedCategory}</h2>
          {renderTrafficData()}
        </div>
      );
    }
  };

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Traffooze Dashboard</h1>
      </div>
      <Container maxWidth="lg" className="dashboard-container">
        {/* Use Sidebar instead of NavigationBar */}
        <Sidebar onSelectCategory={handleCategoryClick} />

        <div className="content">{selectedCategory && renderCategoryPage()}</div>
      </Container>
    </div>
  );
}

export default Dashboard;
