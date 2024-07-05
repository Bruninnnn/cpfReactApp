import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export const DoughnutProgressChart = ({ percentGoals }) => {
  const chartContainer = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d')

      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              label: 'Depósito',
              data: [percentGoals, 100 - percentGoals],
              backgroundColor: [
                '#8A05BE', // Purple for up to 100%
                percentGoals > 100 ? '#4A0579' : '#e0e0e0' // Dark purple if over 100%, gray otherwise
              ],
              borderWidth: 0
            }
          ]
        },
        plugins: [
          {
            beforeDraw: (chart) => {
              const { width, height } = chart
              const ctx = chart.ctx
              ctx.restore()
              const fontSize = (height / 150).toFixed(2)
              ctx.font = fontSize + 'em sans-serif'
              ctx.fillStyle = '#fff'
              ctx.textBaseline = 'middle'
              const text = `${percentGoals}%`
              const textX = Math.round(
                (width - ctx.measureText(text).width) / 2
              )
              const textY = height / 2
              ctx.fillText(text, textX, textY)
              ctx.save()
            }
          }
        ],
        options: {
          maintainAspectRatio: false,
          cutout: '80%',
          rotation: '180',
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false // Disable tooltips
            }
          },
          hover: {
            mode: null // Disable hover effects
          },
        }
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [percentGoals])

  useEffect(() => {
    if (chartInstance.current) {
      const dataset = chartInstance.current.data.datasets[0]
      dataset.data = [percentGoals, 100 - percentGoals]
      dataset.backgroundColor = [
        '#8A05BE', // Purple for up to 100%
        percentGoals > 100 ? '#4A0579' : '#e0e0e0' // Dark purple if over 100%, gray otherwise
      ]
      chartInstance.current.update()
    }
  }, [percentGoals])

  return (
    <div className="relative flex w-full h-full p-12 xl:p-0">
      <canvas className='flex w-full h-full' ref={chartContainer} />
    </div>
  )
}
