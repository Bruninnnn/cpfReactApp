import React, { useState } from "react";
import stylesregister from "./Register.module.css";

import log from "../images/log.svg";

import { Link } from "react-router-dom";

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

  function sendRequest() {
    const address = async function addressRequest() {
      console.log("ENTROU NESSE CARALHO");
      const addressObject = {
        city: city,
        country: country,
        numberHouse: numberHouse,
        state: state,
        street: street,
        zipCode: zipCode,
        neighborhood: neighborhood,
      };

      const optionsAddress = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressObject),
      };

      const responseAddress = await fetch(
        "http://10.10.30.170:8080/address/registerAddress",
        optionsAddress
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Resposta do servidor:", data);
        })
        .catch((error) => {
          console.error("Erro na solicitação:", error);
        });
      console.log("Address RETURN");
      return responseAddress;
    };

    const userObject = async function requestUser() {
      const user = {
        fullName: fullName,
        gender: gender === "Masculino" ? "MALE" : "FEMALE",
        birthDate: birthDate,
        email: email,
        password: password,
        address: address,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      const response = await fetch(
        "http://10.10.30.170:8080/user/registerUser",
        options
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Resposta do servidor:", data);
        })
        .catch((error) => {
          console.error("Erro na solicitação:", error);
        });
      console.log("Address RETURN");
      return response;
    };
    return userObject;
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
                  onChange={handleChangeZipCode}
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
                />
              </div>

              <div className={stylesregister.continue_button}>
                <button onClick={sendRequest}>
                  {" "}
                  Concluir
                  {/* <Link to="/">Concluir</Link> */}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
