import React from 'react'
import { MdAttachMoney, MdMoneyOff, MdOutlineToll } from 'react-icons/md'

export const CardWallet = ({ id, propTitle, propTypeValue }) => {
  const propIcon = {
    1: {
      icon: <MdAttachMoney style={{ fontSize: '2.5rem' }} className="bg-color-receipt justify-center text-center p-1.5 mb-2 rounded-full" />
    },
    2: {
      icon: <MdOutlineToll style={{ fontSize: '2.5rem' }} className="bg-color-bginputs justify-center text-center p-1.5 mb-2 rounded-full" />
    },
    3: {
      icon: <MdMoneyOff style={{ fontSize: '2.5rem' }} className="bg-color-cost justify-center text-center p-1.5 mb-2 rounded-full" />
    }
  }

  return (
    <div className="m-xl:w-80 m-2xl:w-96 m-lg:w-80 m-sm:w-72 items-center p-4 mt-2 border border-solid bg-color-bgforms border-color-border rounded-3xl"> {/* balance */}
      {propIcon[id].icon}
      <div className="middle"> {/* middle */}
        <div className="left"> {/* left */}
          <h3 className="mb-4 text-[1rem] mt-1">{propTitle}</h3>
          <h1>{propTypeValue}</h1>
        </div>
      </div>
    </div>
  )
}
