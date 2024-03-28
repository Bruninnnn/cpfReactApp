import React, { useEffect, useState } from 'react'

import { Chart } from "primereact/chart";
import { defaults } from "chart.js/auto";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

export const BarChart = ({ title }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [
        {
          label: 'Ganhos - R$',
          backgroundColor: 'rgb(10, 92, 90)',
          borderColor: 'rgb(10, 92, 90)',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Despesas - R$',
          backgroundColor: 'rgb(60, 31, 45)',
          borderColor: 'rgb(60, 31, 45)',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            color: '#ffffff',
            font: {
              size: 12
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#fff',
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: '#fff'
          },
          grid: {
            color: '#fff',
            drawBorder: true
          }
        }
      }
    }
    setChartData(data);
    setChartOptions(options);
  }, [])

  return (
    <div className="justify-center bg-color-bgforms p-4 rounded-2xl border border-solid border-color-border">
      <strong className="font-medium my-4">{title}</strong>
      <div className="flex justify-center">
        <Chart className="w-full" type="bar" data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}
