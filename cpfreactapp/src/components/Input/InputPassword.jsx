import React, { useState } from 'react'

const functionPassword = () => {
  setPasswordShow(!passwordShow);
};

const InputPassword = ({ label, id, name, type, value, placeholder, onChange, togglePassword, width }) => {
  return (
    <div className={`-m-3 mb-2 flex flex-col ${width}`}>
      <label htmlFor="password" className="mt-2 md:-mb-2 md:mt-1 xl:text-sm">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={togglePassword ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="my-2 mx-0 p-3 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt md:mb-3"
        required
      />
    </div>
  )
}

export default InputPassword