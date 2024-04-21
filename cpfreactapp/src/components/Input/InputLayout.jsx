import React from 'react'

export const InputLayout = ({ label, id, type, value, placeholder, onChange, onBlur, width }) => {
  return (
    <div className={`flex flex-col mb-3 -m-3 ${width}`}>
      <label className="mt-4 sm:-mb-4 sm:mt-4 md:-mb-2 md:mt-2 ">
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
