import React, { useState } from 'react'
import { ProgressBar } from '../ProgressBar'
import { SlOptionsVertical } from 'react-icons/sl'
import { ModalPopUp } from '../Modals/ModalPopUp';
import { MdFormatListBulleted, MdModeEdit } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { RiPlaneFill } from 'react-icons/ri';

export const CardGoals = ({ titleGoals, createdGoalsDate, finalGoalsDate, priceInitial, priceGoals, propOnClick }) => {
  const [openModalPopUp, setOpenModalPopUp] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const handleButtonClick = (event) => {
    // Obtém a posição do botão clicado
    const buttonRect = event.target.getBoundingClientRect();
    setButtonPosition({ x: buttonRect.x, y: buttonRect.y + buttonRect.height });
    // Exibe o componente
    setOpenModalPopUp(true);
  };

  const handleCloseModal = () => {
    setOpenModalPopUp(false);
  };


  return (
    <div className="m-xl:w-80 m-2xl:w-full xl:h-full h-full m-lg:w-80 items-center p-4 mt-0 border border-solid bg-color-bgforms border-color-border rounded-3xl"> {/* balance */}
      <div className="flex flex-row">
        <div className="flex flex-1 items-center text-center">
          <h3 className="text-xl font-semibold text-center rounded-full bg-color-receipt p-2"><RiPlaneFill /></h3>
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
      <ProgressBar priceInitial={""} priceGoals={""} />
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
          <MdFormatListBulleted />
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
