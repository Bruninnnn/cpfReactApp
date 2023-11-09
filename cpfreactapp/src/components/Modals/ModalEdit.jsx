import React, { useContext, useState } from "react";

import stylesmodaledit from "./ModalEdit.module.css";

import { format } from "date-fns";
import { Context } from "../../Context";

import { toast } from "react-toastify";

export const ModalEdit = ({ closeEditModal, onSubmit, defaultValue }) => {
  const { userContext, setContext } = useContext(Context);
  const user = userContext;
  const { IP } = require("../../env");

  const [formState, setFormState] = useState(
    defaultValue || {
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
      console.log(defaultValue);
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

  return (
    <div className={stylesmodaledit.modal_container}>
      <div className={stylesmodaledit.modal}>
        <div className={stylesmodaledit.title}>
          <h2>Editar</h2>
        </div>
        <form>
          <div className={stylesmodaledit.main_imputs}>
            <div className={stylesmodaledit.textfield}>
              <label htmlFor="amount">Valor:</label>
              <input
                type="text"
                placeholder="0,00"
                name="amount"
                value={formState.amount}
                onChange={handleChangeEdit}
                required
              />
            </div>
            <div className={stylesmodaledit.textfield}>
              <label htmlFor="description">Descrição:</label>
              <input
                type="text"
                placeholder="Descrição"
                name="description"
                value={formState.description}
                onChange={handleChangeEdit}
                required
              />
            </div>
            <div className={stylesmodaledit.textfield}>
              <label htmlFor="regGroupType">Categoria</label>
              <div className={stylesmodaledit.textfield_category}>
                <select
                  name="regGroupType"
                  id="regGroupType"
                  value={formState.regGroupType}
                  onChange={handleChangeEdit}
                  required
                >
                  <option value="" disabled selected>
                    Selecione...
                  </option>
                  <option value="Casa">Casa</option>
                  <option value="Educação">Educação</option>
                  <option value="Eletrônicos">Eletrônicos</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Outros">Outros</option>
                  <option value="Restaurante">Restaurante</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Serviços">Serviços</option>
                  <option value="Supermercado">Supermercado</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Vestuário">Vestuário</option>
                  <option value="Viagem">Viagem</option>
                </select>
              </div>
            </div>
            <div className={stylesmodaledit.textfield}>
              <label htmlFor="type">Tipo:</label>
              <div className={stylesmodaledit.textfield_type}>
                <select
                  name="type"
                  id="type"
                  value={formState.type}
                  onChange={handleChangeEdit}
                  required
                >
                  <option value="" disabled selected>
                    Selecione...
                  </option>
                  <option value="Entrada">Entrada</option>
                  <option value="Saida">Saída</option>
                </select>
              </div>
            </div>
          </div>
          <div className={stylesmodaledit.button_teste}>
            <button
              type="submit"
              className={stylesmodaledit.btn_submit}
              onClick={() => closeEditModal(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={stylesmodaledit.btn_submit}
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
