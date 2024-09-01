"use client";

import React, { useState } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, ChartData, ChartOptions, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale, PointElement, LineElement);

interface DemographyData {
    men: number;
    women: number;
}

interface LiteracyData {
    menLiteracy: number;
    womenLiteracy: number;
    totalLiteracy: number;
}

interface WorkingPopulationData {
    menWorking: number;
    womenWorking: number;
    totalWorking: number;
}

interface AgeGroupData {
    '0-14': number;
    '15-24': number;
    '25-54': number;
    '55-64': number;
    '65+': number;
}

const states = ['TAMIL NADU', 'UTTAR PRADESH', 'DELHI', 'KERALA', 'RAJASTHAN'];

const hardcodedData: { [key: string]: {
    demography: DemographyData,
    literacy: LiteracyData,
    workingPopulation: WorkingPopulationData,
    ageGroup: AgeGroupData
}} ={
    "TAMIL NADU": {
        "demography": {
            "men": 38610000,
            "women": 38560000
        },
        "literacy": {
            "menLiteracy": 29920000,
            "womenLiteracy": 27970000,
            "totalLiteracy": 57890000
        },
        "workingPopulation": {
            "menWorking": 20670000,
            "womenWorking": 15370000,
            "totalWorking": 36040000
        },
        "ageGroup": {
            "0-14": 16180000,
            "15-24": 9440000,
            "25-54": 36190000,
            "55-64": 8670000,
            "65+": 6690000
        }
    },
    "UTTAR PRADESH": {
        "demography": {
            "men": 122190000,
            "women": 116690000
        },
        "literacy": {
            "menLiteracy": 88870000,
            "womenLiteracy": 66890000,
            "totalLiteracy": 155760000
        },
        "workingPopulation": {
            "menWorking": 66690000,
            "womenWorking": 32680000,
            "totalWorking": 99370000
        },
        "ageGroup": {
            "0-14": 60210000,
            "15-24": 36890000,
            "25-54": 105090000,
            "55-64": 24090000,
            "65+": 12600000
        }
    },
    "DELHI": {
        "demography": {
            "men": 10840000,
            "women": 9660000
        },
        "literacy": {
            "menLiteracy": 8480000,
            "womenLiteracy": 7420000,
            "totalLiteracy": 15900000
        },
        "workingPopulation": {
            "menWorking": 5670000,
            "womenWorking": 3860000,
            "totalWorking": 9530000
        },
        "ageGroup": {
            "0-14": 4330000,
            "15-24": 2780000,
            "25-54": 9020000,
            "55-64": 2090000,
            "65+": 2280000
        }
    },
    "KERALA": {
        "demography": {
            "men": 17340000,
            "women": 18490000
        },
        "literacy": {
            "menLiteracy": 14280000,
            "womenLiteracy": 13360000,
            "totalLiteracy": 27640000
        },
        "workingPopulation": {
            "menWorking": 9870000,
            "womenWorking": 7090000,
            "totalWorking": 16960000
        },
        "ageGroup": {
            "0-14": 6970000,
            "15-24": 3930000,
            "25-54": 18020000,
            "55-64": 4640000,
            "65+": 2370000
        }
    },
    "RAJASTHAN": {
        "demography": {
            "men": 43310000,
            "women": 38880000
        },
        "literacy": {
            "menLiteracy": 38690000,
            "womenLiteracy": 32910000,
            "totalLiteracy": 71600000
        },
        "workingPopulation": {
            "menWorking": 23980000,
            "womenWorking": 16220000,
            "totalWorking": 40200000
        },
        "ageGroup": {
            "0-14": 19270000,
            "15-24": 14410000,
            "25-54": 37880000,
            "55-64": 8210000,
            "65+": 2420000
        }
    }
}

const Dashboard: React.FC = () => {
    const [selectedState, setSelectedState] = useState<string>(states[0]);

    const data = hardcodedData[selectedState];

    const chartData = (data: any, labels: string[], type: 'pie' | 'bar' | 'line'): ChartData<any> => {
        return {
            labels,
            datasets: [
                {
                    data: data ? Object.values(data) : [],
                    backgroundColor: type === 'pie'
                        ? ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)']
                        : ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 206, 86, 0.6)'],
                    borderColor: type === 'pie'
                        ? ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)']
                        : ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 206, 86, 1)'],
                    borderWidth: 1,
                    fill: type === 'line',
                    tension: type === 'line' ? 0.3 : undefined,
                },
            ],
        };
    };

    const stateChartData = chartData(data.demography, ['Men', 'Women'], 'pie');
    const literacyChartData = chartData(data.literacy, ['Men', 'Women', 'People'], 'bar');
    const workingPopulationChartData = chartData(data.workingPopulation, ['Men', 'Women', 'People'], 'line');
    const ageGroupChartData = chartData(data.ageGroup, ['0-14', '15-24', '25-54', '55-64', '65+'], 'bar');

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
        },
    };

    const barChartOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
                },
            },
        },
    };

    const lineChartOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
                },
            },
        },
    };

    return (
        <div className="p-5 bg-gray-100 text-black h-screen overflow-y-auto">
            <div className="mb-5">
                <label htmlFor="stateSelect" className="mr-2 font-bold">Select State:</label>
                <select
                    id="stateSelect"
                    value={selectedState}
                    onChange={e => setSelectedState(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    {states.map(state => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex flex-wrap gap-0">
                    <div className="bg-white p-5 rounded shadow w-full md:w-1/2 lg:w-1/2">
                        <h3 className="text-lg font-semibold mb-4">Population Data for {selectedState}</h3>
                        <div className="w-full h-72">
                            <Pie data={stateChartData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded shadow w-full md:w-1/2 lg:w-1/2">
                        <h3 className="text-lg font-semibold mb-4">Literacy Data for {selectedState}</h3>
                        <div className="w-full h-72">
                            <Bar data={literacyChartData} options={barChartOptions} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-0">
                    <div className="bg-white p-5 rounded shadow w-full md:w-1/2 lg:w-1/2">
                        <h3 className="text-lg font-semibold mb-4">Working Population Data for {selectedState}</h3>
                        <div className="w-full h-72">
                            <Line data={workingPopulationChartData} options={lineChartOptions} />
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded shadow w-full md:w-1/2 lg:w-1/2">
                        <h3 className="text-lg font-semibold mb-4">Age Group Data for {selectedState}</h3>
                        <div className="w-full h-72">
                            <Bar data={ageGroupChartData} options={barChartOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
