import React, { useState } from 'react'

import { CardAddGoals } from '../../components/Card/CardAddGoals'
import { CardGoals } from '../../components/Card/CardGoals'
import { ModalAddGoals } from '../../components/Modals/ModalAddGoals';
import { ModalPopUp } from '../../components/Modals/ModalPopUp';

const Goals = () => {
  const [openModalAddGoals, setOpenModalAddGoals] = useState(false);
  const [openModalPopUp, setOpenModalPopUp] = useState(false);

  const handleOpenAddGoals = (event) => {
    setOpenModalAddGoals(true);
  };

  const handleCloseAddGoalsModal = () => {
    setOpenModalAddGoals(false);
  };

  const handleClosePopUp = () => {
    setOpenModalPopUp(false);
  };

  return (
    <div className="flex w-full h-full mx-4 sm:mt-16">
      <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-8 m-sm:grid-cols-1 m-md:grid-cols-2 m-xl:grid-cols-3 m-2xl:grid-cols-4">
        <CardAddGoals propOpenModal={handleOpenAddGoals} />
        <CardGoals titleGoals={"Viagem"} />
      </div>
      {openModalAddGoals && (
        <ModalAddGoals
          onClose={handleCloseAddGoalsModal}
        />
      )}
      {openModalPopUp && (
        <div style={{ position: 'absolute', top: buttonPosition.y, left: buttonPosition.x }}>
          <ModalPopUp
            onClose={handleClosePopUp}
          />
        </div>
      )}
    </div>
  )
}

export default Goals