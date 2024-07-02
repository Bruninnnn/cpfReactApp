import React, { useContext, useEffect, useState } from 'react'
import { CardAddGoals } from '../../components/Card/CardAddGoals'
import { CardGoals } from '../../components/Card/CardGoals'
import { ModalAddGoals } from '../../components/Modals/ModalAddGoals'
import { ModalEditGoals } from '../../components/Modals/ModalEditGoals'
import { format } from 'date-fns'
import { IP } from '../../env'
import { Context } from '../../Context'

const Goals = () => {
  const { userContext } = useContext(Context)
  const [openModalAddGoals, setOpenModalAddGoals] = useState(false)
  const [openModalEditGoals, setOpenModalEditGoals] = useState(false)
  const [goals, setGoals] = useState([])
  const [selectedGoal, setSelectedGoal] = useState(null)

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const getGoals = async () => {
    try {
      const userId = userContext.id
      const response = await fetch(
        `http://${IP}:8080/goal/goals/${userId}`,
        options
      )

      const goalsData = await response.json()

      if (Array.isArray(goalsData)) {
        setGoals(goalsData)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getGoals()
  }, [])

  const handleOpenAddGoals = () => {
    setOpenModalAddGoals(true)
  }

  const handleCloseAddGoalsModal = () => {
    setOpenModalAddGoals(false)
  }

  const handleOpenEditGoals = (goal) => {
    setSelectedGoal(goal)
    setOpenModalEditGoals(true)
  }

  const handleCloseEditGoalsModal = () => {
    setOpenModalEditGoals(false)
    setSelectedGoal(null)
  }

  const handleUpdateGoals = async () => {
    await getGoals()
    setOpenModalEditGoals(false)
    setSelectedGoal(null)
  }

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy')
  }

  return (
    <div className="mx-4 flex h-full w-full sm:mt-16 sm:flex-col">
      <div className="grid w-full grid-cols-4 grid-rows-4 gap-8 sm:grid-rows-1 m-sm:grid-cols-1 m-md:grid-cols-2 m-xl:grid-cols-3 m-2xl:grid-cols-4">
        <CardAddGoals propOpenModal={handleOpenAddGoals} />
        {Array.isArray(goals) &&
          goals.map((goal, index) => (
            <CardGoals
              key={index}
              titleGoals={goal.title}
              createdGoalsDate={formatDate(goal.initialDate)}
              finalGoalsDate={formatDate(goal.finalDate)}
              targetValue={goal.targetValue}
              value={goal.value}
              percentGoals={'goal.calcularPorcentagem'}
              onOpen={() => handleOpenEditGoals(goal)}
            />
          ))}
      </div>
      {openModalAddGoals && (
        <ModalAddGoals
          onClose={handleCloseAddGoalsModal}
          setGoals={(value) => setGoals(value)}
        />
      )}
      {openModalEditGoals && selectedGoal && (
        <ModalEditGoals
          onClose={handleCloseEditGoalsModal}
          id={selectedGoal.id}
          goalValue={selectedGoal.targetValue}
          setGoals={handleUpdateGoals}
        />
      )}
    </div>
  )
}

export default Goals
