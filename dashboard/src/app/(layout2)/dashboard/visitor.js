   ""
   // components/LineChart.js
   import React from 'react';
   import { Line } from 'react-chartjs-2';
   import {
     Chart as ChartJS,
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     Title,
     Tooltip,
     Legend,
     Filler,
   } from 'chart.js';

   ChartJS.register(
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     Title,
     Tooltip,
     Legend,
     Filler
   );

   const LineChart = () => {
     const data = {
       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
       datasets: [
         {
           label: 'Page views',
           data: [80, 60, 100, 95, 88, 92, 87, 90, 85, 88, 93, 40],
           borderColor: 'rgba(0, 123, 255, 1)',
           backgroundColor: 'rgba(0, 123, 255, 0.1)',
           tension: 0.4,
           fill: true,
         },
         {
           label: 'Sessions',
           data: [110, 65, 150, 35, 60, 30, 28, 65, 50, 55, 115, 42],
           borderColor: 'rgba(0, 50, 150, 1)',
           backgroundColor: 'rgba(0, 50, 150, 0.3)',
           tension: 0.4,
           fill: true,
         },
       ],
     };

     const options = {
       responsive: true,
       plugins: {
         legend: {
           position: 'bottom',
         },
         title: {
           display: false,
         },
       },
       scales: {
         x: {
           grid: {
             display: false,
           },
         },
         y: {
           grid: {
             display: false,
           },
           ticks: {
             stepSize: 10,
           },
         },
       },
     };

     return <Line data={data} options={options} />;
   };

   export default LineChart;