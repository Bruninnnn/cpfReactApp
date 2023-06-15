import React, { useContext, useState } from "react";
import login from "../images/login.svg";
import styleslogin from "./Login.module.css";
import validation from "./Validation";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Link } from "react-router-dom";
import { Context } from "../../Context";
//import {ReactComponent as ReactLogo} from "./images/astronauta.svg"
// <img src={ReactLogo} alt=""> </img>

function FormLogin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setValues({ ...values, [e.target.email]: e.target.value });
  }

  /*useEffect(() => {
  if (Object.keys(errors).length === 0 &&  (values.email !== "" && values.password !== "")) {
    alert("teste");
  }
}, [errors])*/

  const { user, setUser } = useContext(Context);

  console.log(user);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validation(values));
    setUser();
  }

  return (
    <div className={styleslogin.container}>
      <div className={styleslogin.form_image}>
        <img src={login} alt="" />
      </div>
      <div className={styleslogin.form}>
        <form onSubmit={handleSubmit}>
          <div className={styleslogin.form_header}>
            <div className={styleslogin.title}>
              <h1>LOGIN</h1>
            </div>
          </div>
          <div className={styleslogin.input_box}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Informe seu e-mail"
              required
            />
          </div>

          <div className={styleslogin.input_box}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Informe sua senha"
              required
            />
          </div>

          <div className={styleslogin.continue_button}>
            <button>Acessar</button>
          </div>
          <br></br>
          <div className={styleslogin.textfield_remember}>
            <FormControlLabel
              value="start"
              control={<Checkbox {...label} size="small" />}
              label="Relembrar Senha"
            />
          </div>
          <br></br>
          <br></br>
          <div className={styleslogin.textfield_createcount}>
            <p>
              Ainda não tem conta? <Link to="/register"> Criar Conta</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;

function ValidateLogin() {}
