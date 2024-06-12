import React, { useState } from 'react'
import { InputLayout } from '../Input/InputLayout'
import { InputValue } from '../Input/InputValue'
import { MdClose } from 'react-icons/md'

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
      <div className="h-1/2 w-2/4 rounded-lg border-2 border-solid border-color-bginputs bg-color-bgforms p-8 md:h-3/4 md:w-3/4 lg:w-2/4">
        <div className="flex items-center">
          <h2 className='flex flex-1'>Cadastro de Metas</h2>
          <div className="flex justify-end hover:bg-color-border p-4 rounded-full cursor-pointer" onClick={() => onClose(false)}>
            <MdClose 
            />
          </div>
        </div>
        <form className="flex flex-col h-full w-full my-0" onSubmit={handleSubmit}>
          <div className="mt-0 grid w-full grid-cols-2 justify-center gap-4 md:grid-cols-1 ">
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
            <div className="w-full items-center justify-center whitespace-nowrap p-4 md:-mt-12">
              <InputValue
                label="Valor da meta:"
                name="goalValue"
                value={formState.goalValue}
                placeholder="R$ 0,00"
                onValueChange={handlePriceChange}
              />
            </div>
            <div className="-mt-12 w-full items-center justify-center whitespace-nowrap p-4 md:-mt-12">
              <InputLayout
                label="Data final da meta:"
                name="finalDate"
                type="date"
                value={formState.finalDate}
                onChange={handleChange}
              />
            </div>
            <div className="-mt-12 w-full items-center justify-center whitespace-nowrap p-4 md:-mt-12"></div>
          </div>
          <div className="flex w-full h-1/4">
            <button
              type="submit"
              className="w-full h-1/2 sm:h-1/3 cursor-pointer rounded-lg bg-color-bginputs"
              onClick={''}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
