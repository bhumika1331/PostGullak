import React from 'react';

import Map from '@/components/Map';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Demographics Map</h1>
      <Map />
    </div>
  );
};

export default Home;
