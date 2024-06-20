import React from 'react'
import { MdAddCircleOutline } from 'react-icons/md'

export const CardAddBankWallet = ({ handleOnClick }) => {

  return (
    <div className="w-full h-full items-center p-4 mt-0 border border-solid bg-color-bgforms border-color-border rounded-3xl">
      <div className="flex flex-row">
        <div className="flex flex-1 items-center">
          <h3 className="pl-2 pt-2 text-[1.5rem] font-semibold">Conectar Banco</h3>
        </div>
      </div>
      <div className="flex h-2/3">
        <div className="flex w-full h-full justify-center">
          <button
            onClick={handleOnClick}
            className="flex items-center justify-center">
            <MdAddCircleOutline style={{ fontSize: '3rem' }} />
          </button>
        </div>
      </div>
    </div>
  )
}
