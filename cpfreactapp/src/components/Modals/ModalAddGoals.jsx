import React, { useState } from 'react'
import { InputLayout } from '../Input/InputLayout'

export const ModalAddGoals = ({ onClose }) => {

  const [formState, setFormState] = useState({
    titleGoals: '',
    amountGoals: '',
    finalGoalsDate: '',
    type: ''
  })


  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-modal-background">
      <div className="h-1/2 w-1/4 rounded-lg border-2 border-solid border-color-bginputs bg-color-bgforms p-8">
        <div className="title">
          <h2>Cadastro de Metas</h2>
        </div>
        <form className="my-4 flex w-full h-full items-center justify-center">
          <div className="mt-0 grid grid-cols-2 justify-center gap-4">
            <div className="w-full items-center justify-center whitespace-nowrap p-4">
              <InputLayout
                label="Nome da Meta:"
                name="titleGoals"
                type="text"
                value={formState.titleGoals}
                placeholder="Ex.: Viagem Argentina"
                onChange={""}
              />
            </div>
            <div className="w-full items-center justify-center whitespace-nowrap p-4">
              <InputLayout
                label="Valor da meta:"
                name="priceGoals"
                type="text"
                value={formState.priceGoals}
                placeholder="0,00"
                onChange={""}
              />
            </div>
            <div className="-mt-12 w-full items-center justify-center whitespace-nowrap p-4">
              <InputLayout
                label="Data final da Meta:"
                name="finalGoalsDate"
                type="date"
                value={formState.finalGoalsDate}
                placeholder="0,00"
                onChange={""}
              />
            </div>
            <div className="-mt-12 w-full items-center justify-center whitespace-nowrap p-4">
              <InputLayout
                label="Data final da Meta:"
                name="finalGoalsDate"
                type="date"
                value={formState.finalGoalsDate}
                placeholder="0,00"
                onChange={""}
              />
            </div>
            <button
              type="submit"
              className="m-0 my-0 -mt-4 mb-12 h-1/2 w-full cursor-pointer rounded-lg bg-color-bginputs p-2" /* btn_submitCancel */
              onClick={() => onClose(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="m-0 my-0 -mt-4 mb-12 h-1/2 w-full cursor-pointer rounded-lg bg-color-bginputs p-2" /* btn_submit */
              onClick={""}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div >
    </div >
  )
}
