import React, { useEffect, useState } from "react";

import { Chart } from "primereact/chart";
import { defaults } from "chart.js/auto";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const PieChartCategory = ({ baseData, title }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  console.log(baseData, "BASE");

  useEffect(() => {
    if (baseData) {
      const filterLabel = baseData?.filter((data) => data.registerType === "COST")
      const formatedLabel = filterLabel?.map((data) => data.regGroupType)

      const filterValue = filterLabel?.map((data) => parseFloat(data.registerValue).toFixed(2))
      const formattedValue = filterValue?.map((value) => parseFloat(value));

      console.log(filterValue)

      const data = {
        labels: formatedLabel,
        datasets: [
          {
            label: "R$",
            data: formattedValue,
            backgroundColor: [
              "rgba(155, 5, 208, 0.8)",
              "rgba(21, 125, 191, 0.8)",
              "rgba(39, 245, 65, 0.8)",
              "rgba(210, 38, 38, 0.8)",
              "rgba(171, 203, 255, 0.8)",
              "rgba(82, 18, 58, 0.8)",
              "rgba(101, 74, 33, 0.8)",
              "rgba(246, 211, 68, 0.8)",
              "rgba(246, 211, 68, 0.8)",
              "rgba(246, 211, 68, 0.8)",
              "rgba(246, 211, 68, 0.8)",
              "rgba(246, 211, 68, 0.8)",
            ],
            hoverBackgroundColor: [
              "rgba(155, 5, 208, 0.5)",
              "rgba(21, 125, 191, 0.5)",
              "rgba(39, 245, 65, 0.5)",
              "rgba(210, 38, 38, 0.5)",
              "rgba(171, 203, 255, 0.5)",
              "rgba(82, 18, 58, 0.5)",
              "rgba(101, 74, 33, 0.5)",
              "rgba(246, 211, 68, 0.5)",
              "rgba(246, 211, 68, 0.5)",
              "rgba(246, 211, 68, 0.5)",
              "rgba(246, 211, 68, 0.5)",
              "rgba(246, 211, 68, 0.5)",
            ],
            borderColor: ["rgba(0, 0, 0, 0.0)"],
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
    }
  }, [baseData]);

  return (
    <div className="justify-center bg-color-bgforms p-4 rounded-2xl border border-solid border-color-border">
      <strong className="font-medium my-4">{title}</strong>
      <div className="flex justify-center">
        <Chart className="w-1/2 sm:w-1/2 md:w-10 lg:w-1/2 m-xl:w-full" type="doughnut" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PieChartCategory;
