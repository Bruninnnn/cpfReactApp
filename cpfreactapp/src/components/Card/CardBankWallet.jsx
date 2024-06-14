import React, { useState } from 'react'

import { MdMoneyOff, MdOutlineCreditCard, MdOutlineToll } from 'react-icons/md'
import { SiNubank } from 'react-icons/si'
import { SlOptionsVertical } from 'react-icons/sl'
import { ModalPopUp } from '../Modals/ModalPopUp'

export const CardBankWallet = ({ id, propCreatedDate, propUpdatedDate, propCreditCard, propLimitCreditCard, bankName, propTitle, propTypeValue, propOnClick }) => {
  const [openModalPopUp, setOpenModalPopUp] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const propIcon = {
    1: {
      icon: <SiNubank style={{ fontSize: '2.5rem' }} className="bg-color-nubank justify-center text-center p-2 rounded-full" />
    },
    2: {
      icon: <MdOutlineToll style={{ fontSize: '2.5rem' }} className="bg-color-bginputs justify-center text-center p-1.5 mb-2 rounded-full" />
    },
    3: {
      icon: <MdMoneyOff style={{ fontSize: '2.5rem' }} className="bg-color-cost justify-center text-center p-1.5 mb-2 rounded-full" />
    },
    4: {
      icon: <MdOutlineCreditCard style={{ fontSize: '2.5rem' }} className="bg-color-cost justify-center text-center p-1.5 mb-2 rounded-full" />
    },
  }

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
    <div className="w-full h-full items-center p-4 mt-0 border border-solid bg-color-bgforms border-color-border rounded-3xl"> {/* balance */}
      <div className="flex flex-row">
        <div className="flex flex-1 items-center">
          {propIcon[id].icon}
          <h3 className='pl-2 text-[1.5rem] font-semibold'>{bankName}</h3>
        </div>
        <button onClick={handleButtonClick} className='p-4 text-center hover:bg-color-border rounded-full'>
          <SlOptionsVertical />
        </button>
      </div>
      <div className="flex flex-row h-2/5 2xl:h-1/4">
        <div className="flex flex-1">
          <h3 className="text-[0.75rem] mt-2">Criado em: {propCreatedDate}</h3>
        </div>
        <div className="">
          <h3 className="text-[0.75rem] mt-2">Atualizado em: {propUpdatedDate}</h3>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-[1rem] mt-0.5">Valor da fatura: {propCreditCard}</h3>
        <h3 className="text-[1rem] mt-0.5 mb-4">Limite disponível: {propLimitCreditCard}</h3>
        <h1>{propTypeValue}</h1>
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
