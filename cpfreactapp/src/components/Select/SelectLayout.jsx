import React from 'react'

export const SelectLayout = ({ label, id, value, options, onChange, width }) => {
  return (
    <div className={`flex flex-col mb-3 -m-3 h-24 ${width}`}>
      <label className="mt-4 sm:-mb-4 sm:mt-4 md:-mb-2 md:mt-2 ">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="my-2 mx-0 p-3 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt sm:mb-3"
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