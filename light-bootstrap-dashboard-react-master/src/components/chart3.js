import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
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
  Legend
);

export default function Chart3(){
    const labels = ["00시","02시","04시","06시","08시","10시","12시","14시","16시","18시","20시","22시","23시"];
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


    const data = {
        labels,
        datasets: [
          {
            label: '총 전력량',
            data: [
                3289.271949276328,
                1500.6860181167722,
                1597.9688672648626,
               1267.2627006778494,
                 1388.4441493228078,
                 1584.8522331416607,
                1303.7078996002674
               ],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          // {
          //   label: 'Dataset 2',
          //   data: [],
          //   borderColor: 'rgb(53, 162, 235)',
          //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
          // },
        ],
    }
    return(
        <>
        <Line options={options} data={data} />
        </>
    )
}





