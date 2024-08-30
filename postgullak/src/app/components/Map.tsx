'use client';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useRef } from 'react';

const containerStyle = {
  width: '80%',
  height: '500px', // Reduced height for better fit
};

// Adjusted bounds to cover India properly
const indiaBounds = {
  north: 37.0902,   // Northernmost point (Kashmir)
  south: 6.754,     // Southernmost point (Kanyakumari)
  west: 68.1114,    // Westernmost point (Gujarat)
  east: 97.3956,    // Easternmost point (Arunachal Pradesh)
};

// Center of India (approximately)
const centerOfIndia = {
  lat: 21.0000,
  lng: 78.0000,
};

const Map: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, // Your API key here
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({ lat: indiaBounds.north, lng: indiaBounds.east });
    bounds.extend({ lat: indiaBounds.south, lng: indiaBounds.west });
    map.fitBounds(bounds);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={centerOfIndia}
      zoom={0}
      onLoad={onLoad}
      options={{
        restriction: {
          latLngBounds: indiaBounds,
          strictBounds: true,
        },
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        disableDefaultUI: true,
        gestureHandling: "cooperative",
      }}
    >
      {/* Add markers and other components here */}
    </GoogleMap>
  );
};

export default React.memo(Map);
