import React, { useState } from "react";
import stylesregister from "./Register.module.css";
import { Link } from 'react-router-dom';
import log from '../images/log.svg';

function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleChangeName = (event) => {
    setFullName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    sendRequest();
  };

  function sendRequest() {
    const userRegister = {
      fullNamme: fullName,
      email: email,
    };

    fetch("http://localhost:3000/user/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegister),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Resposta do servidor:", data);
      })
      .catch((error) => {
        console.error("Erro na solicitação:", error);
      });

    console.log(userRegister);
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
                />
              </div>

              <div className={stylesregister.input_box}>
                <label htmlFor="">Número</label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  placeholder="Informe seu número"
                  required
                />
              </div>

              <div className={stylesregister.input_box}>
                <label htmlFor="">Bairro</label>
                <input
                  type="text"
                  id="rua"
                  name="rua"
                  placeholder="Informe seu bairro"
                  required
                />
              </div>

              <div className={stylesregister.input_box}>
                <label htmlFor="">Complemento</label>
                <input
                  type="text"
                  id="complement"
                  name="rua"
                  placeholder="Informe o complemento"
                  required
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
                />
              </div>

              <div className={stylesregister.continue_button}>
                <button /*onClick={/*sistema cadastro}*/> 
                  <Link to="/">Concluir</Link>
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
