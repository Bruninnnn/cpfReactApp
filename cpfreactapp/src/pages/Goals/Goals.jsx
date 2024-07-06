import React, { useContext, useEffect, useState } from 'react'
import { CardAddGoals } from '../../components/Card/CardAddGoals'
import { CardGoals } from '../../components/Card/CardGoals'
import { ModalAddGoals } from '../../components/Modals/ModalAddGoals'
import { ModalEditGoals } from '../../components/Modals/ModalEditGoals'
import { format } from 'date-fns'
import { IP } from '../../env'
import { Context } from '../../Context'
import { Bounce, toast } from 'react-toastify'

const Goals = () => {
  const { userContext } = useContext(Context)
  const [openModalAddGoals, setOpenModalAddGoals] = useState(false)
  const [openModalEditGoals, setOpenModalEditGoals] = useState(false)
  const [goals, setGoals] = useState([])
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [goalsDetailsDeleted, setGoalsDetailsDeleted] = useState(false);

  const getGoals = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }

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

  const handleOpenEditGoals = async (goal) => {
    const goalsDetailsDeleted = await checkGoalsDetailsDeleted(goal.id)

    if (goalsDetailsDeleted === true) {
      setSelectedGoal(goal)
      setOpenModalEditGoals(true)
    } else {
      toast.error('Não foi possível editar, pois há dados dentro da meta!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        style: { background: '#131316' },
        transition: Bounce
      })
    }
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

  const handleDeleteGoals = async (goalId) => {
    try {
      const goalsDetailsDeleted = await checkGoalsDetailsDeleted(goalId);

      if (goalsDetailsDeleted === true) {
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }

        const userId = userContext.id
        const response = await fetch(
          `http://${IP}:8080/goal/delete/${goalId}?userId=${userId}`,
          options
        )
        if (response.ok) {
          await getGoals()
        }
        toast.warn('Meta excluída com sucesso!', {
          position: 'bottom-right',
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          style: { background: '#131316' },
          transition: Bounce
        })
      } else {
        toast.error('Não foi possível excluir, pois há dados dentro da meta!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          style: { background: '#131316' },
          transition: Bounce
        })
      }
    } catch (err) {
      console.error('Erro ao deletar a meta:', err)
    }
  }

  const checkGoalsDetailsDeleted = async (goalId) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const response = await fetch(
        `http://${IP}:8080/goal-register/goals/${goalId}`,
        options
      )

      const goalsData = await response.json()
      console.log(goalsData)

      if (goalsData && goalsData.length > 0) {
        return false;
      } else {
        console.log('Dados do GoalsDetails foram excluídos com sucesso.');

        setGoalsDetailsDeleted(true);

        return true;
      }
    } catch (error) {
      console.error('Erro ao verificar a exclusão do GoalsDetails:', error);
      return false;
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy')
  }

  return (
    <div className="mx-4 flex w-full h-full sm:mt-16 sm:flex-col">
      <div className="grid w-full grid-cols-4 grid-rows-4 gap-8 sm:grid-rows-1 m-sm:grid-cols-1 m-md:grid-cols-2 m-xl:grid-cols-3 m-2xl:grid-cols-4">
        <CardAddGoals propOpenModal={handleOpenAddGoals} />
        {Array.isArray(goals) &&
          goals.map((goal, index) => (
            <CardGoals
              key={index}
              goalId={goal.id}
              titleGoals={goal.title}
              createdGoalsDate={formatDate(goal.initialDate)}
              finalGoalsDate={formatDate(goal.finalDate)}
              targetValue={goal.targetValue}
              value={goal.goalValue}
              onOpen={() => handleOpenEditGoals(goal)}
              handleDeleteGoals={() => handleDeleteGoals(goal.id)}
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
