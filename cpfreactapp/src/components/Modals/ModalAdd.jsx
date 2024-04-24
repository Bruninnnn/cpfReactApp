import React, { useState } from "react";
import { toast } from "react-toastify";

import { InputLayout } from "../Input/InputLayout"
import { SelectLayout } from "../Select/SelectLayout";

import { format } from "date-fns";

export const ModalComponent = ({ closeAddModal, onSubmit, userContext }) => {
  const user = userContext;
  const { IP } = require("../../env");
  const [formState, setFormState] = useState({
    amount: "",
    description: "",
    category: "",
    type: "",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  async function sendRequest() {
    try {
      const currentDate = new Date();
      const formattedDate = format(currentDate, "yyyy-MM-dd");
      const register = {
        registerValue: parseFloat(formState.amount.replace(",", ".")).toFixed(
          2
        ),
        description: formState.description,
        regGroupType: formState.category,
        registerType: formState.type === "Entrada" ? "INCOME" : "COST",
        balance: 0,
        user: user,
        registerDate: formattedDate,
      };

      const typeUrl = formState.type === "Entrada" ? "income" : "cost";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      };

      const response = await fetch(
        `http://${IP}:8080/register/${typeUrl}`,
        options
      );
      const data = await response.json();
      console.log("Resposta do servidor:", data);
      return data;
    } catch (error) {
      console.error("Erro na solicitação:", error);
      throw error;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const info = await sendRequest();
    onSubmit(info);

    closeAddModal(false);
    toast.success("Cadastro realizado com sucesso!", {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const categoryOptions = [
    { value: "Casa", label: "Casa" },
    { value: "Educação", label: "Educação" },
    { value: "Eletrônicos", label: "Eletrônicos" },
    { value: "Lazer", label: "Lazer" },
    { value: "Outros", label: "Outros" },
    { value: "Restaurante", label: "Restaurante" },
    { value: "Saúde", label: "Saúde" },
    { value: "Serviços", label: "Serviços" },
    { value: "Supermercado", label: "Supermercado" },
    { value: "Transporte", label: "Transporte" },
    { value: "Vestuário", label: "Vestuário" },
    { value: "Viagem", label: "Viagem" }
  ];

  const typeOptions = [
    { value: "Entrada", label: "Entrada" },
    { value: "Saida", label: "Saída" }
  ];

  return (
    <div className="flex w-full h-full left-0 top-0 items-center justify-center fixed bg-modal-background"> {/* modal_container */}
      <div className="w-1/4 h-1/2 rounded-lg p-8 bg-color-bgforms border-2 border-solid border-color-bginputs"> {/* modal */}
        <div className="title">
          <h2>Cadastro</h2>
        </div>
        <form className="flex w-full items-center justify-center my-6"> {/* center_imputs */}
          <div className="grid grid-cols-2 gap-5 mt-2 justify-center"> {/* main_imputs */}
            <div className="w-full whitespace-nowrap items-center justify-center p-4"> {/* textfield */}
              <InputLayout label="Valor:" type="text" value={formState.amount} placeholder="0,00" onChange={handleChange} />
              {/*               <label htmlFor="value">Valor:</label>
              <input
                type="text"
                placeholder="0,00"
                name="amount"
                value={formState.amount}
                onChange={handleChange}
                required
              /> */}
            </div>
            <div className="w-full whitespace-nowrap items-center justify-center p-4"> {/* textfield */}
              <InputLayout label="Descrição:" type="text" value={formState.description} placeholder="Descrição" onChange={handleChange} />
              {/*               <label htmlFor="description">Descrição:</label>
              <input
                type="text"
                placeholder="Descrição"
                name="description"
                value={formState.description}
                onChange={handleChange}
                required
              /> */}
            </div>
            <div className="w-full whitespace-nowrap items-center justify-center p-4 -mt-12"> {/* textfield */}
              <SelectLayout label="Categoria:" id="regGroupType" value={formState.category} onChange={handleChange}
                options={categoryOptions}
              />
            </div>
            <div className="w-full whitespace-nowrap items-center justify-center p-4 -mt-12"> {/* textfield */}
              <SelectLayout label="Tipo:" id="type" value={formState.type} onChange={handleChange}
                options={typeOptions}
              />
            </div>
            <button
              type="submit"
              className="w-full h-1/2 bg-color-bginputs p-2 m-0 my-4 rounded-lg cursor-pointer" /* btn_submitCancel */
              onClick={() => closeAddModal(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full h-1/2 bg-color-bginputs p-2 m-0 my-4 rounded-lg cursor-pointer" /* btn_submit */
              onClick={handleSubmit}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
