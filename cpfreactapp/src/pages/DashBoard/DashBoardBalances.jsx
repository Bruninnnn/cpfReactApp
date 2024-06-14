import React from 'react'
import { MdAttachMoney, MdMoneyOff, MdOutlineToll } from 'react-icons/md'

import { CardDashBoardWallet } from '../../components/Card/CardDashBoardWallet'

const card = "R$ 0,00"

const DashBoardBalances = ({ receipt, balance, cost, balanceCard, balanceGoals }) => {
  return (
    <div className="grid w-full grid-cols-5 grid-rows-1 gap-4 m-md:grid-cols-2 m-sm:grid-cols-1 m-lg:grid-cols-5 justify-evenly mt-4">
      <CardDashBoardWallet id={1} propTitle={"Receita"} propTypeValue={receipt} />
      <CardDashBoardWallet id={2} propTitle={"Saldo"} propTypeValue={balance} />
      <CardDashBoardWallet id={3} propTitle={"Despesas"} propTypeValue={cost} />
      <CardDashBoardWallet id={4} propTitle={"Cartão"} propTypeValue={balanceCard} />
      <CardDashBoardWallet id={5} propTitle={"Metas"} propTypeValue={balanceGoals} />
    </div >
  )
}

export default DashBoardBalances;

function BoxWrapper({ children }) {
  return <div className="flex flex-1 bg-color-rows rounded-3xl p-4 border border-color-border  items-center">{children}</div>
}
