import React from 'react'
import { NumericFormat } from 'react-number-format'

export const InputValue = ({
  label,
  name,
  value,
  placeholder,
  onValueChange,
  width
}) => {
  return (
    <div className={`-m-3 mb-2 flex flex-col ${width}`}>
      <label className="mt-2 sm:-mb-4 sm:mt-4 md:-mb-2 md:mt-2 xl:text-sm">{label}</label>
      <NumericFormat
        name={name}
        value={value}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        fixedDecimalScale={true}
        prefix={'R$ '}
        placeholder={placeholder}
        onValueChange={onValueChange}
        className="mx-0 my-2 rounded-lg border-none bg-color-bginputs p-3 outline outline-color-receipt hover:outline-1 sm:mb-3"
        required
      />
    </div>
  )
}
