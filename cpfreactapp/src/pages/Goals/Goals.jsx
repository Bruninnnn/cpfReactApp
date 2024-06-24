import React, { useState } from 'react'

import { CardAddGoals } from '../../components/Card/CardAddGoals'
import { CardGoals } from '../../components/Card/CardGoals'
import { ModalAddGoals } from '../../components/Modals/ModalAddGoals'
import { ModalPopUp } from '../../components/Modals/ModalPopUp'
import { ModalEditGoals } from '../../components/Modals/ModalEditGoals'

const Goals = () => {
  const [openModalAddGoals, setOpenModalAddGoals] = useState(false)
  const [openModalEditGoals, setOpenModalEditGoals] = useState(false)
  const [openModalPopUp, setOpenModalPopUp] = useState(false)
  const [goals, setGoals] = useState()

  const handleOpenAddGoals = (event) => {
    setOpenModalAddGoals(true)
  }

  const handleCloseAddGoalsModal = () => {
    setOpenModalAddGoals(false)
  }

  const handleOpenEditGoals = (event) => {
    setOpenModalEditGoals(true)
  }

  const handleCloseEditGoalsModal = () => {
    setOpenModalEditGoals(false)
  }

  const handleClosePopUp = () => {
    setOpenModalPopUp(false)
  }

  /* function calcularPorcentagem(x, valoresY) {
    const somaY = valoresY.reduce((acc, curr) => acc + curr, 0);
    const porcentagem = (somaY / x) * 100;
    return porcentagem.toFixed(2); // para arredondar para 2 casas decimais
  }

  const x = 500; // valor total da meta
  const valoresY = [50, 200]; // valores inseridos */

  useEffect(() => {}, [])

  const goalsA = [
    { title: 'Viagem' },
    { title: 'Exercícios' },
    { title: 'Aprender React' },
    { title: 'Aprender JAVA' },
    { title: 'Aprender Kotlin' }
  ]

  return (
    <div className="mx-4 flex h-full w-full sm:mt-16 sm:flex-col">
      <div className="grid w-full grid-cols-4 grid-rows-4 gap-8 sm:grid-rows-1 m-sm:grid-cols-1 m-md:grid-cols-2 m-xl:grid-cols-3 m-2xl:grid-cols-4">
        <CardAddGoals propOpenModal={handleOpenAddGoals} />
        {goalsA.map((goal, index) => (
          <CardGoals
            key={index}
            titleGoals={goal.title}
            percentGoals={'goal.calcularPorcentagem'}
            onOpen={handleOpenEditGoals}
          />
        ))}
      </div>
      {openModalAddGoals && (
        <ModalAddGoals onClose={handleCloseAddGoalsModal} />
      )}
      {openModalEditGoals && (
        <ModalEditGoals onClose={handleCloseEditGoalsModal} />
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
