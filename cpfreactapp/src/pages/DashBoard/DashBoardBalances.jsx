import React from 'react'
import { MdAttachMoney, MdMoneyOff, MdOutlineToll } from 'react-icons/md'

import { CardDashBoardWallet } from '../../components/Card/CardDashBoardWallet'

const card = "R$ 0,00"

const DashBoardBalances = ({ receipt, balance, cost }) => {
  return (
    <div className="flex justify-evenly mt-4 mx-0 gap-12 w-full m-sm:w-3/4 m-md:w-full md:flex-col m-sm:gap-2 m-lg:gap-24 m-xl:gap-4 m-2xl:gap-12">
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
