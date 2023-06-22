import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import './Dashboard.css';
import NavigationBar from '../components/NavigationBar';
import { Dummydata } from '../Dummydata';

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');
  const [trafficData, setTrafficData] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchTrafficData = () => {
      // Fetch the data based on the selected category
      switch (selectedCategory) {
        case 'TrafficJams':
          setTrafficData(Dummydata.TrafficJams);
          break;
        case 'RoadAccidents':
          setTrafficData(Dummydata.RoadAccidents);
          break;
        case 'RoadClosures':
          setTrafficData(Dummydata.RoadClosures);
          break;
        case 'TrafficForecast':
          setTrafficData(Dummydata.TrafficForecast);
          break;
        default:
          setTrafficData([]);
      }
    };

    if (selectedCategory) {
      fetchTrafficData();
    }
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
                  {data.location.latitude}, {data.location.longitude}
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
            <input
              type="text"
              value={location1}
              onChange={(e) => setLocation1(e.target.value)}
              placeholder="Location 1"
            />
            <input
              type="text"
              value={location2}
              onChange={(e) => setLocation2(e.target.value)}
              placeholder="Location 2"
            />
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
        <NavigationBar onSelectCategory={handleCategoryClick} />

        <div className="content">{selectedCategory && renderCategoryPage()}</div>
      </Container>
    </div>
  );
}

export default Dashboard;
