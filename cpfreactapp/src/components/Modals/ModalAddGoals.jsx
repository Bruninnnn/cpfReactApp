import React, { useState } from 'react'
import { InputLayout } from '../Input/InputLayout'

export const ModalAddGoals = ({ onClose }) => {

  const [formState, setFormState] = useState({
    titleGoals: '',
    amountGoals: '',
    category: '',
    type: ''
  })


  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-modal-background">
      <div className="h-1/2 w-1/4 rounded-lg border-2 border-solid border-color-bginputs bg-color-bgforms p-8">
        <div className="title">
          <h2>Cadastro de Metas</h2>
        </div>
        <form className="my-6 flex w-full items-center justify-center">
          <div className="mt-2 grid grid-cols-2 justify-center gap-5">
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
                name="amountGoals"
                type="text"
                value={formState.amountGoals}
                placeholder="0,00"
                onChange={""}
              />
            </div>
            {/*             <div className="-mt-12 w-full items-center justify-center whitespace-nowrap p-4">
            <SelectLayout
              label="Categoria:"
              name="category"
              id="regGroupType"
              value={category}
              onChange={handleChange}
              options={categoryOptions}
            />
          </div>
          <div className="-mt-12 w-full items-center justify-center whitespace-nowrap p-4">
            <SelectLayout
              label="Tipo:"
              name="type"
              id="type"
              value={type}
              onChange={handleChange}
              options={typeOptions}
            />
          </div> */}
            <button
              type="submit"
              className="m-0 my-4 h-1/2 w-full cursor-pointer rounded-lg bg-color-bginputs p-2" /* btn_submitCancel */
              onClick={() => onClose(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="m-0 my-4 h-1/2 w-full cursor-pointer rounded-lg bg-color-bginputs p-2" /* btn_submit */
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
