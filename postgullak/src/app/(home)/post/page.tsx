"use client";

import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white">
      <h1 className="font-vedic text-8xl">PostGullak</h1>
      <div className="flex space-x-6 mt-10 justify-center">
        <Link href="/demomap" legacyBehavior>
          <a className="bg-black relative z-10 text-white py-2 px-4 rounded-md mx-2">ADMIN</a>
        </Link>
        <Link href="/sign_in" legacyBehavior>
          <a className="bg-black relative z-10 text-white py-2 px-4 rounded-md mx-2">USERS</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
