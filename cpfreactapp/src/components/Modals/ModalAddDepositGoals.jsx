import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { InputValue } from '../Input/InputValue'
import { format } from 'date-fns'
import { IP } from '../../env.js'
import { toast } from 'react-toastify'

export const ModalAddDepositGoals = ({
  onClose,
  goal,
  setRegisters,
  setSuccess
}) => {
  const [formState, setFormState] = useState({
    date: '',
    value: '',
    goal
  })

  const handlePriceChange = (values) => {
    const { value } = values
    setFormState({
      ...formState,
      value: value
    })
  }

  async function sendRequest() {
    try {
      const formattedDate = format(new Date(), 'yyyy-MM-dd')

      const deposit = {
        date: formattedDate,
        value: formState.value,
        goal: goal
      }

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
      toast.success('Depósito realizado com sucesso!', {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        style: { background: '#131316' }
      })
      await setRegisters(data)
      await setSuccess(true)
      onClose(false)
    } catch (error) {
      toast.error('Algo não correu como esperado, tente novamente!', {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        style: { background: '#131316' }
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await sendRequest()
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
        <form
          className="my-0 flex h-full w-full flex-col"
          onSubmit={handleSubmit}
        >
          <div className="mt-0 flex w-full justify-center gap-4">
            <div className="w-full items-center justify-center whitespace-nowrap p-4">
              <InputValue
                label="Valor do Depósito:"
                name="value"
                type="text"
                value={formState.value}
                placeholder="R$ 0,00"
                onValueChange={handlePriceChange}
              />
            </div>
          </div>
          <div className="mt-4 flex h-1/4 w-full">
            <button
              type="submit"
              className="h-1/2 w-full cursor-pointer rounded-lg bg-color-bginputs sm:h-1/3"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
