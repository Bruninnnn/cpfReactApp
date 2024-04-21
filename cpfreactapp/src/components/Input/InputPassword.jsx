import React, { useState } from 'react'

const functionPassword = () => {
  setPasswordShow(!passwordShow);
};

const InputPassword = ({ label, id, name, type, value, placeholder, onChange, togglePassword, width }) => {
  return (
    <div className={`flex flex-col mb-3 -m-3 ${width}`}>
      <label htmlFor="password" className="mt-4 md:-mb-2 md:mt-1">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={togglePassword ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="my-2 mx-0 p-3 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt md:mb-1"
        required
      />
    </div>
  )
}

export default InputPassword