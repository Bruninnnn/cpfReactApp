import React from 'react'
import { InputLayout } from '../../components/Input/InputLayout'
import { TableGoals } from '../../components/Table/TableGoals'
import { FaPaperPlane } from 'react-icons/fa'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'

export const GoalsDetails = () => {
  return (
    <div className="flex flex-col w-full h-full mx-4 sm:mt-16">
      <div className="flex flex-col w-full h-full justify-center ">
        <div className="flex w-full items-center ml-4 mb-4 sm:mt-12">
          <Link to={"/dashboard/goals"} className="p-4 hover:bg-color-border rounded-full">
            <IoMdArrowRoundBack />
          </Link>
          <h1>Detalhes da meta</h1>
        </div>
        <form className='flex w-full h-3/4 gap-4'>
          <div className='flex w-1/2 h-full bg-color-bgforms rounded-2xl p-8'>
            <div className="flex h-0 w-full mb-4">
              <h2>Relatório de depósitos</h2>
            </div>
          </div>

          <div className='flex flex-col w-1/2 h-full bg-color-bgforms rounded-2xl p-8'>
            <div className="flex w-full mb-4">
              <h2>Últimos depósitos</h2>
            </div>
            <div className="flex flex-1 w-full">
              <TableGoals />
            </div>
            <div className="flex justify-end items-end">
              <button className='flex text-center items-center bg-color-receipt p-2 rounded-2xl'>
                <FaPaperPlane />
                <p className='ml-2'>Adicionar saldo</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
