import React, { useEffect, useState } from "react";

import register from "../../components/images/register.svg";

import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("MALE");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [street, setStreet] = useState("");
  const [numberHouse, setNumHouse] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const { IP } = require("../../env");
  const bcrypt = require("bcryptjs");

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

  function defineLocalStorage(user) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

  async function sendRequest() {
    const hashPassword = bcrypt.hashSync(password, 10);

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
      gender: gender,
      birthDate: birthDate,
      email: email,
      password: hashPassword,
      address: address,
      isAdmin: 0,
    };
    defineLocalStorage(user);
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

    const response = await fetch(`http://${IP}:8080/user/registerUser`, options)
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
    <div className="w-full h-screen flex justify-center items-center bg-color-background"> {/* body */}
      <div className="w-4/5 h-[80vh] flex
      md:w-full md:h-1/2"> {/* container */}
        <div className="flex w-1/2 justify-center items-center bg-color-bgforms p-4
        md:w-full md:h-1/2 md:flex md:absolute md:left-0 md:top-0 md:items-center md:p-4"> {/* form_image */}
          <img src={register} alt="registerSVG" className="w-5/6md:w-full md:h-2/3 sm:w-full sm:h-1/5" />
        </div>
        <div className="w-1/2 flex justify-center items-center flex-col bg-color-bgforms p-12 border-l-2 border-solid border-color-border-login
        md:w-full md:h-1/2 md:top-1/2 md:left-0 md:flex md:absolute md:overflow-hidden md:items-center md:p-8 md:border-l-0"> {/* form */}
          <form action="#" className="w-full h-full">
            <div className="h-[-50vh] -mb-2 flex justify-between md:-mb-6"> {/* form_header */}
              <div className="-mt-2 ml-16 sm:ml-4"> {/* Title */}
                <h1>Cadastre-se</h1>
              </div>
              <div className="flex items-center -mt-8"> {/* login_button */}
                <button className="border-none bg-color-receipt px-2.5 py-2 rounded-lg cursor-pointer -ml-[50%] mt-[15%] font-medium no-underline md:-ml-[40%] sm:-ml-[80%] m-xl-ml-[45%]">
                  <Link to="/">Voltar para Login</Link>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap justify-between w-4/5 p-4 mt-[5vh] mx-auto mb-[6rem] 
            sm:w-full sm:ml-0 md:flex md:justify-between md:w-[85%] md:lg:overflow-y-scroll md:max-h-52 m-xlw-[85%]"> {/* input_group */}
              <div className="flex flex-col -mb-2 -m-[1%] md:w-2/4 m-xlw-2/4 m-xlmb-2"> {/* input_box */}
                <label htmlFor="fullName" className="-mb-2">Nome Completo</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Nome Completo"
                  required
                  value={fullName}
                  onChange={handleChangeName}
                  className="w-full my-3 mx-0 py-3 pr-4 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt sm:mb-1"
                />
              </div>

              <div className="flex flex-col -mb-2 -m-[1%] md:w-2/4 m-xlw-2/4 m-xlmb-2"> {/* input_box */}
                <label htmlFor="gender" className="-mb-2">Genêro</label>
                <select
                  id="gender"
                  name="gender"
                  required
                  onChange={handleChangeGender}
                  className="w-full my-3 mx-0 py-2 pr-4 mr-24 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt sm:mb-1"
                >
                  <option value="MALE">Masculino</option>
                  <option value="FEMALE">Feminino</option>
                </select>
              </div>

              <div className="flex flex-col w-[48.5%] -mb-2 -m-[1%] md:w-2/4 m-xlw-2/4 m-xlmb-2"> {/* input_box */}
                <label htmlFor="birthDate" className="-mb-2 mt-1">Data de Nascimento</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  placeholder="Data de Nascimento"
                  required
                  value={birthDate}
                  onChange={handleChangeBirthDate}
                  className="w-full my-3 mx-0 py-2 pr-4 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt sm:mb-1"
                />
              </div>

              <div className="flex flex-col -mb-2 -m-[1%] md:w-2/4 m-xlw-2/4 m-xlmb-2"> {/* input_box */} {/* input_box */}
                <label htmlFor="email" className="-mb-2 mt-1">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Informe seu e-mail"
                  required
                  value={email}
                  onChange={handleChangeEmail}
                  className="w-full my-3 mx-0 py-3 pr-4 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt sm:mb-1"
                />
              </div>

              <div className="flex flex-col -mb-2 -m-[1%] md:w-2/4 m-xlw-2/4 m-xlmb-2"> {/* input_box */}{/* input_box */}
                <label htmlFor="password" className="-mb-2 mt-1">Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Informe sua senha"
                  required
                  onChange={handleChangePassword}
                  className="w-full my-3 mx-0 py-3 pr-4 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt sm:mb-1"
                />
              </div>

              <div className="flex flex-col -mb-2 -m-[1%] md:w-2/4 m-xlw-2/4 m-xlmb-2"> {/* input_box */}
                <label htmlFor="zipCode" className="-mb-2 mt-1">CEP</label>
                <input
                  type="cep"
                  id="zipCode"
                  name="cep"
                  placeholder="xxxxx-xxx"
                  required
                  onBlur={handleChangeZipCode}
                  className="w-full my-3 mx-0 py-3 pr-4 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt sm:mb-1"
                />
              </div>

              <div className="flex flex-col -mb-2 -m-[1%] md:w-2/4 m-xlw-2/4 m-xlmb-2"> {/* input_box */}
                <label htmlFor="street" className="-mb-2 mt-1">Rua</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  placeholder="Informe sua rua"
                  required
                  onChange={handleChangeStreet}
                  value={street}
                  className="w-full my-3 mx-0 py-3 pr-4 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt sm:mb-1"
                />
              </div>

              <div className="flex flex-col -mb-2 -m-[1%] md:w-2/4 m-xlw-2/4 m-xlmb-2"> {/* input_box */}
                <label htmlFor="numberHouse" className="-mb-2 mt-1">Número</label>
                <input
                  type="number"
                  id="number"
                  name="numberHouse"
                  placeholder="Informe seu número"
                  required
                  onChange={handleChangeNumberHouse}
                  value={numberHouse}
                  className="w-full my-3 mx-0 py-3 pr-4 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt sm:mb-1"
                />
              </div>

              <div className="flex flex-col -mb-2 -m-[1%] md:w-2/4 m-xlw-2/4 m-xlmb-2"> {/* input_box */}
                <label htmlFor="neighborhood" className="-mb-2 mt-1">Bairro</label>
                <input
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                  placeholder="Informe seu bairro"
                  required
                  onChange={handleChangeNeighborhood}
                  value={neighborhood}
                  className="w-full my-3 mx-0 py-3 pr-4 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt sm:mb-1"
                />
              </div>

              <div className="flex flex-col -mb-2 -m-[1%] md:w-2/4 m-xlw-2/4 m-xlmb-2"> {/* input_box */}
                <label htmlFor="city" className="-mb-2 mt-1">Cidade</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Informe sua cidade"
                  required
                  onChange={handleChangeCity}
                  value={city}
                  className="w-full my-3 mx-0 py-3 pr-4 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt sm:mb-1"
                />
              </div>

              <div className="flex flex-col -mb-2 -m-[1%] md:w-2/4 m-xlw-2/4 m-xlmb-2"> {/* input_box */}
                <label htmlFor="state" className="-mb-2 mt-1">Estado</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="Informe o seu estado"
                  required
                  onChange={handleChangeState}
                  value={state}
                  className="w-full my-3 mx-0 py-3 pr-4 rounded-lg border-none bg-color-bginputs hover:outline-1 outline outline-color-receipt sm:mb-1"
                />
              </div>

              <div className="flex flex-col -mb-2 -m-[1%] md:w-2/4 m-xlw-2/4 m-xlmb-2"> {/* input_box */}
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
              </div>
            </div>
            <div className="flex w-4/5 -mt-24 items-center ml-16 md:w-[85%] m-xlw-[83%]"> {/* continue_button */}
              <button
                className="w-full mt-6 ml-1 border-none bg-color-receipt px-2.5 py-2 rounded-lg cursor-pointer font-medium text-base"
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
