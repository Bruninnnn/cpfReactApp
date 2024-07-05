import React, { useEffect, useState } from 'react'

import { FaPaperPlane } from 'react-icons/fa'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import { DoughnutProgressChart } from '../../components/Charts/DoughnutProgressChart'
import { ModalAddDepositGoals } from '../../components/Modals/ModalAddDepositGoals'
import { TableGoals } from '../../components/Table/TableGoals'
import { IP } from '../../env'
import { toast } from 'react-toastify'

export const GoalsDetails = () => {
  const { id } = useParams()
  const [goal, setGoal] = useState({})
  const [openModalDepositGoals, setOpenModalDepositGoals] = useState(false)
  const [success, setSuccess] = useState(false)
  const [registers, setRegisters] = useState([])
  const [percent, setPercent] = useState()
  const [monthlySavings, setMonthlySavings] = useState(0)

  const [goalsDetails, setGoalsDetails] = useState({
    goalId: '',
    targetValue: '',
    value: '',
    percentGoals: ''
  })

  const calculateMonthsBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const yearsDiff = end.getFullYear() - start.getFullYear()
    const monthsDiff = end.getMonth() - start.getMonth()
    return yearsDiff * 12 + monthsDiff + 1 // Adicione 1 para incluir o mês inicial
  }

  const calculateMonthlySavings = (targetValue, months) => {
    return (targetValue / months).toFixed(2)
  }

  const calculateAndSetMonthlySavings = (goalData) => {
    const months = calculateMonthsBetweenDates(goalData.initialDate, goalData.finalDate)
    const monthlySavings = calculateMonthlySavings(goalData.targetValue, months)
    setMonthlySavings(monthlySavings)
  }

  async function getRegisters() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const response = await fetch(
        `http://${IP}:8080/goal-register/goals/${id}`,
        options
      )
      const data = await response.json()
      setRegisters(data || [])
    } catch (error) {
      setRegisters([])
    }
  }

  useEffect(() => {
    const fetchRegisters = async () => {
      await getRegisters()
    }
    fetchRegisters()
  }, [id])

  useEffect(() => {
    const fetchGoalDetails = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }

        const response = await fetch(`http://${IP}:8080/goal/${id}`, options)
        const goalData = await response.json()

        if (goalData) {
          const id = goalData?.id
          const targetValue = goalData?.targetValue
          const goalValue = goalData?.goalValue
          const balance = targetValue - goalValue
          const percentGoals = ((goalValue / targetValue) * 100).toFixed(0)
          setPercent(percentGoals)

          setGoal({
            id: goalData?.id,
            title: goalData?.title,
            targetValue: goalData?.targetValue,
            goalValue: goalData?.goalValue,

            user: goalData?.user
          })

          const newGoalData = {
            id,
            targetValue: targetValue.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2
            }),
            value: goalValue.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2
            }),
            balance: balance.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2
            }),
            percentGoals: percentGoals
          }
          setGoalsDetails(newGoalData)
          calculateAndSetMonthlySavings(goalData)
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes da meta:', error)
      }
    }

    fetchGoalDetails()
    setSuccess(false)
  }, [id, success])

  const handleOpenModalDepositGoals = () => {
    setOpenModalDepositGoals(true)
  }

  const handleCloseModalDepositGoals = () => {
    setOpenModalDepositGoals(false)
  }

  const handleDeleteRow = async (registerId) => {
    try {
      const response = await fetch(
        `http://${IP}:8080/goal-register/delete/${id}/${registerId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response) {
        const updatedRegisters = await response.json()
        setRegisters(updatedRegisters || [])
        setSuccess(true)
        toast.warn('Registro deletado com sucesso!', {
          position: 'bottom-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          style: { background: '#131316' }
        })
      }
    } catch (error) {
      console.error('Erro ao deletar registro:', error)
    }
  }

  return (
    <div className="mx-4 flex h-full w-full flex-col">
      <div className="flex h-full w-full flex-col justify-center sm:justify-normal xl:mt-4">
        <div className="flex w-full mb-2 ml-4 items-center sm:mb-2 sm:mt-4 ">
          <Link
            to={'/dashboard/goals'}
            className="rounded-full p-4 hover:bg-color-border"
          >
            <IoMdArrowRoundBack />
          </Link>
          <h1 className='xl:text-2xl'>Detalhes da meta</h1>
        </div>
        <div className="flex h-3/4 w-full gap-4 xl:flex-col xl:h-full">
          <div
            id="card-relatório-metas"
            className="flex h-full w-1/2 flex-col rounded-2xl bg-color-bgforms p-8 xl:h-1/2 xl:w-full"
          >
            <div className="mb-4 flex w-full">
              <h2 className="lg:text-lg">Relatório de depósitos</h2>
            </div>
            <div className="flex w-full h-4/5 flex-1 xl:h-1/2">
              <div className="flex w-full h-full items-center">
                {percent && (
                  <DoughnutProgressChart percentGoals={percent || 0} />
                )}
              </div>
            </div>
            <div className="flex w-full items-center justify-between pt-4">
              <h3 className='flex text-base xl:text-xs'>Valor da meta: <h3 className='flex text-base font-semibold ml-2 xl:text-xs'>{goalsDetails.targetValue}</h3></h3>
              <h3 className='flex text-base xl:text-xs'>Valor guardado: <h3 className='flex text-base font-semibold ml-2 xl:text-xs'>{goalsDetails.value}</h3></h3>
              <h3 className='flex text-base xl:text-xs'>Valor restante: <h3 className='flex text-base font-semibold ml-2 xl:text-xs'>{goalsDetails.balance}</h3></h3>
            </div>
          </div>
          <div
            id="card-extrato-metas"
            className="flex h-full w-1/2 flex-col rounded-2xl bg-color-bgforms p-8 xl:h-1/2 xl:w-full xl:mb-4"
          >
            <div className="mb-4 flex w-full">
              <h2 className="lg:text-lg">Últimos depósitos</h2>
            </div>
            <div className="flex w-full flex-1">
              <TableGoals rows={registers} onDeleteRow={handleDeleteRow} />
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center justify-start pt-4">
                <h3 className='flex text-base xl:text-xs'>Valor mensal recomendado:
                  <h3 className='flex text-base font-semibold ml-2 xl:text-xs'>
                    {Number(monthlySavings).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 2
                    })}
                  </h3>
                </h3>
              </div>
              <div className="flex items-end justify-end -mb-4">
                <button
                  title="Adicionar saldo"
                  className="flex items-center rounded-full bg-color-receipt p-2 text-center"
                  onClick={handleOpenModalDepositGoals}
                >
                  <FaPaperPlane />
                  <p className="ml-2 xl:hidden xl:ml-0">Adicionar saldo</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModalDepositGoals && (
        <ModalAddDepositGoals
          onClose={handleCloseModalDepositGoals}
          goal={goal}
          setRegisters={(value) => setRegisters(value)}
          setSuccess={(value) => setSuccess(value)}
        />
      )}
    </div>
  )
}
