import React, { useEffect, useState } from "react";

import { Chart } from "primereact/chart";
import { defaults } from "chart.js/auto";

defaults.responsive = true;

const PieChart = ({ title }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
      labels: ["Comida", "Lazer", "Eletrônicos"],
      datasets: [
        {
          label: "R$",
          data: [300, 50, 100],
          backgroundColor: [
            "rgba(245, 40, 145, 0.8)",
            "rgba(245, 241, 39, 0.8)",
            "rgba(39, 245, 65, 0.8)",
          ],
          hoverBackgroundColor: [
            "rgba(245, 40, 145, 0.8)",
            "rgba(245, 241, 39, 0.8)",
            "rgba(39, 245, 65, 0.8)",
          ],
          borderColor: ["rgba(0, 0, 0, 1)"],
        },
      ],
    };
    const options = {
      responsive: true,
      cutout: "70%",
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
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="justify-center bg-color-bgforms p-4 rounded-2xl border border-solid border-color-border">
      <strong className="font-medium my-4">{title}</strong>
      <div className="flex justify-center">
        <Chart className="w-1/2 sm:w-1/2 md:w-10 lg:w-1/2 m-xlw-full" type="doughnut" data={chartData} options={chartOptions}/>
      </div>
    </div>
  );
};

export default PieChart;
