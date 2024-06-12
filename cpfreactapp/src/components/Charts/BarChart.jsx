import React, { useEffect, useState } from 'react'

import { Chart } from "primereact/chart";
import { defaults } from "chart.js/auto";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

export const BarChart = ({ baseData, title }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (baseData) {
      /* const formatedLabel = filterLabel?.map((data) => data.regGroupType) */

      const filterCost = baseData?.filter((data) => data.registerType === "COST")

      const CostValue = filterCost?.map((data) => parseFloat(data.registerValue).toFixed(2))

      const filterIncome = baseData?.filter((data) => data.registerType === "INCOME")
      const IncomeValue = filterIncome?.map((data) => parseFloat(data.registerValue).toFixed(2))

      const formattedValueCost = CostValue?.map((value) => parseFloat(value));
      const formattedValueIncome = IncomeValue?.map((value) => parseFloat(value));

      const data = {
        /* labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'], */
        labels: [""],
        datasets: [
          {
            label: 'Ganhos - R$',
            backgroundColor: 'rgb(10, 92, 90)',
            borderColor: 'rgb(10, 92, 90)',
            data: /* formattedValueIncome */"",
          },
          {
            label: 'Despesas - R$',
            backgroundColor: 'rgb(60, 31, 45)',
            borderColor: 'rgb(60, 31, 45)',
            data: /* formattedValueCost */"",
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
    }
  }, [baseData]);

  return (
    <div className="flex w-full bg-color-bgforms p-4 rounded-2xl border border-solid border-color-border">
      <strong className="font-medium my-4">{title}</strong>
      <div className="flex justify-center">
        <Chart className="w-full" type="bar" data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}
