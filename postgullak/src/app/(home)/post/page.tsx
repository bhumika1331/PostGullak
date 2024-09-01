"use client";

import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white">
      <h1 className="font-vedic text-8xl">PostGullak</h1>
      <div className="flex space-x-6 mt-8">
        <Link href="/demomap" legacyBehavior>
          <a className="bg-black relative z-10 text-white py-2 px-4 rounded-md mx-2">Demography</a>
        </Link>
        <button
          className="bg-black relative z-10 text-white py-2 px-4 rounded-md mx-2"
          onClick={() => alert("Button clicked!")}
        >
          View Schemes
        </button>
      </div>
    </div>
  );
};

export default Home;
