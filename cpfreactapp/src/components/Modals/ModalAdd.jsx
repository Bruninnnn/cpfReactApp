import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { InputLayout } from '../Input/InputLayout'
import { SelectLayout } from '../Select/SelectLayout'
import { format } from 'date-fns'
import { InputValue } from '../Input/InputValue'

export const ModalComponent = ({ closeAddModal, onSubmit, userContext }) => {
  const user = userContext
  const { IP } = require('../../env')
  const [formState, setFormState] = useState({
    amount: '',
    description: '',
    category: '',
    type: ''
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
      amount: value
    })
  }

  async function sendRequest() {
    try {
      const currentDate = new Date()
      const formattedDate = format(currentDate, 'yyyy-MM-dd')
      const registerValue = parseFloat(formState.amount.replace(',', '.'))

      const register = {
        registerValue: registerValue,
        description: formState.description,
        regGroupType: formState.category,
        registerType: formState.type === 'Entrada' ? 'INCOME' : 'COST',
        user: user,
        registerDate: formattedDate
      }

      const urlType = formState.type === 'Entrada' ? 'income' : 'cost'

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(register)
      }

      const response = await fetch(
        `http://${IP}:8080/register/${urlType}`,
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
    e.preventDefault()

    if (
      !formState.amount ||
      !formState.description ||
      !formState.category ||
      !formState.type
    ) {
      closeAddModal(false)
      return
    }

    const info = await sendRequest()
    onSubmit(info)

    closeAddModal(false)
    toast.success('Cadastro realizado com sucesso!', {
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

  const categoryOptions = [
    { value: 'Casa', label: 'Casa' },
    { value: 'Educação', label: 'Educação' },
    { value: 'Eletrônicos', label: 'Eletrônicos' },
    { value: 'Lazer', label: 'Lazer' },
    { value: 'Outros', label: 'Outros' },
    { value: 'Restaurante', label: 'Restaurante' },
    { value: 'Saúde', label: 'Saúde' },
    { value: 'Serviços', label: 'Serviços' },
    { value: 'Supermercado', label: 'Supermercado' },
    { value: 'Transporte', label: 'Transporte' },
    { value: 'Vestuário', label: 'Vestuário' },
    { value: 'Viagem', label: 'Viagem' }
  ]

  const typeOptions = [
    { value: 'Entrada', label: 'Entrada' },
    { value: 'Saida', label: 'Saída' }
  ]

  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-modal-background">
      <div className="h-1/2 w-2/4 rounded-lg border-2 border-solid border-color-bginputs bg-color-bgforms p-8 sm:w-full sm:h-full md:h-3/4 md:w-3/4 lg:w-2/4">
        <div className="title">
          <h2>Cadastro</h2>
        </div>
        <form className="my-0 flex h-full w-full flex-col">
          <div className="mt-0 grid w-full grid-cols-2 justify-center gap-4 md:grid-cols-1 ">
            <div className="w-full items-center justify-center whitespace-nowrap p-4">
              <InputValue
                label="Valor:"
                name="amount"
                type="text"
                value={formState.amount}
                placeholder="R$ 0,00"
                onValueChange={handlePriceChange}
              />
            </div>
            <div className="w-full items-center justify-center whitespace-nowrap p-4 md:-mt-12">
              <InputLayout
                label="Descrição:"
                name="description"
                type="text"
                value={formState.description}
                placeholder="Descrição"
                onChange={handleChange}
              />
            </div>
            <div className="-mt-12 w-full items-center justify-center whitespace-nowrap p-4 md:-mt-12">
              <SelectLayout
                label="Categoria:"
                name="category"
                id="regGroupType"
                value={formState.category}
                onChange={handleChange}
                options={categoryOptions}
              />
            </div>
            <div className="-mt-12 w-full items-center justify-center whitespace-nowrap p-4 md:-mt-12">
              <SelectLayout
                label="Tipo:"
                name="type"
                id="type"
                value={formState.type}
                onChange={handleChange}
                options={typeOptions}
              />
            </div>
            <button
              type="button"
              className="m-0 my-4 h-1/2 w-full cursor-pointer rounded-lg bg-color-bginputs p-2"
              onClick={() => closeAddModal(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="m-0 my-4 h-1/2 w-full cursor-pointer rounded-lg bg-color-bginputs p-2"
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
