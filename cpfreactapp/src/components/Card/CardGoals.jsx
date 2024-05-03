import React, { useState } from 'react'
import { ProgressBar } from '../ProgressBar'
import { SlOptionsVertical } from 'react-icons/sl'
import { ModalPopUp } from '../Modals/ModalPopUp';

export const CardGoals = ({ titleGoals, propOnClick }) => {
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
    <div className="m-xl:w-80 m-2xl:w-full h-3/4 m-lg:w-80 items-center p-4 mt-0 border border-solid bg-color-bgforms border-color-border rounded-3xl"> {/* balance */}
      <div className="flex flex-row -mt-2">
        <div className="flex flex-1 items-center">
          <h3 className="text-[1.5rem] font-semibold">{titleGoals}</h3>
        </div>
        <button onClick={handleButtonClick} className='p-4 text-center hover:bg-color-border rounded-full'>
          <SlOptionsVertical />
        </button>
      </div>
      <div className="flex flex-1 h-2/5 2xl:h-1/4">
        <span className=''>Criado em: 01/05/2024</span>
      </div>
      <ProgressBar priceInitial={""} priceGoals={""} />

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
