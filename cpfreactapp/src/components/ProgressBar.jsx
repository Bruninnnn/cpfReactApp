import React from 'react'

export const ProgressBar = ({ value, targetValue, percent }) => {
  const formatNumber = (number) => {
    if (number === undefined || number === null) return '0,00'
    return number
      .toFixed(2)
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  const width = Math.min(Math.max(percent, 0), 100)

  return (
    <div className="mt-2">
      <div className="mb-1 flex justify-between">
        <span className="text-base font-medium">R$ {formatNumber(value)}</span>
        <span className="text-base font-medium">
          de R$ {formatNumber(targetValue)}
        </span>
      </div>
      <div className="mb-4 h-2.5 w-full rounded-full bg-color-border">
        <div
          className="mb-4 h-2.5 rounded-full bg-color-nubank"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  )
}
