import React, { useContext, useEffect, useState } from "react";

import login from "../../components/images/login.svg";
import styleslogin from "./Login.module.css";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../Context";

import "react-toastify/dist/ReactToastify.css";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(errors).length === 0 && email !== "" && password !== "") {
    }
  }, [errors]);

  const { setContext } = useContext(Context);
  const navigate = useNavigate();

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  async function handleSubmit(e) {
    e.preventDefault();
    await sendRequest();
  }

  async function requestUser() {
    const urlTemplate =
      "http://10.10.30.227:8080/user/findUser?email=${email}&password=${password}";
    const url = urlTemplate
      .replace("${email}", encodeURIComponent(email))
      .replace("${password}", encodeURIComponent(password));

    const user = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        toast.error("Usuário não encontrado, tente novamente!", {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
    return user;
  }

  const setContextFunction = (user) => {
    setContext(user);
  };

  async function sendRequest() {
    const user = await requestUser();
    if (user) {
      setContextFunction(user);
      toast.success("Usuário logado com sucesso!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/home");
    }
  }

  return (
    <div className={styleslogin.container}>
      <div className={styleslogin.form_image}>
        <img src={login} alt="imgWelcome" />
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
              onChange={handleChangeEmail}
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
              onChange={handleChangePassword}
            />
          </div>

          <div className={styleslogin.continue_button}>
            <button onClick={handleSubmit}>Logar</button>
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
              Ainda não tem conta?{" "}
              <Link className={styleslogin.hiperlink} to="/register">
                {" "}
                Criar Conta
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;
