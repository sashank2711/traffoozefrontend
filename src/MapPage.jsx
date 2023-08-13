import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
} from '@react-google-maps/api';
import { Box, Flex } from '@chakra-ui/react';
import { FaCar, FaExclamationTriangle, FaCarCrash } from 'react-icons/fa';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const center = { lat: 1.3521, lng: 103.8198 };

function MapPage() {
  const [activeMarker, setActiveMarker] = useState(null);
  const [trafficJams, setTrafficJams] = useState([]);
  const [roadClosures, setRoadClosures] = useState([]);
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        // Fetch data for traffic jams
        const trafficJamsResponse = await fetch(
          'https://traffooze-flask.onrender.com/trafficjam'
        );
        const trafficJamsData = await trafficJamsResponse.json();
        setTrafficJams(trafficJamsData);

        // Fetch data for road closures
        const roadClosuresResponse = await fetch(
          'https://traffooze-flask.onrender.com/roadclosure'
        );
        const roadClosuresData = await roadClosuresResponse.json();
        setRoadClosures(roadClosuresData);

        // Fetch data for accidents
        const accidentsResponse = await fetch(
          'https://traffooze-flask.onrender.com/accidents'
        );
        const accidentsData = await accidentsResponse.json();
        setAccidents(accidentsData);
      } catch (error) {
        // Handle errors if the API requests fail
        console.error('Error fetching data:', error);
      }
    };

    fetchTrafficData();
  }, []);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            center={center}
            zoom={12}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              styles: [
                {
                  featureType: 'poi',
                  elementType: 'labels.icon',
                  stylers: [{ visibility: 'off' }],
                },
              ],
            }}
          >
            {/* Render markers for traffic jams */}
            {trafficJams.map(({ date, time, message, location }, index) => {
              const [lat, lng] = location.split(',');
              const position = { lat: parseFloat(lat), lng: parseFloat(lng) };
              const markerIndex = index;

              return (
                <Marker
                  key={`trafficJam-${markerIndex}`}
                  icon={{
                    path: FaCar().props.children[0].props.d,
                    fillColor: '#ff9900',
                    fillOpacity: 1,
                    strokeWeight: 1,
                    strokeColor: '#ffffff',
                    scale: 0.075,
                  }}
                  position={position}
                  onClick={() => handleActiveMarker(markerIndex)}
                >
                  {activeMarker === markerIndex ? (
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                      <div>
                        <div>Date: {date}</div>
                        <div>Time: {time}</div>
                        <div>{message}</div>
                      </div>
                    </InfoWindow>
                  ) : null}
                </Marker>
              );
            })}

            {/* Render markers for road closures */}
            {roadClosures.map(({ date, time, message, location }, index) => {
              const [lat, lng] = location.split(',');
              const position = { lat: parseFloat(lat), lng: parseFloat(lng) };
              const markerIndex = index + trafficJams.length;

              return (
                <Marker
                  key={`roadClosure-${markerIndex}`}
                  icon={{
                    path: FaExclamationTriangle().props.children[0].props.d,
                    fillColor: '#ffd700',
                    fillOpacity: 1,
                    strokeWeight: 1,
                    strokeColor: '#ffffff',
                    scale: 0.075,
                  }}
                  position={position}
                  onClick={() => handleActiveMarker(markerIndex)}
                >
                  {activeMarker === markerIndex ? (
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                      <div>
                        <div>Date: {date}</div>
                        <div>Time: {time}</div>
                        <div>{message}</div>
                      </div>
                    </InfoWindow>
                  ) : null}
                </Marker>
              );
            })}

            {/* Render markers for accidents */}
            {accidents.map(({ date, time, message, location }, index) => {
              const [lat, lng] = location.split(',');
              const position = { lat: parseFloat(lat), lng: parseFloat(lng) };
              const markerIndex =
                index + trafficJams.length + roadClosures.length;

              return (
                <Marker
                  key={`accident-${markerIndex}`}
                  icon={{
                    path: FaCarCrash().props.children[0].props.d,
                    fillColor: '#ff0000',
                    fillOpacity: 1,
                    strokeWeight: 1,
                    strokeColor: '#ffffff',
                    scale: 0.075,
                  }}
                  position={position}
                  onClick={() => handleActiveMarker(markerIndex)}
                >
                  {activeMarker === markerIndex ? (
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                      <div>
                        <div>Date: {date}</div>
                        <div>Time: {time}</div>
                        <div>{message}</div>
                      </div>
                    </InfoWindow>
                  ) : null}
                </Marker>
              );
            })}
          </GoogleMap>
        </LoadScript>
      </Box>
    </Flex>
  );
}

export default MapPage;
