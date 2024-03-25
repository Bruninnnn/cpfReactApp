import React, { useEffect, useState } from 'react'

import { Chart } from "primereact/chart";

export const BarChart = ({ title }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
      labels: ['A', 'B'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }
      ]
    }

    const options = {
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      plugins: {
        title: {
          text: "Teste"
        }
      }
    }
  })


  return (
    <div className="w-[20rem] h-[22rem] flex flex-col justify-center w-full h-full bg-color-bgforms p-4 rounded-2xl border border-solid border-color-border">
      <strong className="font-medium my-3">{title}</strong>
      <div className="w-full mt-3 flex-1 text-xs ">
        <Chart width={700} height={350} type="bar" data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}
