import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import register from '../../components/images/register.svg'

import { InputLayout } from '../../components/Input/InputLayout'
import { SelectLayout } from '../../components/Select/SelectLayout'
import InputPassword from '../../components/Input/InputPassword'
import { InputDateRegister } from '../../components/Input/InputDateRegister'

function RegisterForm() {
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState('MALE')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [street, setStreet] = useState('')
  const [numberHouse, setNumHouse] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const { IP } = require('../../env')
  const bcrypt = require('bcryptjs')

  const handleChangeName = (event) => setFullName(event.target.value)

  const handleChangeBirthDate = (event) => setBirthDate(event.target.value)

  const handleChangeGender = (event) => setGender(event.target.value)

  const handleChangeEmail = (event) => setEmail(event.target.value)

  const handleChangePassword = (event) => setPassword(event.target.value)

  const handleChangeZipCode = (event) => setZipCode(event.target.value)

  const handleChangeStreet = (event) => setStreet(event.target.value)

  const handleChangeNumberHouse = (event) => setNumHouse(event.target.value)

  const handleChangeNeighborhood = (event) =>
    setNeighborhood(event.target.value)

  const handleChangeCity = (event) => setCity(event.target.value)

  const handleChangeState = (event) => setState(event.target.value)

  const handleChangeCountry = (event) => setCountry(event.target.value)

  const navigate = useNavigate()

  useEffect(() => {
    console.log(zipCode.trim())
    if (zipCode.trim() !== (null || undefined || ''))
      requestAddress(zipCode.trim())
  }, [zipCode])

  async function requestAddress(zipCode) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(
      'https://viacep.com.br/ws/' + zipCode + '/json',
      options
    )

    const responseAddress = await response.json()
    setNeighborhood(responseAddress?.bairro)
    setCity(responseAddress?.localidade)
    setStreet(responseAddress?.logradouro)
    setState(responseAddress?.uf)
  }

  function defineLocalStorage(user) {
    const users = JSON.parse(localStorage.getItem('users')) || []
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))
  }

  async function sendRequest() {
    const hashPassword = bcrypt.hashSync(password, 10)

    const address = {
      city: city,
      numberHouse: numberHouse,
      neighborhood: neighborhood,
      state: state,
      street: street,
      zipCode: zipCode,
      country: country
    }

    const user = {
      name: fullName,
      gender: gender,
      birthDate: birthDate,
      email: email,
      password: hashPassword,
      address: address,
      isAdmin: 0
    }
    defineLocalStorage(user)
    const userObject = await requestUser(user)
    return userObject
  }

  async function requestUser(user) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }

    const response = await fetch(`http://${IP}:8080/user/registerUser`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log('Resposta do servidor:', data)
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error)
      })

    return response
  }

  const genderOptions = [
    { value: 'MALE', label: 'Masculino' },
    { value: 'FEMALE', label: 'Feminino' }
  ]

  return (
    <div className="flex h-screen w-full items-center justify-center bg-color-background">
      {' '}
      {/* body */}
      <div
        className="flex h-[80vh] w-4/5
      lg:h-1/2 lg:w-full"
      >
        {' '}
        {/* container */}
        <div
          className="flex w-1/2 items-center justify-center bg-color-bgforms p-4
        lg:absolute lg:left-0 lg:top-0 lg:flex lg:h-1/2 lg:w-full lg:items-center lg:p-4"
        >
          {' '}
          {/* form_image */}
          <img
            src={register}
            alt="registerSVG"
            className="w-5/6 sm:h-1/5 sm:w-full lg:h-2/3 lg:w-full"
          />
        </div>
        <div
          className="flex w-1/2 flex-col items-center justify-center border-l-2 border-solid border-color-border-login bg-color-bgforms p-12
        lg:absolute lg:left-0 lg:top-1/2 lg:flex lg:h-1/2 lg:w-full lg:items-center lg:overflow-hidden lg:border-l-0 lg:p-8"
        >
          {' '}
          {/* form */}
          <form action="#" className="h-full w-full">
            <div className="-mb-2 flex h-[-50vh] justify-between lg:-mb-6">
              {' '}
              {/* form_header */}
              <div className="-mt-2 ml-16 sm:ml-16">
                {' '}
                {/* Title */}
                <h1>Cadastre-se</h1>
              </div>
              <div className="-mt-8 flex items-center">
                {' '}
                {/* login_button */}
                <button className="-ml-[50%] mt-[15%] cursor-pointer rounded-lg border-none bg-color-receipt px-2.5 py-2 font-medium no-underline sm:-ml-[25%] lg:-ml-[40%]">
                  <Link to="/">Voltar para Login</Link>
                </button>
              </div>
            </div>
            <div
              className="m-xlw-[85%] mx-auto mb-[6rem] mt-[5vh] flex w-4/5 flex-wrap justify-between 
            p-4 sm:ml-16 sm:w-full lg:flex lg:max-h-52 lg:w-[85%] lg:overflow-y-scroll m-md:justify-between"
            >
              {' '}
              {/* input_group */}
              <InputLayout
                width="m-sm:w-2/4 m-xl:w-2/4"
                label="Nome Completo"
                id="fullName"
                name="fullName"
                type="text"
                value={fullName}
                placeholder="Nome completo"
                onChange={handleChangeName}
              />
              <InputDateRegister
                width="m-sm:w-2/4 m-xl:w-2/4"
                label="Data de Nascimento"
                id="birthDate"
                name="birthDate"
                type="date"
                value={birthDate}
                placeholder="Data de Nascimento"
                onChange={handleChangeBirthDate}
              />
              <SelectLayout
                width="m-sm:w-2/4 m-xl:w-2/4"
                label="Gênero"
                id="gender"
                name="gender"
                onChange={handleChangeGender}
                options={genderOptions}
              />
              <InputLayout
                width="m-sm:w-2/4 m-xl:w-2/4"
                label="Email"
                id="email"
                name="email"
                type="email"
                value={email}
                placeholder="Informe seu email"
                onChange={handleChangeEmail}
              />
              <InputLayout
                width="m-sm:w-2/4 m-xl:w-2/4"
                label="Senha"
                id="password"
                name="password"
                type="password"
                placeholder="Informe sua senha"
                onChange={handleChangePassword}
              />
              <InputLayout
                width="m-sm:w-2/4 m-xl:w-2/4"
                label="CEP"
                id="zipCode"
                name="zipCode"
                type="cep"
                placeholder="xxxxx-xxx"
                onBlur={handleChangeZipCode}
              />
              <InputLayout
                width="m-sm:w-2/4 m-xl:w-2/4"
                label="Rua"
                id="street"
                name="street"
                type="text"
                value={street}
                placeholder="Informe sua Rua"
                onChange={handleChangeStreet}
              />
              <InputLayout
                width="m-sm:w-2/4 m-xl:w-2/4"
                label="Número"
                id="numberHouse"
                name="numberHouse"
                type="number"
                value={numberHouse}
                placeholder="Informe seu número"
                onChange={handleChangeNumberHouse}
              />
              <InputLayout
                width="m-sm:w-2/4 m-xl:w-2/4"
                label="Bairro"
                id="neighborhood"
                name="neighborhood"
                type="text"
                value={neighborhood}
                placeholder="Informe seu bairro"
                onChange={handleChangeNeighborhood}
              />
              <InputLayout
                width="m-sm:w-2/4 m-xl:w-2/4"
                label="Cidade"
                id="city"
                name="city"
                type="text"
                value={city}
                placeholder="Informe sua Cidade"
                onChange={handleChangeCity}
              />
              <InputLayout
                width="m-sm:w-2/4 m-xl:w-2/4"
                label="Estado"
                id="state"
                name="state"
                type="text"
                value={state}
                placeholder="Informe seu Estado"
                onChange={handleChangeState}
              />
              {/* <div className="flex flex-col -mb-2 -m-[1%] md:w-2/4 m-xlw-2/4 m-xlmb-2">
                <label htmlFor="country" className="-mb-2 mt-1">País</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Informe seu país"
                  required
                  onChange={handleChangeCountry}
                  value={country}
                  className="w-full my-3 mx-0 py-3 pr-4 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt sm:mb-1"
                />
              </div> */}
            </div>
            <div className="m-xlw-[83%] -mt-24 ml-16 flex w-10/12 items-center lg:w-[85%]">
              {' '}
              {/* continue_button */}
              <button
                className="ml-2 mt-6 w-full cursor-pointer rounded-lg border-none bg-color-receipt px-2.5 py-2 text-base font-medium"
                onClick={() => {
                  sendRequest()
                  navigate('/')
                }}
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
