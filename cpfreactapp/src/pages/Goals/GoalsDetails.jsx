import React, { useState } from 'react'

import { InputLayout } from '../../components/Input/InputLayout'
import { TableGoals } from '../../components/Table/TableGoals'
import { FaPaperPlane } from 'react-icons/fa'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { ModalAddDepositGoals } from '../../components/Modals/ModalAddDepositGoals'
import { DoughnutProgressChart } from '../../components/Charts/DoughnutProgressChart'

export const GoalsDetails = () => {
  const [openModalDepositGoals, setOpenModalDepositGoals] = useState(false)

  const handleOpenModalDepositGoals = (event) => {
    setOpenModalDepositGoals(true)
  }

  const handleCloseModalDepositGoals = () => {
    setOpenModalDepositGoals(false)
  }

  return (
    <div className="mx-4 flex h-full w-full flex-col">
      <div className="flex h-full w-full flex-col justify-center ">
        <div className="mb-4 ml-4 flex w-full items-center">
          <Link
            to={'/dashboard/goals'}
            className="rounded-full p-4 hover:bg-color-border"
          >
            <IoMdArrowRoundBack />
          </Link>
          <h1>Detalhes da meta</h1>
        </div>
        <div className="flex h-3/4 w-full gap-4 md:flex-col">
          <div
            id="card-relatório-metas"
            className="flex h-full w-1/2 flex-col rounded-2xl bg-color-bgforms p-8 md:h-1/2 md:w-full"
          >
            <div className="mb-4 flex w-full">
              <h2 className="md:text-lg">Relatório de depósitos</h2>
            </div>
            <div className="flex h-full w-full flex-1 md:h-1/2">
              <div className="flex h-full w-full items-center">
                <DoughnutProgressChart />
              </div>
            </div>
            <div className="flex w-full items-center justify-between pt-4">
              <h3>Valor da meta:</h3>
              <h3>Valor guardado:</h3>
              <h3>Valor restante:</h3>
            </div>
          </div>

          <div
            id="card-extrato-metas"
            className="flex h-full w-1/2 flex-col rounded-2xl bg-color-bgforms p-8 md:h-1/2 md:w-full"
          >
            <div className="mb-4 flex w-full">
              <h2 className="md:text-lg">Últimos depósitos</h2>
            </div>
            <div className="flex w-full flex-1">
              <TableGoals />
            </div>
            <div className="flex items-end justify-end">
              <button
                title="Adicionar saldo"
                className="flex items-center rounded-2xl bg-color-receipt p-2 text-center"
                onClick={handleOpenModalDepositGoals}
              >
                <FaPaperPlane />
                <p className="ml-2">Adicionar saldo</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      {openModalDepositGoals && (
        <ModalAddDepositGoals onClose={handleCloseModalDepositGoals} />
      )}
    </div>
  )
}
