import React from 'react'

const InputDate = ({ id, type, value, onChange }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="bg-color-rows text-xl p-2 text-[#ffffff] text-center [transition:all_450ms_ease] hover:[box-shadow:none]"
    />
  )
}

export default InputDate