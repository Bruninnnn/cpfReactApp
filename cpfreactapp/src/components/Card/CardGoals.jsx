import React, { useState } from 'react'
import { ProgressBar } from '../ProgressBar'
import { SlOptionsVertical } from 'react-icons/sl'
import { ModalPopUp } from '../Modals/ModalPopUp';
import { MdFormatListBulleted, MdModeEdit } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { RiPlaneFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export const CardGoals = ({ titleGoals, createdGoalsDate, finalGoalsDate, priceInitial, priceGoals, percentGoals }) => {
  const [openModalPopUp, setOpenModalPopUp] = useState(false)

  const handleCloseModal = () => {
    setOpenModalPopUp(false);
  };

  return (
    <div className="w-full h-48 items-center p-4 mt-0 border border-solid bg-color-bgforms border-color-border rounded-3xl">
      <div className="flex flex-row">
        <div className="flex h-full flex-1 items-center text-center">
          <div className="text-xl font-semibold text-center rounded-full bg-color-receipt p-2" id='imagem-card'>
            <RiPlaneFill />
          </div>
          <h3 className="text-2xl font-semibold text-center ml-2">{titleGoals}</h3>
        </div>
      </div>
      <div className="flex flex-row mt-2.5">
        <div className="flex flex-1">
          <h3 className='text-sm'>Criado em: {createdGoalsDate}</h3>
        </div>
        <div className="flex">
          <h3 className='text-sm'>Expira em: {finalGoalsDate}</h3>
        </div>
      </div>
      <ProgressBar priceInitial={""} priceGoals={""} percentGoals={""} />
      <div className="flex justify-center">
        <button
          className='flex-initial text-2xl text-center hover:bg-color-bginputs p-2 rounded-full' title='Editar Metas'
          onClick={""}
        >
          <MdModeEdit />
        </button>
        <button
          className='flex-initial text-2xl text-center hover:bg-color-bginputs p-2 rounded-full' title='Excluir Metas'
          onClick={""}
        >
          <IoMdTrash />
        </button>
        <button
          className='flex-initial text-2xl text-center hover:bg-color-bginputs p-2 rounded-full' title='Detalhes Metas'
          onClick={""}
        >
          <Link to="/dashboard/goals/details" className="flex items-center px-0 font-light">
            <MdFormatListBulleted />
          </Link>
        </button>
      </div>
      {openModalPopUp && (
        <div style={{ position: 'absolute', top: buttonPosition.y, left: buttonPosition.x }}>
          <ModalPopUp
            onClose={handleCloseModal}
          />
        </div>
      )}
    </div>
  )
}
