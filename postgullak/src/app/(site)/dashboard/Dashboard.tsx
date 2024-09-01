"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions, Title } from 'chart.js';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface DemographyData {
    men: number;
    women: number;
}

const Dashboard: React.FC = () => {
    const [scope,setScope] = useState<DemographyData | null>(null);
    const [state, setState] = useState<string>('UTTAR PRADESH');
    const [stateData, setStateData] = useState<DemographyData | null>(null);

    useEffect(() => {
        if (state) {
            axios.get<DemographyData>(`https://postgullak-backend.onrender.com/demography/getDemography?scope=state&state=${encodeURIComponent(state)}`)
                .then(response => {
                    console.log('State Data:', response.data); // Check if data is correct
                    setStateData(response.data);
                })
                .catch(error => console.error('Error fetching state data:', error));
        }
    }, [state]);

    // Static data for Uttar Pradesh
    const staticData: DemographyData = {
        men: 100000000, // Example data
        women: 90000000, // Example data
    };

    const stateChartData: ChartData<'pie'> = {
        labels: ['Men', 'Women'],
        datasets: [
            {
                data: [staticData.men, staticData.women], // Use static data
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)', // Color for Men
                    'rgba(255, 99, 132, 0.6)', // Color for Women
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)', // Border color for Men
                    'rgba(255, 99, 132, 1)', // Border color for Women
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const total = tooltipItem.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                        const value = tooltipItem.raw as number;
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${tooltipItem.label}: ${percentage}%`;
                    },
                },
            },
            datalabels: {
                display: true,
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                    const percentage = (value / total * 100).toFixed(2);
                    return `${percentage}%`;
                },
                color: '#fff',
                font: {
                    weight: 'bold',
                },
            },
        },
    };

    return (
        <div className="dashboard text-black">
            <div className="input-container">
                <label htmlFor="stateInput">Enter State Name:</label>
                <input
                    type="text"
                    id="stateInput"
                    value={state}
                    onChange={e => setState(e.target.value.toUpperCase())}
                    placeholder="Enter State Name"
                />
            </div>
            <div className="chart-container">
                <h3>Population Data for {state}</h3>
                <div className="chart-wrapper">
                    <Pie data={stateChartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
