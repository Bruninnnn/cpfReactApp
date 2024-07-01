import React, { useState } from 'react'

import { RxUpdate } from "react-icons/rx";
import { IoMdTrash } from 'react-icons/io'

export const CardBankWallet = ({ propCreatedDate, propUpdatedDate, propCreditCard, propLimitCreditCard, bankName, bankIcon, bankColor, propDeleteConnection, propUpdateConnection }) => {
  return (
    <div className="w-full h-64 items-center p-4 mt-0 border border-solid bg-color-bgforms border-color-border rounded-3xl">
      <div className="flex flex-row">
        <div className="flex h-full flex-1 items-center text-center">
          <div className="text-xl font-semibold text-center rounded-full" style={{ backgroundColor: bankColor }} id='imagem-card'>
            <img src={bankIcon} alt={`${bankName} logo`} className="bank-icon w-10 h-10 filter-custom-color" />
          </div>
          <h3 className="text-2xl font-semibold text-center ml-2">{bankName}</h3>
        </div>
      </div>
      <div className="flex flex-row mt-2.5">
        <div className="flex flex-1">
          <h3 className="text-xs">Criado em: {propCreatedDate}</h3>
        </div>
        <div className="">
          <h3 className="text-xs">Atualizado em: {propUpdatedDate}</h3>
        </div>
      </div>

      <div className="h-1/3 sm:h-1/3 m-2xl:h-1/2">
        <div className="flex flex-row mt-2">
          <div className="flex flex-1">
            <h3 className="text-base">Valor da fatura: </h3>
          </div>
          <h3 className="text-base mt-0.5">{propCreditCard}</h3>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-1">
            <h3 className="text-base mt-0.5">Limite disponível: </h3>
          </div>
          <h3 className="text-base mt-0.5">{propLimitCreditCard}</h3>
        </div>
      </div>
      <div className="flex w-full h-auto justify-end">
        <button
          className='flex-initial text-2xl text-center hover:bg-color-bginputs p-2 rounded-full' title='Atualizar Conexão'
          onClick={propUpdateConnection}
        >
          <RxUpdate />
        </button>
        <button
          className='flex-initial text-2xl text-center hover:bg-color-bginputs p-2 rounded-full' title='Excluir Conexão'
          onClick={propDeleteConnection}
        >
          <IoMdTrash />
        </button>
      </div>
    </div>
  )
}
