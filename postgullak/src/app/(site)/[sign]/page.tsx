// src/app/(site)/sign/page.tsx

'use client'; // This line marks the component as a client component

import React, { useState } from 'react';

const SignPage: React.FC = () => {
  const [aadhaarName, setAadhaarName] = useState('');
  const [otp, setOtp] = useState<string | null>(null);

  const handleGenerateOtp = () => {
    if (aadhaarName) {
      // Simulate OTP generation
      setOtp('123456');
    } else {
      alert('Please enter your Aadhaar name.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Aadhaar Authentication</h1>
        <input
          type="text"
          placeholder="Enter Aadhaar Name"
          value={aadhaarName}
          onChange={(e) => setAadhaarName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleGenerateOtp}
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Generate OTP
        </button>
        {otp && (
          <div className="mt-4 p-2 bg-green-100 text-green-800 rounded border border-green-300">
            <strong>OTP: </strong>{otp}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignPage;
