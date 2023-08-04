import React, { useEffect, useState } from "react";
import stylesregister from "./Register.module.css";

import log from "../images/log.svg";

import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [street, setStreet] = useState("");
  const [numberHouse, setNumHouse] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const handleChangeName = (event) => setFullName(event.target.value);

  const handleChangeBirthDate = (event) => setBirthDate(event.target.value);

  const handleChangeGender = (event) => setGender(event.target.value);

  const handleChangeEmail = (event) => setEmail(event.target.value);

  const handleChangePassword = (event) => setPassword(event.target.value);

  const handleChangeZipCode = (event) => setZipCode(event.target.value);

  const handleChangeStreet = (event) => setStreet(event.target.value);

  const handleChangeNumberHouse = (event) => setNumHouse(event.target.value);

  const handleChangeNeighborhood = (event) =>
    setNeighborhood(event.target.value);

  const handleChangeCity = (event) => setCity(event.target.value);

  const handleChangeState = (event) => setState(event.target.value);

  const handleChangeCountry = (event) => setCountry(event.target.value);

  const navigate = useNavigate();

  useEffect(() => {
    if (zipCode.trim() !== (null || undefined)) requestAddress(zipCode.trim());
  }, [zipCode]);

  async function requestAddress(zipCode) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      "https://viacep.com.br/ws/" + zipCode + "/json",
      options
    );

    const responseAddress = await response.json();
    setNeighborhood(responseAddress?.bairro);
    setCity(responseAddress?.localidade);
    setStreet(responseAddress?.logradouro);
    setState(responseAddress?.uf);
  }

  async function sendRequest() {
    const address = {
      city: city,
      numberHouse: numberHouse,
      neighborhood: neighborhood,
      state: state,
      street: street,
      zipCode: zipCode,
      country: country,
    };

    const user = {
      name: fullName,
      gender: gender === "Masculino" ? "MALE" : "FEMALE",
      birthDate: birthDate,
      email: email,
      password: password,
      address: address,
    };

    const userObject = await requestUser(user);
    return userObject;
  }

  async function requestUser(user) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(
      "http://10.10.29.76:8080/user/registerUser",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Resposta do servidor:", data);
      })
      .catch((error) => {
        console.error("Erro na solicitação:", error);
      });

    return response;
  }

  return (
    <div className={stylesregister.body}>
      <div className={stylesregister.container}>
        <div className={stylesregister.form_image}>
          <img src={log} alt="" />
        </div>
        <div className={stylesregister.form}>
          <form action="#">
            <div className={stylesregister.form_header}>
              <div className={stylesregister.title}>
                <h1>Cadastre-se</h1>
              </div>
              <div className={stylesregister.login_button}>
                <button>
                  <Link to="/">Voltar para Login</Link>
                </button>
              </div>
            </div>
            <div className={stylesregister.input_group}>
              <div className={stylesregister.input_box}>
                <label htmlFor="fullName">Nome Completo</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Nome Completo"
                  required
                  value={fullName}
                  onChange={handleChangeName}
                />
              </div>

              <div className={stylesregister.input_box}>
                <label htmlFor="gender">Genêro</label>
                <select
                  id="gender"
                  name="gender"
                  required
                  onChange={handleChangeGender}
                >
                  <option value="op0">Masculino</option>
                  <option value="op1">Feminino</option>
                </select>
              </div>

              <div className={stylesregister.input_box}>
                <label htmlFor="birthDate">Data de Nascimento</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  placeholder="Data de Nascimento"
                  required
                  value={birthDate}
                  onChange={handleChangeBirthDate}
                />
              </div>

              <div className={stylesregister.input_box}>
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Informe seu e-mail"
                  required
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>

              <div className={stylesregister.input_box}>
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Informe sua senha"
                  required
                  onChange={handleChangePassword}
                />
              </div>

              <div className={stylesregister.input_box}>
                <label htmlFor="zipCode">CEP</label>
                <input
                  type="cep"
                  id="zipCode"
                  name="cep"
                  placeholder="xxxxx-xxx"
                  required
                  onBlur={handleChangeZipCode}
                />
              </div>

              <div className={stylesregister.input_box}>
                <label htmlFor="street">Rua</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  placeholder="Informe sua rua"
                  required
                  onChange={handleChangeStreet}
                  value={street}
                />
              </div>

              <div className={stylesregister.input_box}>
                <label htmlFor="numberHouse">Número</label>
                <input
                  type="number"
                  id="number"
                  name="numberHouse"
                  placeholder="Informe seu número"
                  required
                  onChange={handleChangeNumberHouse}
                  value={numberHouse}
                />
              </div>

              <div className={stylesregister.input_box}>
                <label htmlFor="neighborhood">Bairro</label>
                <input
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                  placeholder="Informe seu bairro"
                  required
                  onChange={handleChangeNeighborhood}
                  value={neighborhood}
                />
              </div>

              <div className={stylesregister.input_box}>
                <label htmlFor="city">Cidade</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Informe sua cidade"
                  required
                  onChange={handleChangeCity}
                  value={city}
                />
              </div>

              <div className={stylesregister.input_box}>
                <label htmlFor="state">Estado</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="Informe o seu estado"
                  required
                  onChange={handleChangeState}
                  value={state}
                />
              </div>

              <div className={stylesregister.input_box}>
                <label htmlFor="country">País</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Informe seu país"
                  required
                  onChange={handleChangeCountry}
                  value={country}
                />
              </div>
            </div>
            <div className={stylesregister.continue_button}>
              <button
                onClick={() => {
                  sendRequest();
                  navigate("/");
                }}
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
