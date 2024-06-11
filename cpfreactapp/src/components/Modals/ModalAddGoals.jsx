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
      <div className="md:h-3/4 md:w-3/4 lg:w-2/4 h-1/2 w-2/4 rounded-lg border-2 border-solid border-color-bginputs bg-color-bgforms p-8">
        <div className="title">
          <h2>Cadastro de Metas</h2>
        </div>
        <form className="my-2 flex w-full h-full">
          <div className="w-full mt-0 grid md:grid-cols-1 grid-cols-2 justify-center gap-4 ">
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
            <div className="md:-mt-12 w-full items-center justify-center whitespace-nowrap p-4">
              <InputLayout
                label="Data final da Meta:"
                name="finalGoalsDate"
                type="date"
                value={formState.finalGoalsDate}
                onChange={""}
              />
            </div>
            <div className="-mt-12 w-full items-center justify-center whitespace-nowrap p-4">
              <InputLayout
                label="Valor inicial da meta:"
                name="priceGoals"
                type="text"
                value={formState.priceInitial}
                placeholder="0,00"
                onChange={""}
              />
            </div>
            <div className="-mt-12 w-full items-center justify-center whitespace-nowrap p-4">
              <InputLayout
                label="Valor total da meta:"
                name="priceGoals"
                type="text"
                value={formState.priceGoals}
                placeholder="0,00"
                onChange={""}
              />
            </div>
            <div className="w-full md:h-full flex">
              <button
                type="submit"
                className="w-full h-1/2 sm:h-full cursor-pointer rounded-lg bg-color-bginputs" /* btn_submitCancel */
                onClick={() => onClose(false)}
              >
                Cancelar
              </button>
            </div>
            <div className="w-full md:h-full flex">
              <button
                type="submit"
                className="w-full h-1/2 sm:h-full cursor-pointer rounded-lg bg-color-bginputs" /* btn_submit */
                onClick={""}
              >
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div >
    </div >
  )
}
