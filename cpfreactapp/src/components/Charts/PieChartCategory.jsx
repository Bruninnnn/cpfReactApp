import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart'
import { defaults } from 'chart.js/auto'

defaults.maintainAspectRatio = false
defaults.responsive = true

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return `rgba(${r}, ${g}, ${b}, 0.8)`
}

const generateColors = (labels) => {
  const colors = labels.map(() => getRandomColor())
  return {
    backgroundColor: colors,
    hoverBackgroundColor: colors.map((color) => color.replace('0.8', '0.5'))
  }
}

const PieChartCategory = ({ baseData, title }) => {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    if (baseData) {
      const filterLabel = baseData.filter(
        (data) => data.registerType === 'COST'
      )
      const formatedLabel = filterLabel.map((data) => data.regGroupType)
      const filterValue = filterLabel.map((data) =>
        parseFloat(data.registerValue).toFixed(2)
      )
      const formattedValue = filterValue.map((value) => parseFloat(value))

      const { backgroundColor, hoverBackgroundColor } =
        generateColors(formatedLabel)

      const data = {
        labels: formatedLabel,
        datasets: [
          {
            label: 'R$',
            data: formattedValue,
            backgroundColor: backgroundColor,
            hoverBackgroundColor: hoverBackgroundColor,
            borderColor: ['rgba(0, 0, 0, 0.0)']
          }
        ]
      }

      const options = {
        responsive: true,
        cutout: '70%',
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
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                let label = tooltipItem.dataset.label || ''
                if (label) {
                  label += ': '
                }
                if (!isNaN(tooltipItem.raw)) {
                  label += parseFloat(tooltipItem.raw).toFixed(2)
                } else {
                  label += tooltipItem.raw
                }
                return label
              }
            }
          }
        }
      }

      setChartData(data)
      setChartOptions(options)
    }
  }, [baseData])

  return (
    <div className="flex w-full flex-col rounded-2xl border border-solid border-color-border bg-color-bgforms p-4">
      <strong className="my-0 font-medium">{title}</strong>
      <div className="flex justify-center my-4">
        <Chart
          className="w-1/2 sm:w-full md:w-10 lg:w-1/2"
          type="doughnut"
          data={chartData}
          options={chartOptions}
        />
      </div>
    </div>
  )
}

export default PieChartCategory
