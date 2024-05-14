import React from 'react'
import { MdAttachMoney, MdMoneyOff, MdOutlineToll } from 'react-icons/md'

import { CardDashBoardWallet } from '../../components/Card/CardDashBoardWallet'

const card = "R$ 0,00"

const DashBoardBalances = ({ receipt, balance, cost }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 justify-evenly mt-4 mx-0 gap-4 w-full sm:flex-col">
      <CardDashBoardWallet id={1} propTitle={"Receita"} propTypeValue={receipt} />
      <CardDashBoardWallet id={2} propTitle={"Saldo"} propTypeValue={balance} />
      <CardDashBoardWallet id={3} propTitle={"Despesas"} propTypeValue={cost} />
      <CardDashBoardWallet id={4} propTitle={"Cartão"} propTypeValue={card} />
    </div >
  )
}

export default DashBoardBalances;

function BoxWrapper({ children }) {
  return <div className="bg-color-rows rounded-3xl p-4 flex-1 border border-color-border flex items-center">{children}</div>
}
