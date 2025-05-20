// components/BarChart.js
"use client";
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const chartCanvas = chartRef.current.getContext('2d');

    if (chartInstance.current) {
        chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Income',
            data: [180, 90, 130, 110, 160, 140, 170, 200, 190, 220, 210, 190],
            backgroundColor: 'orange',
            barThickness: 20,
          },
          {
            label: 'Cost of Sales',
            data: [110, 40, 70, 140, 120, 90, 190, 220, 160, 210, 220, 200],
            backgroundColor: 'blue',
            barThickness: 20,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 240,
            ticks: {
              stepSize: 20,
            },
          },
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
          },
        },
      },
    });

    return () => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default BarChart;