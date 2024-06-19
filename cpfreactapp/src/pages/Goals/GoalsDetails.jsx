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
    <div className="flex flex-col w-full h-full mx-4">
      <div className="flex flex-col w-full h-full justify-center ">
        <div className="flex w-full items-center ml-4 mb-4">
          <Link to={"/dashboard/goals"} className="p-4 hover:bg-color-border rounded-full">
            <IoMdArrowRoundBack />
          </Link>
          <h1>Detalhes da meta</h1>
        </div>
        <div className='flex w-full h-3/4 gap-4 md:flex-col'>
          <div id='card-relatório-metas' className='flex flex-col w-1/2 h-full md:w-full md:h-1/2 bg-color-bgforms rounded-2xl p-8'>
            <div className="flex w-full mb-4">
              <h2 className='md:text-lg'>Relatório de depósitos</h2>
            </div>
            <div className="flex flex-1 w-full md:h-1/2 h-full">
              <div className="flex w-full h-full items-center">
                <DoughnutProgressChart />
              </div>
            </div>
            <div className="flex w-full pt-4 justify-between items-center">
              <h3>Valor total guardado:</h3>
              <h3>Valor final da meta:</h3>
            </div>
          </div>

          <div id='card-extrato-metas' className='flex flex-col w-1/2 h-full md:w-full md:h-1/2 bg-color-bgforms rounded-2xl p-8'>
            <div className="flex w-full mb-4">
              <h2 className='md:text-lg'>Últimos depósitos</h2>
            </div>
            <div className="flex flex-1 w-full">
              <TableGoals />
            </div>
            <div className="flex justify-end items-end">
              <button
                title='Adicionar saldo'
                className='flex text-center items-center bg-color-receipt p-2 rounded-2xl'
                onClick={handleOpenModalDepositGoals}
              >
                <FaPaperPlane />
                <p className='ml-2'>Adicionar saldo</p>
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
