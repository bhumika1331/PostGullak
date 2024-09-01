"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignInPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [aadharNumber, setAadharNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleAadharSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (aadharNumber.trim().length !== 12) {
      setMessage('Invalid Aadhaar number. Please enter a 12-digit number.');
      return;
    }

    // Simulate verifying the Aadhaar number and sending an OTP
    setTimeout(() => {
      setStep(2);
      setMessage('');
    }, 2000);
  };

  const handleOtpSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (otp.trim().length !== 6) {
      setMessage('Invalid OTP. Please enter a 6-digit OTP.');
      return;
    }

    // Simulate verifying the OTP and logging in the user
    setTimeout(() => {
      setMessage('Login successful!');
      router.push('/post'); // Redirect to /home after successful OTP verification
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      {step === 1 && (
        <div className="bg-white p-8 rounded-lg shadow-lg w-80">
          <h2 className="text-2xl font-semibold mb-6 text-center">Aadhar Authentication</h2>
          <form onSubmit={handleAadharSubmit} id="aadhaar-form">
            <label htmlFor="aadhaar-number" className="block text-left font-bold mb-2">
              Aadhar Number:
            </label>
            <input
              type="text"
              id="aadhaar-number"
              value={aadharNumber}
              onChange={(e) => setAadharNumber(e.target.value)}
              maxLength={12}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <button
              type="submit"
              id="submit-aadhaar"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Request OTP
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white p-8 rounded-lg shadow-lg w-80">
          <h2 className="text-2xl font-semibold mb-6 text-center">OTP Verification</h2>
          <form onSubmit={handleOtpSubmit} id="otp-form">
            <label htmlFor="otp" className="block text-left font-bold mb-2">
              OTP:
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <button
              type="submit"
              id="submit-otp"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Verify OTP
            </button>
          </form>
        </div>
      )}

      {message && (
        <div className="absolute top-4 text-center text-green-500 font-semibold">
          {message}
        </div>
      )}
    </div>
  );
};

export default SignInPage;
