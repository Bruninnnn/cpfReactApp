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
  const [passwordShow, setPasswordShow] = useState(false);
  const bcrypt = require("bcryptjs");

  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [errors, setErrors] = useState({});
  const { IP } = require("../../env");

  useEffect(() => {
    if (Object.keys(errors).length === 0 && email !== "" && password !== "") {
    }
  }, [errors]);

  const { setContext } = useContext(Context);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await sendRequest();
  }

  async function requestUser() {
    const urlTemplate = `http://${IP}:8080/user/findUser?email=${email}`;
    const url = urlTemplate;

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

  const verifyPassword = (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
  };

  async function sendRequest() {
    const user = await requestUser();
    if (user) {
      const isLoggedIn = await verifyPassword(user?.password, password);
      if (!!isLoggedIn) {
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
      } else {
        toast.error("Senha incorreta, tente novamente!", {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-color-background"> {/* body */}
      <div className="flex w-4/5 h-[80vh]
    md:w-full md:h-1/2 lg:w-full lg:h-auto"> {/* container */}
        <div className="flex w-1/2 justify-center items-center bg-color-bgforms p-4 
      md:w-full md:h-1/2 md:flex md:absolute md:left-0 md:top-0 md:items-center md:p-4"
        > {/* form_image */}
          <img src={login} alt="imgWelcome" className="w-3/4 h-4/5 md:w-full md:h-2/3 sm:w-full sm:h-1/5" />
        </div>
        <div className="flex flex-col w-1/2 justify-center items-center bg-color-bgforms p-12 border-l-2 border-solid border-color-border-login
      md:w-full md:h-1/2 md:top-1/2 md:left-0 md:flex md:absolute md:overflow-hidden md:items-center md:p-8 md:border-l-0"
        > {/* form */}
          <form onSubmit={handleSubmit}>
            <div className="flex w-4/5 mb-8 justify-between md:mb-6"> {/* form_header */}
              <div className="title">
                <h1 className="mt-0 -ml-3.5">LOGIN</h1>
              </div>
            </div>
            <div className="flex flex-col mb-3 -m-3"> {/* input_box */}
              <label htmlFor="email" className="md:-mb-2 md:mt-1">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Informe seu e-mail"
                required
                onChange={handleChangeEmail}
                className="my-3 mx-0 py-3 pr-4 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt sm:mb-1"
              />
            </div>
            <div className="flex flex-col mb-3 -m-3"> {/* input_box */}
              <label htmlFor="password" className="md:-mb-2 md:mt-1">Senha</label>
              <input
                type={passwordShow ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Informe sua senha"
                required
                onChange={handleChangePassword}
                className="my-3 mx-0 py-3 pr-4 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt md:mb-1"
              />
            </div>
            <div className="w-80 flex flex-col mb-6 -m-3 mt-4 border-none text-center bg-color-receipt p-3 rounded-lg cursor-pointer md:mb-1"> {/* continue_button */}
              <button onClick={handleSubmit} className="text-sm font-medium">Logar</button>
            </div>
            <div className="mb-4 md:mb-1"> {/* textfield_remember */}
              <FormControlLabel
                value="start"
                control={
                  <Checkbox
                    {...label}
                    style={{
                      color: "#0A5C5A",
                    }}
                    size="small"
                  />
                }
                label="Mostrar Senha"
                style={{
                  color: "#FFFFFF",
                }}
                onClick={togglePassword}
              />
            </div>
            <div className="flex"> {/* createaccount */}
              <p>
                Ainda não tem conta?{" "}
                <Link className="text-color-receipt font-bold" to="/register">{" "}
                  Criar Conta
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
