import React from 'react'

import {
  MdAttachMoney,
  MdMoneyOff,
  MdOutlineCreditCard,
  MdOutlineToll
} from 'react-icons/md'

export const CardDashBoardWallet = ({ id, propTitle, propTypeValue }) => {
  const propIcon = {
    1: {
      icon: (
        <MdAttachMoney
          style={{ fontSize: '2.5rem' }}
          className="mb-2 justify-center rounded-full bg-color-receipt p-1.5 text-center"
        />
      )
    },
    2: {
      icon: (
        <MdOutlineToll
          style={{ fontSize: '2.5rem' }}
          className="mb-2 justify-center rounded-full bg-color-bginputs p-1.5 text-center"
        />
      )
    },
    3: {
      icon: (
        <MdMoneyOff
          style={{ fontSize: '2.5rem' }}
          className="mb-2 justify-center rounded-full bg-color-cost p-1.5 text-center"
        />
      )
    },
    4: {
      icon: (
        <MdOutlineCreditCard
          style={{ fontSize: '2.5rem' }}
          className="mb-2 justify-center rounded-full bg-color-cost p-1.5 text-center"
        />
      )
    }
  }

  return (
    <div className="mt-2 w-full items-center rounded-3xl border border-solid border-color-border bg-color-bgforms p-4">
      {' '}
      {/* balance */}
      {propIcon[id].icon}
      <div className="middle">
        <div className="left">
          <h3 className="mb-4 mt-1 text-[1rem]">{propTitle}</h3>
          <h1>{propTypeValue}</h1>
        </div>
      </div>
    </div>
  )
}
