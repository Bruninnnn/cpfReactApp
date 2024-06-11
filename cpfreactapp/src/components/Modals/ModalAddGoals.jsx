import React, { useState } from 'react'
import { InputLayout } from '../Input/InputLayout'
import { InputValue } from '../Input/InputValue'

export const ModalAddGoals = ({ onClose }) => {
  const [formState, setFormState] = useState({
    title: '',
    goalValue: '',
    initialDate: '',
    finalDate: ''
  })

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handlePriceChange = (values) => {
    const { value } = values
    setFormState({
      ...formState,
      goalValue: value
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const formattedGoalValue = parseFloat(
        formState.goalValue.replace(/\./g, '').replace(',', '.')
      )
      const updatedFormState = { ...formState, goalValue: formattedGoalValue }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFormState)
      }

      const response = await fetch(`http://${IP}:8080/goal/create`, options)
      const data = await response.json()
      console.log('Resposta do servidor:', data)
      return data
    } catch (error) {
      console.error('Erro na solicitação:', error)
      throw error
    }
  }

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-modal-background">
      <div className="h-1/2 w-1/4 rounded-lg border-2 border-solid border-color-bginputs bg-color-bgforms p-8">
        <div className="title">
          <h2>Cadastro de Metas</h2>
        </div>
        <form
          className="my-4 flex h-full w-full items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="mt-0 grid grid-cols-2 justify-center gap-4">
            <div className="w-full items-center justify-center whitespace-nowrap p-4">
              <InputLayout
                label="Nome da Meta:"
                name="title"
                type="text"
                value={formState.title}
                placeholder="Ex: Viagem Argentina"
                onChange={handleChange}
              />
            </div>
            <div className="w-full items-center justify-center whitespace-nowrap p-4">
              <InputValue
                label="Valor da meta:"
                name="goalValue"
                value={formState.goalValue}
                placeholder="R$ 0,00"
                onValueChange={handlePriceChange}
              />
            </div>
            <div className="-mt-12 w-full items-center justify-center whitespace-nowrap p-4">
              <InputLayout
                label="Data inicial da meta:"
                name="initialDate"
                type="date"
                value={formState.initialDate}
                onChange={handleChange}
              />
            </div>
            <div className="-mt-12 w-full items-center justify-center whitespace-nowrap p-4">
              <InputLayout
                label="Data final da meta:"
                name="finalDate"
                type="date"
                value={formState.finalDate}
                onChange={handleChange}
              />
            </div>
            <button
              type="button"
              className="m-0 my-0 -mt-4 mb-12 h-1/2 w-full cursor-pointer rounded-lg bg-color-bginputs p-2"
              onClick={() => onClose(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="m-0 my-0 -mt-4 mb-12 h-1/2 w-full cursor-pointer rounded-lg bg-color-bginputs p-2"
              onSubmit={() => handleSubmit()}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
