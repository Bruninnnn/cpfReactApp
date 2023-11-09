import React, { useState } from "react";
import { toast } from "react-toastify";

import stylesmodal from "./ModalAdd.module.css";

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

  return (
    <div className={stylesmodal.modal_container}>
      <div className={stylesmodal.modal}>
        <div className={stylesmodal.title}>
          <h2>Cadastro</h2>
        </div>
        <form className={stylesmodal.center_imputs}>
          <div className={stylesmodal.main_imputs}>
            <div className={stylesmodal.textfield}>
              <label htmlFor="value">Valor:</label>
              <input
                type="text"
                placeholder="0,00"
                name="amount"
                value={formState.amount}
                onChange={handleChange}
                required
              />
            </div>
            <div className={stylesmodal.textfield}>
              <label htmlFor="description">Descrição:</label>
              <input
                type="text"
                placeholder="Descrição"
                name="description"
                value={formState.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className={stylesmodal.textfield}>
              <label htmlFor="category">Categoria</label>
              <div className={stylesmodal.textfield_category}>
                <select
                  name="category"
                  id="category"
                  value={formState.category}
                  onChange={handleChange}
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
            <div className={stylesmodal.textfield}>
              <label htmlFor="type">Tipo:</label>
              <div className={stylesmodal.textfield_type}>
                <select
                  name="type"
                  id="type"
                  value={formState.type}
                  onChange={handleChange}
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
            <button
              type="submit"
              className={stylesmodal.btn_submitCancel}
              onClick={() => closeAddModal(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={stylesmodal.btn_submit}
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
