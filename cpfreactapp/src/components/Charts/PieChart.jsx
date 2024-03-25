import React, { useEffect, useState } from "react";

import { Chart } from "primereact/chart";
import { defaults } from "chart.js";



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
    <div className="card flex flex-col justify-center w-full h-full bg-color-bgforms p-4 rounded-2xl border border-solid border-color-border">
      <strong className="font-medium my-3">{title}</strong>
      <div className="card flex justify-center h-full">
        <Chart width={700} height={350} type="doughnut" data={chartData} options={chartOptions}/>
      </div>
    </div>
  );
};

export default PieChart;
