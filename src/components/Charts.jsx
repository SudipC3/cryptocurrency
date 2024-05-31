import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Charts = ({ arr = [], currency, days }) => {
    const prices = [];
    const date = [];
    console.log(arr.length);
    for (let i = 0; i < arr.length; i++) {
        const d = new Date(arr[i][0]);
        if(days === "24h") date.push(d.toLocaleTimeString());
        else date.push(d.toLocaleDateString());
        prices.push(arr[i][1]);
    }

    const data = {
        labels: date,
        datasets: [
            {
                label: `Price in ${currency}`,
                data: prices,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
            },
        ],
    };
    return (
        <Line

            options={{
                responsive: true
            }}
            data={data}
        />
    );
};

export default Charts 