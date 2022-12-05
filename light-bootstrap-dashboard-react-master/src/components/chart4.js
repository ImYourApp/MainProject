import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Chart4(){
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [
            {
            fill: true,
            label: '현재 전력사용량',
            data: [
                3289.271949276328,
                1500.6860181167722,
                1597.9688672648626,
               1267.2627006778494,
                 1388.4441493228078,
                 1584.8522331416607,
                1303.7078996002674
               ],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                fill: true,
                label: '예측 전력사용량',
                data: [
                    4289.271949276328,
                    2500.6860181167722,
                    2597.9688672648626,
                   2267.2627006778494,
                     2388.4441493228078,
                     2584.8522331416607,
                    2303.7078996002674
                   ],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Chart.js Line Chart',
            },
        },
    };

    return <Line options={options} data={data} />;
}
