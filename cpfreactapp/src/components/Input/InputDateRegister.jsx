import React from 'react'

export const InputDateRegister = ({ label, id, type, value, placeholder, onChange, onBlur, width }) => {
  return (
    <div className={`-m-3 mb-2 flex flex-col ${width}`}>
      <label className="mt-2 sm:-mb-4 sm:mt-4 md:-mb-2 md:mt-2 xl:text-sm">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className="my-2 mx-0 p-3 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt sm:mb-3"
        required
      />
    </div>
  )
}
