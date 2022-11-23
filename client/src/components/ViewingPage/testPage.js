import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
  );

export default function TestPage() {
    
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
      };
      const data = {
        labels,
        datasets: [
          {
            label: 'Spelling',
            data: [1, 2, 5, 10, 20, 50, 100],
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
          {
            label: 'Spelling',
            data: [100, 50, 20, 10, 5, 2, 1],
            backgroundColor: 'rgba(0, 120, 255, 1)',
          },
        ],
      };
    console.log(data)

  return (
    <div style={{width:"100%"}}>
        <Bar options={options} data={data} />
    </div>
  );
}
