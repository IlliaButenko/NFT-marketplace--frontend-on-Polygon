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

export default function PriceChart(props) {
  const data = {
    labels: ["1/21", "1/22", "1/23", '1/24', '1/25'],
    datasets: [
      {
        label: "Price (ETH)",
        data: [1.5, 1.4, 1.6, 1.45, 1.5],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(32, 129, 226, 1)"
      }
    ]
  }
  return (
    <div className='card-content-id end'>
      <div></div>
      <div className='chart-container'>
        <Line data={data} />
      </div>
    </div>
  )
}
