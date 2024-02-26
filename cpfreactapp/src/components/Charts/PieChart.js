import React from 'react'
import ApexCharts from 'apexcharts';

/* import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { CustomTooltip } from './CustomTooltip' */

/* const data = [
  { label: "Restaurante", value: 500 },
  { label: "Eletrônicos", value: 250 },
  { label: "Teste", value: 500 },
  { label: "Teste2", value: 250 },
]; */


const PieChart = () => {
  
  const options = {
    options: {
      chart: {
        width: 380,
        type: 'donut',
      },
      dataLabels: {
        enabled: false
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            show: false
          }
        }
      }],
      legend: {
        position: 'right',
        offsetY: 0,
        height: 230,
      }
    }
  }

  const series = {
    series: [44, 55, 13, 33],
    chartOptions: {
      labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
    }
  }
  
  return (
    <ApexCharts
      options={options}
      series={series}
      type="pie"
      width={1000}
      height={300}
    />
  )
}


/* const data = [
  { name: "Restaurante", value: 500 },
  { name: "Eletrônicos", value: 250 },
  { name: "Teste", value: 500 },
  { name: "Teste2", value: 250 },
]

const PieCharts = () => {
  return (
    <div style={{ width: 1000, height: 300 }}>
      <ResponsiveContainer style={{ width: 1000, height: 300 }}>
        <PieChart width={1000} height={1000}>
          <Pie
            dataKey="value"
            data={data}
            innerRadius={55}
            outerRadius={75}
            fill='#400000'
          />
          <Tooltip
            content={<CustomTooltip active={[]} payload={[]} label={[]} />}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
} */

export default PieChart;