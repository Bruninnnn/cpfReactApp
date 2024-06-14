import React from 'react'

export const SelectLayout = ({
  label,
  name,
  id,
  value,
  options,
  onChange,
  width
}) => {
  return (
    <div className={`-m-3 mb-2 flex flex-col ${width}`}>
      <label className="mt-2 sm:-mb-4 sm:mt-4 md:-mb-2 md:mt-2 ">{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="mx-0 my-2 rounded-lg border-none bg-color-bginputs p-3 outline outline-color-receipt hover:outline-1 sm:mb-3"
        required
      >
        <option value="" disabled selected>
          Selecione...
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
