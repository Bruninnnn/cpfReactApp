import React, { useState } from "react";

import stylesmodal from "./ModalComponent.module.css";

import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

export const ModalComponent = ({ closeAddModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    {
      amount: "",
      description: "",
      category: "",
      type: "",
    }
  );

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formState);

    console.log(formState);

    closeAddModal(false);
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
              <label for="value">Valor:</label>
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
              <label for="description">Descrição:</label>
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
              <label for="category">Categoria</label>
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
                  <option value="Alimentação">Alimentação</option>
                  <option value="Compras">Compras</option>
                  <option value="Casa">Casa</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>
            <div className={stylesmodal.textfield}>
              <label for="type">Tipo:</label>
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
                  <option value="Entrada">
                    Entrada
                  </option>
                  <option value="Saida">
                    Saída
                  </option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className={stylesmodal.btn_submit}
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