import React from 'react'

import {
  MdAttachMoney,
  MdMoneyOff,
  MdOutlineCreditCard,
  MdOutlineToll
} from 'react-icons/md'
import { TbPigMoney } from 'react-icons/tb'

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
    },
    5: {
      icon: (
        <TbPigMoney
          style={{ fontSize: '2.5rem' }}
          className="mb-2 justify-center rounded-full bg-color-nubank p-1.5 text-center"
        />
      )
    },
  }

  return (
    <div className="mt-2 w-auto items-center rounded-3xl border border-solid border-color-border bg-color-bgforms p-4">
      {propIcon[id].icon}
      <div className="middle">
        <div className="left">
          <h3 className="mb-4 mt-1 text-[1rem]">{propTitle}</h3>
          <h1 className='xl:text-2xl'>{propTypeValue}</h1>
        </div>
      </div>
    </div>
  )
}
