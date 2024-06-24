import React, { useContext, useState } from 'react'
import { InputLayout } from '../Input/InputLayout'
import { InputValue } from '../Input/InputValue'
import { MdClose } from 'react-icons/md'
import { Context } from '../../Context'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
const { IP } = require('../../env')

export const ModalAddGoals = ({ onClose }) => {
  const { userContext } = useContext(Context)
  const [formState, setFormState] = useState({
    title: '',
    goalValue: '',
    initialDate: format(new Date(), 'yyyy-MM-dd'),
    finalDate: '',
    user: userContext
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
    e.preventDefault()
    try {
      const formattedGoalValue = parseFloat(
        formState.goalValue.replace(',', '.')
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
      toast.success('Cadastro realizado com sucesso!', {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
      return data
    } catch (error) {
      console.error('Erro na solicitação:', error)
    }
  }

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-modal-background">
      <div className="h-1/2 w-2/4 rounded-lg border-2 border-solid border-color-bginputs bg-color-bgforms p-8 md:h-3/4 md:w-3/4 lg:w-2/4">
        <div className="flex items-center">
          <h2 className="flex flex-1">Cadastro de Metas</h2>
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
                type="text"
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
          <div className="flex h-1/4 w-full">
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
