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
      <div className="md:h-3/4 md:w-3/4 lg:w-2/4 h-1/2 w-2/4 rounded-lg border-2 border-solid border-color-bginputs bg-color-bgforms p-8">
        <div className="title">
          <h2>Cadastro de Metas</h2>
        </div>
        <form className="my-2 flex w-full h-full"
        onSubmit={handleSubmit}>
          <div className="w-full mt-0 grid md:grid-cols-1 grid-cols-2 justify-center gap-4 ">
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
            <div className="md:-mt-12 w-full items-center justify-center whitespace-nowrap p-4">
               <InputValue
                label="Valor da meta:"
                name="goalValue"
                value={formState.goalValue}
                placeholder="R$ 0,00"
                onValueChange={handlePriceChange}
              />
            </div>
            <div className="md:-mt-12 w-full items-center justify-center whitespace-nowrap p-4">
              <InputLayout
                label="Data final da meta:"
                name="finalDate"
                type="date"
                value={formState.finalDate}
                onChange={handleChange}
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
                name="goalValue"
                type="text"
                value={formState.finalDate}
                placeholder="0,00"
                onChange={handleChange}
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
      </div>
    </div>
  )
}
