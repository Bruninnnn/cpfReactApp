import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { defaults } from "chart.js";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const PieChart = ({ baseData }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  console.log(baseData, "BASE");

  useEffect(() => {
    if (baseData) {
      const labels = baseData.map((data) => data.description);
      const values = baseData.map((data) =>
        parseFloat(data.registerValue).toFixed(2)
      );
      const formattedValues = values.map((value) => parseFloat(value));

      const data = {
        labels: labels,
        datasets: [
          {
            data: formattedValues,
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
      };

      setChartData(data);
      setChartOptions(options);
    }
  }, [baseData]);

  return (
    <div className="flex justify-content-center">
      <Chart type="doughnut" data={chartData} options={chartOptions} />
    </div>
  );
};

export default PieChart;
