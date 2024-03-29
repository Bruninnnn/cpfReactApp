import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";

const SimpleLineChart = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
      labels: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      datasets: [
        {
          clip: { left: 5, top: false, right: -2, bottom: 0 },
          axis: "y",
          label: "First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40, 70, 40, 50, 20, 85],
          fill: false,
          borderColor: "rgba(39, 245, 65, 0.8)",
          tension: 0.4,
        },
        {
          label: "Second Dataset",
          data: [28, 48, 40, 0, 86, 27, -90, 0, 10, 50, 22, 100],
          fill: false,
          borderColor: "rgba(245, 40, 145, 0.8)",
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          labels: {
            color: "rgba(255, 255, 255, 1)",
          },
        },
      },
      clip: { left: 5, top: false, right: -2, bottom: 0 },
      scales: {
        x: {
          ticks: {
            color: "rgba(255, 255, 255, 1)",
          },
          grid: {
            color: "rgba(255, 255, 255, 1)",
          },
        },
        y: {
          ticks: {
            color: "rgba(255, 255, 255, 1)",
          },
          grid: {
            color: "rgba(255, 255, 255, 1)",
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="flex">
      <Chart type="line" data={chartData} options={chartOptions} clip={10} />
    </div>
  );
};

export default SimpleLineChart;
