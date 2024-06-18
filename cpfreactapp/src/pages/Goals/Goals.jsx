import React, { useState } from 'react'

import { CardAddGoals } from '../../components/Card/CardAddGoals'
import { CardGoals } from '../../components/Card/CardGoals'
import { ModalAddGoals } from '../../components/Modals/ModalAddGoals'
import { ModalPopUp } from '../../components/Modals/ModalPopUp'

const Goals = () => {
  const [openModalAddGoals, setOpenModalAddGoals] = useState(false)
  const [openModalPopUp, setOpenModalPopUp] = useState(false)

  const handleOpenAddGoals = (event) => {
    setOpenModalAddGoals(true)
  }

  const handleCloseAddGoalsModal = () => {
    setOpenModalAddGoals(false)
  }

  const handleClosePopUp = () => {
    setOpenModalPopUp(false)
  }

  const goals = [
    { title: 'Viagem' },
    { title: 'Exercícios' },
    { title: 'Aprender React' },
    { title: 'Aprender JAVA' },
    { title: 'Aprender Kotlin' }
  ]

  return (
    <div className="mx-4 flex h-full w-full sm:mt-16">
      <div className="grid h-full w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <CardAddGoals propOpenModal={handleOpenAddGoals} />
        {goals.map((goal, index) => (
          <CardGoals key={index} titleGoals={goal.title} />
        ))}
      </div>
      {openModalAddGoals && (
        <ModalAddGoals onClose={handleCloseAddGoalsModal} />
      )}
      {openModalPopUp && (
        <div
          style={{
            position: 'absolute',
            top: buttonPosition.y,
            left: buttonPosition.x
          }}
        >
          <ModalPopUp onClose={handleClosePopUp} />
        </div>
      )}
    </div>
  )
}

export default Goals
