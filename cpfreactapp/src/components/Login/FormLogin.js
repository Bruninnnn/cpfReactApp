import React, { useState } from "react";
import styleslogin from "./Login.module.css";
import validation from "./Validation";
import Home from "../Home/Home";
//import {ReactComponent as ReactLogo} from "./images/astronauta.svg"
// <img src={ReactLogo} alt=""> </img>

function FormLogin() {
  const [values, setValues] = useState ({
    email: '',
    password: ''
})

const [errors, setErrors] = useState({})

function handleChange(e) {
  setValues({...values, [e.target.email]: e.target.value})
}

/*useEffect(() => {
  if (Object.keys(errors).length === 0 &&  (values.email !== "" && values.password !== "")) {
    alert("teste");
  }
}, [errors])*/

function handleSubmit(e) {
  e.preventDefault();
  setErrors(validation(values));
}

  return (
    <div className={styleslogin.container}>
      <div className={styleslogin.form_image}>
      </div>
      <div className={styleslogin.form}>
        <form onSubmit={handleSubmit}>
          <div className={styleslogin.form_header}>
            <div className={styleslogin.title}>
              <h1>LOGIN</h1>
            </div>
            <div className={styleslogin.login_button}>
              <button></button>
            </div>
          </div>
          <div className={styleslogin.input_box}>
            <label for="email">E-mail</label>
            <input type="email" id="email" name="email" placeholder="Informe seu e-mail" required/>
          </div>

          <div className={styleslogin.input_box}>
            <label for="password">Senha</label>
            <input type="password" id="password" name="password" placeholder="Informe sua senha" required/>
          </div>

          <div className={styleslogin.continue_button}>
            <button>Continuar</button>
          </div>
          <br></br>
            <div className={styleslogin.textfield_remember}>
              <input type="checkbox" id="lembrar" />
              <span>Relembrar Senha</span>
            </div>
            <br></br>
              <div className={styleslogin.textfield_createcount}>
                <p>Ainda não tem conta? <a href="cadastro.html">Criar Conta</a></p>
              </div>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;


function ValidateLogin() {
  
}