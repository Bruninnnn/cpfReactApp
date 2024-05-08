import React from 'react'

export const InputLayout = ({
  label,
  name,
  id,
  type,
  value,
  placeholder,
  onChange,
  onBlur,
  width
}) => {


  return (
    <div className={`-m-3 mb-3 flex flex-col ${width}`}>
      <label className="mt-4 sm:-mb-4 sm:mt-4 md:-mb-2 md:mt-2 ">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className="mx-0 my-2 rounded-lg border-none bg-color-bginputs p-3 outline outline-color-receipt hover:outline-1 sm:mb-3"
        required
      />
    </div>
  )
}
