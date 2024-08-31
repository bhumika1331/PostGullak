'use client';

import { GoogleMap, Libraries, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useRef, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const indiaBounds = {
  north: 37.0902,   // Northernmost point (Kashmir)
  south: 6.754,     // Southernmost point (Kanyakumari)
  west: 68.1114,    // Westernmost point (Gujarat)
  east: 97.3956,    // Easternmost point (Arunachal Pradesh)
};

const centerOfIndia = {
  lat: 21.0000,
  lng: 78.0000,
};

// Correctly typed libraries array
const libraries: Libraries = ['places'];

const markersData = [
  {
    id: 1,
    position: { lat: 28.6139, lng: 77.2090 }, // New Delhi
    iconUrl: '/custom-icon-1.png',
    title: 'New Delhi',
    details: 'Capital of India',
  },
  {
    id: 2,
    position: { lat: 19.0760, lng: 72.8777 }, // Mumbai
    iconUrl: '/custom-icon-2.png',
    title: 'Mumbai',
    details: 'Financial capital of India',
  },
  // Add more markers as needed
];

const Map: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,  // Corrected type
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(5); // Initial zoom level
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search term state

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({ lat: indiaBounds.north, lng: indiaBounds.east });
    bounds.extend({ lat: indiaBounds.south, lng: indiaBounds.west });
    map.fitBounds(bounds);
  }, []);

  const onMarkerClick = (details: string) => {
    alert(details); // Replace this with a custom modal or info window if needed
  };

  const handleZoomChanged = () => {
    if (mapRef.current) {
      setZoomLevel(mapRef.current.getZoom() || 5);
    }
  };

  const filteredMarkers = markersData.filter(marker =>
    marker.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md px-4">
        {/* Custom Search Box */}
        <input
          type="text"
          placeholder="Search for the demography of a location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-12 px-4 text-base text-gray-700 rounded-full shadow-md focus:outline-none"
        />
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerOfIndia}
        zoom={zoomLevel}
        onLoad={onLoad}
        onZoomChanged={handleZoomChanged}
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
          gestureHandling: 'cooperative',
        }}
      >
        {zoomLevel >= 6 && // Only show markers if zoom level is 7 or higher
          filteredMarkers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={{
                url: marker.iconUrl,
                scaledSize: new google.maps.Size(50, 50), // Adjust size as needed
              }}
              title={marker.title}
              onClick={() => onMarkerClick(marker.details)}
            />
          ))}
      </GoogleMap>
    </div>
  );
};

export default React.memo(Map);
