import React from 'react'
import { MdAddCircleOutline } from 'react-icons/md';

export const CardAddGoals = ({ propOpenModal }) => {
  return (
    <div className="m-xl:w-80 m-2xl:w-full h-48 m-lg:w-80 items-center p-4 mt-0 border border-solid bg-color-bgforms border-color-border rounded-3xl"> {/* balance */}
      <div className="flex flex-row">
        <div className="flex flex-1 items-center">
          <h3 className="pl-2 text-[1.5rem] font-semibold">Criar Meta</h3>
        </div>
      </div>
      <div className="flex h-2/3">
        <div className="flex w-full h-full justify-center">
          <button
            onClick={propOpenModal}
            className="flex items-center justify-center">
            <MdAddCircleOutline style={{ fontSize: '3rem' }} />
          </button>
        </div>
      </div>
    </div>
  )
}