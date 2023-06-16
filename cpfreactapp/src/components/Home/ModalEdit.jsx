import React, { useState } from "react";

import stylesmodaledit from "./ModalEdit.module.css";

export const ModalEdit = ({ closeEditModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState({
    amount: "",
    description: "",
    category: "",
    type: "",
  });

  const handleChangeEdit = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();

    onSubmit(formState);

    console.log(formState);

    closeEditModal(false);
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
              <label for="value">Valor:</label>
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
              <label for="description">Descrição:</label>
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
              <label for="category">Categoria</label>
              <div className={stylesmodaledit.textfield_category}>
                <select
                  name="category"
                  id="category"
                  value={formState.category}
                  onChange={handleChangeEdit}
                  required
                >
                  <option value= "" disabled selected>
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
            <div className={stylesmodaledit.textfield}>
              <label for="type">Tipo:</label>
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
                  <option value="<KeyboardArrowUpOutlinedIcon />">
                    Entrada
                  </option>
                  <option value="<KeyboardArrowDownOutlinedIcon />">
                    Saída
                  </option>
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
