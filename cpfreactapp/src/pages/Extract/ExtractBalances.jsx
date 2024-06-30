import React from 'react'
import { MdAttachMoney, MdMoneyOff, MdOutlineToll } from 'react-icons/md'

import { CardDashBoardWallet } from '../../components/Card/CardDashBoardWallet'

const card = "R$ 0,00"

const ExtractBalances = ({ receipt, balance, cost, balanceCard, balanceGoals }) => {
  return (
    <div className="grid w-full grid-cols-3 grid-rows-1 gap-4 m-md:grid-cols-3 m-sm:grid-cols-1 justify-evenly mt-4">
      <CardDashBoardWallet id={2} propTitle={"Registro Manual"} propTypeValue={balance} />
      <CardDashBoardWallet id={4} propTitle={"Contas Bancárias"} propTypeValue={balanceCard} />
      <CardDashBoardWallet id={5} propTitle={"Metas"} propTypeValue={balanceGoals} />
    </div >
  )
}

export default ExtractBalances;

function BoxWrapper({ children }) {
  return <div className="flex flex-1 bg-color-rows rounded-3xl p-4 border border-color-border  items-center">{children}</div>
}
