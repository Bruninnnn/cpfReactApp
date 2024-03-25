import React from 'react'
import { MdAttachMoney, MdMoneyOff, MdOutlineToll } from 'react-icons/md'

export const DashBoardBalances = ({ receipt, balance, cost }) => {
  return (
    <div className="flex flex-row md:flex-col w-full h-1/2 gap-80 mt-10"> {/* balances */}
      <div className="bg-color-rows p-4 w-[15vw] h-[18vh] rounded-3xl mt-2 border border-[solid] border-color-border [transition:all_300ms_ease]"> {/* receipt */}
        <span>
          <MdAttachMoney style={{ fontSize: '2.5rem' }} className="bg-color-receipt justify-center text-center p-1.5 mb-2 rounded-full" />
        </span>
        <div className="middle"> {/* middle */}
          <div className="left"> {/* left */}
            <h3 className="mb-4 text-[1rem] mt-1">Receita</h3>
            <h1>{receipt}</h1>
          </div>
        </div>
      </div>
      <div className="bg-color-rows p-4 w-[15vw] h-[18vh] rounded-3xl mt-2 border border-[solid] border-color-border [transition:all_300ms_ease]"> {/* balance */}
        <span>
          <MdOutlineToll style={{ fontSize: '2.5rem' }} className="bg-color-bginputs justify-center text-center p-1.5 mb-2 rounded-full" />
        </span>
        <div className="middle"> {/* middle */}
          <div className="left"> {/* left */}
            <h3 className="mb-4 text-[1rem] mt-1">Saldo</h3>
            <h1>{balance}</h1>
          </div>
        </div>
      </div>
      <div className="bg-color-rows p-4 w-[15vw] h-[18vh] rounded-3xl mt-2 border-[1px] border-[solid] border-color-border [transition:all_300ms_ease]"> {/* cost */}
        <span>
          <MdMoneyOff style={{ fontSize: '2.5rem' }} className="bg-color-cost justify-center text-center p-1.5 mb-2 rounded-full" />
        </span>
        <div className="middle"> {/* middle */}
          <div className="left"> {/* left */}
            <h3 className="mb-4 text-[1rem] mt-1">Despesas</h3>
            <h1>{cost}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
