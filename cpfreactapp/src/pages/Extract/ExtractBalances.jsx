import React from 'react'
import { MdAttachMoney, MdMoneyOff, MdOutlineToll } from 'react-icons/md'

import { CardDashBoardWallet } from '../../components/Card/CardDashBoardWallet'

const card = 'R$ 0,00'

const ExtractBalances = ({
  receipt,
  balance,
  cost,
  balanceCard,
  balanceGoals
}) => {
  return (
    <div className="mt-4 grid w-full grid-cols-3 grid-rows-1 justify-evenly gap-4 m-sm:grid-cols-1 m-md:grid-cols-3">
      <CardDashBoardWallet id={2} propTitle={'Saldo'} propTypeValue={balance} />
      <CardDashBoardWallet
        id={4}
        propTitle={'Fatura do Cartão'}
        propTypeValue={balanceCard}
      />
      <CardDashBoardWallet
        id={5}
        propTitle={'Metas'}
        propTypeValue={balanceGoals}
      />
    </div>
  )
}

export default ExtractBalances

function BoxWrapper({ children }) {
  return (
    <div className="flex flex-1 items-center rounded-3xl border border-color-border bg-color-rows  p-4">
      {children}
    </div>
  )
}
