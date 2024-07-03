import React, { useState } from 'react'

import { MdClose } from 'react-icons/md'
import { InputValue } from '../Input/InputValue'
import { format } from 'date-fns'

export const ModalAddDepositGoals = ({ onClose, idGoals }) => {
  const [formState, setFormState] = useState({
    dataRegister: '',
    goalValue: '',
    idGoals: '',
  })

  const handlePriceChange = (values) => {
    const { value } = values
    setFormState({
      ...formState,
      goalValue: value
    })
  }

  async function sendRequest() {
    try {
      const currentDate = new Date()
      const formattedDate = format(currentDate, 'yyyy-MM-dd')
      const idString = idGoals.join(',');

      const deposit = {
        dataRegister: formattedDate,
        goalValue: formState.goalValue,
        idGoals: idString
      }

      console.log(deposit)

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(deposit)
      }

      const response = await fetch(
        `http://${IP}:8080/goal-register/create`,
        options
      )
      const data = await response.json()
      console.log('Resposta do servidor:', data)
      return data
    } catch (error) {
      console.error('Erro na solicitação:', error)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    await sendRequest();
  }

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-modal-background">
      <div className="h-1/3 w-2/4 rounded-lg border-2 border-solid border-color-bginputs bg-color-bgforms p-8">
        <div className="flex items-center">
          <h2 className="flex flex-1">Adicionar saldo</h2>
          <div
            className="flex cursor-pointer justify-end rounded-full p-4 hover:bg-color-border"
            onClick={() => onClose(false)}
          >
            <MdClose />
          </div>
        </div>
        <form className="my-0 flex h-full w-full flex-col" onSubmit={''}>
          <div className="mt-0 flex w-full justify-center gap-4">
            <div className="w-full items-center justify-center whitespace-nowrap p-4">
              <InputValue
                label="Valor do Depósito:"
                name="goalValue"
                type="text"
                value={formState.goalValue}
                placeholder="R$ 0,00"
                onValueChange={handlePriceChange}
              />
            </div>
          </div>
          <div className="mt-4 flex h-1/4 w-full">
            <button
              type="submit"
              className="h-1/2 w-full cursor-pointer rounded-lg bg-color-bginputs sm:h-1/3"
              onClick={handleSubmit}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
