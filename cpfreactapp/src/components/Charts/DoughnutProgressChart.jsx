import React, { useEffect, useRef } from 'react'

import Chart from 'chart.js/auto';

export const DoughnutProgressChart = ({ percentGoals }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            label: 'Depósito',
            percent: percentGoals,
            backgroundColor: ['#8A05BE', '#e0e0e0'],
            borderWidth: 0
          }]
        },
        plugins: [{
          beforeInit: (chart) => {
            const dataset = chart.data.datasets[0];
            chart.data.labels = [dataset.label];
            dataset.data = [dataset.percent, 100 - dataset.percent];
          }
        },
        {
          beforeDraw: (chart) => {
            const { width, height } = chart;
            const ctx = chart.ctx;
            ctx.restore();
            const fontSize = (height / 150).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.fillStyle = "#fff";
            ctx.textBaseline = "middle";
            const text = chart.data.datasets[0].percent + "%",
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
          }
        }],
        options: {
          maintainAspectRatio: false,
          cutout: '80%',
          rotation: '180',
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  if (tooltipItem.dataIndex === 0) {
                    return `${tooltipItem.raw}%`;
                  }
                  return null;
                }
              }
            }
          },
          events: ['onHover']
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex relative w-full h-full p-12 xl:p-0">
      <canvas ref={chartContainer} />
    </div>
  );
};
