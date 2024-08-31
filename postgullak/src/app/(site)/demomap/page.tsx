import Map from '@/components/Map';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4 mt-10">Demographics Map</h1>
      <Map />
    </div>
  );
};

export default Home;
