import React, { useContext, useState } from "react";

import { InputLayout } from "../Input/InputLayout"
import { SelectLayout } from "../Select/SelectLayout";

import { format } from "date-fns";
import { Context } from "../../Context";

import { toast } from "react-toastify";


export const ModalEdit = ({ closeEditModal, onSubmit, primaryDefaultValue }) => {
  const { userContext, setContext } = useContext(Context);
  const user = userContext;
  const { IP } = require("../../env");

  const [formState, setFormState] = useState(
    primaryDefaultValue || {
      amount: "",
      description: "",
      regGroupType: "",
      registerType: "",
    }
  );

  const handleChangeEdit = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  async function updateRegister() {
    try {
      const currentDate = new Date();
      const formattedDate = format(currentDate, "yyyy-MM-dd");

      const newRegister = {
        id: formState.id,
        registerValue: parseFloat(formState.amount.replace(",", ".")).toFixed(
          2
        ),
        description: formState.description,
        regGroupType: formState.regGroupType,
        registerType: formState.type === "Entrada" ? "INCOME" : "COST",
        balance: 0,
        user: user,
        registerDate: formattedDate,
      };
      ''
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRegister),
      };

      const response = await fetch(
        `http://${IP}:8080/register/update`,
        options
      );
      return await response.json();
    } catch (error) {
      console.error("Erro na solicitação:", error);
      throw error;
    }
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const newRegister = await updateRegister();
    onSubmit(newRegister);

    closeEditModal(false);
    toast.success("Registro atualizado com sucesso!", {
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

  console.log(formState)

  return (
    <div className="flex w-full h-full left-0 top-0 items-center justify-center fixed bg-modal-background"> {/* modal_container */}
      <div className="w-1/4 h-1/2 rounded-lg p-8 bg-color-bgforms border-2 border-solid border-color-bginputs"> {/* modal */}
        <div className="title">
          <h2>Editar</h2>
        </div>
        <form className="flex w-full items-center justify-center my-6">
          <div className="grid grid-cols-2 gap-5 mt-2 justify-center"> {/* main_inputs */}
            <div className="w-full whitespace-nowrap items-center justify-center p-4"> {/* textfield */}
              <InputLayout label="Valor:" type="text" value={formState.amount} placeholder="0,00" onChange={handleChangeEdit} />
              {/* <label htmlFor="amount">Valor:</label>
              <input
                type="text"
                placeholder="0,00"
                name="amount"
                value={formState.amount}
                onChange={handleChangeEdit}
                required
              /> */}
            </div>
            <div className="w-full whitespace-nowrap items-center justify-center p-4"> {/* textfield */}
              <InputLayout label="Descrição:" type="text" value={formState.description} placeholder="Descrição" onChange={handleChangeEdit} />
              {/* <label htmlFor="description">Descrição:</label>
              <input
                type="text"
                placeholder="Descrição"
                name="description"
                value={formState.description}
                onChange={handleChangeEdit}
                required
              /> */}
            </div>
            <div className="w-full whitespace-nowrap items-center justify-center p-4 -mt-12"> {/* textfield */}
              <SelectLayout label="Categoria:" id="regGroupType" value={formState.defaultValue} onChange={handleChangeEdit}
                options={categoryOptions}
              />
            </div>
            <div className="w-full whitespace-nowrap items-center justify-center p-4 -mt-12"> {/* textfield */}
              <SelectLayout label="Tipo:" id="type" value={formState.type} onChange={handleChangeEdit}
                options={typeOptions}
              />
            </div>

            <button
              type="submit"
              className="w-full h-1/2 bg-color-bginputs p-2 m-0 my-4 rounded-lg cursor-pointer" /* btn_submitCancel */
              onClick={() => closeEditModal(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full h-1/2 bg-color-bginputs p-2 m-0 my-4 rounded-lg cursor-pointer" /* btn_submit */
              onClick={handleSubmitEdit}
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
