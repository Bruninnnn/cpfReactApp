import { format } from 'date-fns'
import React from 'react'
import { RxUpdate } from 'react-icons/rx'
import { IoMdTrash } from 'react-icons/io'

export const CardBankWallet = ({
  propCreatedDate,
  propUpdatedDate,
  propCreditCard,
  propLimitCreditCard,
  bankName,
  bankIcon,
  bankColor,
  propDeleteConnection,
  propUpdateConnection
}) => {
  const formattedCreatedDate = format(new Date(propCreatedDate), 'dd/MM/yyyy')
  const formattedUpdatedDate = format(new Date(propUpdatedDate), 'dd/MM/yyyy')

  return (
    <div className="mt-0 h-64 w-full items-center rounded-3xl border border-solid border-color-border bg-color-bgforms p-4">
      <div className="flex flex-row">
        <div className="flex h-full flex-1 items-center text-center">
          <div
            className="rounded-full text-center text-xl font-semibold"
            style={{ backgroundColor: bankColor }}
            id="imagem-card"
          >
            <img
              src={bankIcon}
              alt={`${bankName} logo`}
              className="bank-icon filter-custom-color h-10 w-10"
            />
          </div>
          <h3 className="ml-2 text-center text-2xl font-semibold">
            {bankName}
          </h3>
        </div>
      </div>
      <div className="mt-2.5 flex flex-row">
        <div className="flex flex-1">
          <h3 className="text-xs">Criado em: {formattedCreatedDate}</h3>
        </div>
        <div className="">
          <h3 className="text-xs">Atualizado em: {formattedUpdatedDate}</h3>
        </div>
      </div>

      <div className="h-1/3 sm:h-1/3 m-2xl:h-1/2">
        <div className="mt-2 flex flex-row">
          <div className="flex flex-1">
            <h3 className="text-base">Valor da fatura: </h3>
          </div>
          <h3 className="mt-0.5 text-base">
            {propCreditCard.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2
            })}
          </h3>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-1">
            <h3 className="mt-0.5 text-base">Limite disponível: </h3>
          </div>
          <h3 className="mt-0.5 text-base">
            {propLimitCreditCard.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2
            })}
          </h3>
        </div>
      </div>
      <div className="flex h-auto w-full justify-end">
        <button
          className="flex-initial rounded-full p-2 text-center text-2xl hover:bg-color-bginputs"
          title="Atualizar Conexão"
          onClick={propUpdateConnection}
        >
          <RxUpdate />
        </button>
        <button
          className="flex-initial rounded-full p-2 text-center text-2xl hover:bg-color-bginputs"
          title="Excluir Conexão"
          onClick={propDeleteConnection}
        >
          <IoMdTrash />
        </button>
      </div>
    </div>
  )
}
