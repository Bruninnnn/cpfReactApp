import React from 'react'

const InputDate = ({ id, type, value, onChange }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="bg-color-rows text-base rounded-lg p-2 text-[#ffffff] text-center border border-solid border-color-border hover:outline-1 focus:outline-1 outline outline-color-receipt"
    />
  )
}

export default InputDate