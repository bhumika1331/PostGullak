'use client';
import React, { useState } from 'react';

const LoanRecommendation: React.FC = () => {
const [monthlyIncome, setMonthlyIncome] = useState('');
const [cibilScore, setCibilScore] = useState('');

const handlePredictLoan = () => {
// Implement the loan prediction logic here
console.log('Monthly Income:', monthlyIncome);
console.log('Cibil Score:', cibilScore);
};

return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    {/* <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"> */}
    <h1 className="text-2xl font-bold mb-6 text-center">
        Personalized Loan Recommendation
    </h1>
    <p className="text-center mb-4 text-gray-600">
        Get Personalized Loan Recommendation For Your Credit Needs.
    </p>
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
        Monthly Income
        </label>
        <input
        type="text"
        placeholder="Enter Your Monthly Income Here"
        value={monthlyIncome}
        onChange={(e) => setMonthlyIncome(e.target.value)}
        className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
        />
    </div>
    <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
        Cibil Score
        </label>
        <input
        type="text"
        placeholder="Enter Your Cibil Score Here"
        value={cibilScore}
        onChange={(e) => setCibilScore(e.target.value)}
        className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
        />
    </div>
    <button
        onClick={handlePredictLoan}
        className="w-44 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
    >
        Predict Loan Type
    </button>
    {/* </div> */}

    <div className="mt-10 flex space-x-8 text-gray-700 bg-gray-500" >
    <div className="text-center">
        <h2 className="text-2xl font-bold">50+</h2>
        <p>Trusted banks and their Loan Options</p>
    </div>
    <div className="text-center">
        <h2 className="text-2xl font-bold">100K</h2>
        <p>Active users with personalized loan recommendations</p>
    </div>
    <div className="text-center">
        <h2 className="text-2xl font-bold">0%</h2>
        <p>Risk with assured interest rates on Loans</p>
    </div>
    <div className="text-center">
        <h2 className="text-2xl font-bold">4.3</h2>
        <p>Average rating by our users</p>
    </div>
    </div>
</div>
);
};

export default LoanRecommendation;
