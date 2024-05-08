import React from 'react'

export const ProgressBar = ({ priceInitial, priceGoals }) => {
  return (
    <div className="">
      <div className="flex justify-between mb-1">
        <span className="text-lg font-medium">R$ {priceInitial}</span>
        <span className="text-lg font-medium">de {priceGoals}</span>
      </div>
      <div className="w-full bg-color-border rounded-full h-2.5">
        <div className="bg-color-nubank h-2.5 rounded-full" style={{ width: "50%" }}></div>
      </div>
    </div>
  )
}
