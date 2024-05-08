import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'

export const ModalPopUp = ({ onClose }) => {
  return (
    <div className="absolute z-1 w-36 whitespace-normal break-words rounded-lg border border-color-border bg-color-bgforms p-4 font-sans text-sm font-normal shadow-lg focus:outline-none">
      <button className="flex items-center" onClick={onClose}>
        <div className="flex flex-1">
          <FaTrashAlt />
        </div>
        <h3>Excluir</h3>
      </button>
    </div>
  )
}
