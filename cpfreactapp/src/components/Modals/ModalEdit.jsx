import React, { useContext, useEffect, useState } from 'react'

import { InputLayout } from '../Input/InputLayout'
import { SelectLayout } from '../Select/SelectLayout'

import { format } from 'date-fns'
import { Context } from '../../Context'

import { toast } from 'react-toastify'
import { InputValue } from '../Input/InputValue'

export const ModalEdit = ({
  closeEditModal,
  onSubmit,
  primaryDefaultValue
}) => {
  const { userContext, setContext } = useContext(Context)
  const user = userContext
  const { IP } = require('../../env')

  const [formState, setFormState] = useState(
    primaryDefaultValue || {
      amount: '',
      description: '',
      regGroupType: '',
      registerType: ''
    }
  )

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      type: primaryDefaultValue?.registerType || prevState.registerType,
      category: primaryDefaultValue?.regGroupType || prevState.regGroupType,
      amount: primaryDefaultValue?.registerValue || prevState.amount,
      description: primaryDefaultValue?.description || prevState.description
    }))
  }, [primaryDefaultValue])

  const handleChangeEdit = (e) => {
    if (e && e.target) {
      const { name, value } = e.target
      if (name === 'type') {
        setFormState((prevState) => ({
          ...prevState,
          registerType: value
        }))
      } else if (name === 'category') {
        setFormState((prevState) => ({
          ...prevState,
          regGroupType: value
        }))
      } else if (name === 'amount') {
        setFormState((prevState) => ({
          ...prevState,
          amount: parseFloat(value.replace(',', '.'))
        }))
      } else {
        setFormState((prevState) => ({
          ...prevState,
          [name]: value
        }))
      }
    } else if (e && e.floatValue !== undefined) {
      setFormState((prevState) => ({
        ...prevState,
        amount: e.floatValue
      }))
    }
  }

  async function updateRegister() {
    try {
      const currentDate = new Date()
      const formattedDate = format(currentDate, 'yyyy-MM-dd')

      const newRegister = {
        id: formState.id,
        registerValue: formState.amount,
        description: formState.description,
        regGroupType: formState.regGroupType,
        registerType: formState.type === 'Entrada' ? 'INCOME' : 'COST',
        balance: 0,
        user: user,
        registerDate: formattedDate
      }
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRegister)
      }

      const response = await fetch(`http://${IP}:8080/register/update`, options)
      return await response.json()
    } catch (error) {
      console.error('Erro na solicitação:', error)
      throw error
    }
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault()

    const newRegister = await updateRegister()
    onSubmit(newRegister)

    closeEditModal(false)
    toast.success('Registro atualizado com sucesso!', {
      position: 'bottom-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
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
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-modal-background">
      <div className="h-1/2 w-1/4 rounded-lg border-2 border-solid border-color-bginputs bg-color-bgforms p-8">
        <div className="title">
          <h2>Editar</h2>
        </div>
        <form className="my-6 flex w-full items-center justify-center">
          <div className="mt-2 grid grid-cols-2 justify-center gap-5">
            <div className="w-full items-center justify-center whitespace-nowrap p-4">
              <InputValue
                label="Valor:"
                name="amount"
                type="text"
                value={formState.amount}
                placeholder="R$ 0,00"
                onValueChange={handleChangeEdit}
              />
            </div>
            <div className="w-full items-center justify-center whitespace-nowrap p-4">
              <InputLayout
                label="Descrição:"
                name="description"
                type="text"
                value={formState.description}
                placeholder="Descrição"
                onChange={handleChangeEdit}
              />
            </div>
            <div className="-mt-12 w-full items-center justify-center whitespace-nowrap p-4">
              <SelectLayout
                label="Categoria:"
                name="category"
                id="regGroupType"
                value={formState.category}
                onChange={handleChangeEdit}
                options={categoryOptions}
              />
            </div>
            <div className="-mt-12 w-full items-center justify-center whitespace-nowrap p-4">
              <SelectLayout
                label="Tipo:"
                name="type"
                id="type"
                value={formState.type}
                onChange={handleChangeEdit}
                options={typeOptions}
              />
            </div>
            <button
              type="submit"
              className="m-0 my-4 h-1/2 w-full cursor-pointer rounded-lg bg-color-bginputs p-2"
              onClick={() => closeEditModal(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="m-0 my-4 h-1/2 w-full cursor-pointer rounded-lg bg-color-bginputs p-2"
              onClick={handleSubmitEdit}
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
