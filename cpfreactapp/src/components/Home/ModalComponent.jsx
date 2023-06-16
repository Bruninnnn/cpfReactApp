import React, { useState } from "react";

import stylesmodal from "./ModalComponent.module.css";

export const ModalComponent = ({ closeAddModal, onSubmit }) => {

  const [formState, setFormState] = useState({
    amount: "",
    description: "",
    category: "",
    type: "",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formState)

    console.log(formState)

    closeAddModal(false);
  };

  return (
    <div className={stylesmodal.modal_container}>
      <div className={stylesmodal.modal}>
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
                  <option value="<KeyboardArrowUpOutlinedIcon />">Entrada</option>
                  <option value="<KeyboardArrowDownOutlinedIcon />">Saída</option>
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
              onClick={handleSubmit}>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalComponent; 