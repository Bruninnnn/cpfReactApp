import React from 'react'

export const ProgressBar = ({ priceInitial, priceGoals }) => {
  return (
    <div className="mt-2">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium">R$ {priceInitial}</span>
        <span className="text-base font-medium">de {priceGoals}</span>
      </div>
      <div className="w-full bg-color-border rounded-full h-2.5 mb-4">
        <div className="bg-color-nubank h-2.5 rounded-full mb-4" style={{ width: "50%" }}></div>
      </div>
    </div>
  )
}
