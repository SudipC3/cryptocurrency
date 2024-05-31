import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js'
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// );

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
    labels: labels,
    datasets: [
        {
            label: "My First dataset",
            data: [0, 10, 5, 2, 20, 30, 45],
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
        },
    ],
};



const Chart = ({ arr = [], currency, days }) => {

    const prices = [1,2,3];
    const data = ["11/2/22","12/3/22", "16/03/23"];

    return (
        <Line options={{
            responsive: true,
        }}
            data={data} />
    );
}

export default Chart