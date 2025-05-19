import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
    const data = {
      labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      datasets: [
        {
          label: '$',
          data: [3500, 7000, 4200, 2000, 4000, 3000, 5000],
          backgroundColor: 'rgba(74, 222, 209, 0.8)',
        },
      ],
    };

    const options = {
     responsive: true,
     maintainAspectRatio: false,
     plugins: {
         legend: {
           display: false,
         },
       },
      scales: {
        y: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
        },
      },
    };

    return <Bar data={data} options={options} />;
  };

  export default BarChart;