import React, { useEffect, useState } from 'react'

import { Chart } from 'primereact/chart';

/* import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { CustomTooltip } from './CustomTooltip' */

/* const data = [
  { label: "Restaurante", value: 500 },
  { label: "Eletrônicos", value: 250 },
  { label: "Teste", value: 500 },
  { label: "Teste2", value: 250 },
]; */


const PieChart = () => {


  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
      labels: ['Teste', '123', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "rgba(245, 40, 145, 0.8)",
            "rgba(245, 241, 39, 0.8)",
            "rgba(39, 245, 65, 0.8)"
          ],
          hoverBackgroundColor: [
            "rgba(245, 40, 145, 0.8)",
            "rgba(245, 241, 39, 0.8)",
            "rgba(39, 245, 65, 0.8)"
          ],
          borderColor: [
            "rgba(0, 0, 0, 1)"
          ],
        }
      ]
    };
    const options = {
      cutout: '70%',
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="flex justify-content-center">
      <Chart type="doughnut" data={chartData} options={chartOptions} />
    </div>
  )
}

export default PieChart;