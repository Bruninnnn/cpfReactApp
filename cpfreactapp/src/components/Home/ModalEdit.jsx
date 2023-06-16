import React from "react";

import stylesmodaledit from "./ModalEdit.module.css";

export const ModalEdit = ({ closeModal, on }) => {
  return (
    <div className={stylesmodaledit.modal_container}>
      <div className={stylesmodaledit.modal}>
        <form>
          <div className={stylesmodaledit.main_imputs}>
            <div className={stylesmodaledit.textfield}>
              <label for="value">Valor:</label>
              <input 
                type="text" 
                placeholder="0,00" 
                name="amount" 
                required 
              />
            </div>
            <div className={stylesmodaledit.textfield}>
              <label for="description">Descrição:</label>
              <input
                type="text"
                placeholder="Descrição"
                name="description"
                required
              />
            </div>
            <div className={stylesmodaledit.textfield}>
              <label for="category">Categoria</label>
              <div className={stylesmodaledit.textfield_category}>
                <select id="category" name="category" required>
                  <option disabled selected>
                    Selecione...
                  </option>
                  <option value="1">Alimentação</option>
                  <option value="2">Compras</option>
                  <option value="3">Casa</option>
                  <option value="4">Saúde</option>
                  <option value="5">Lazer</option>
                  <option value="6">Transporte</option>
                  <option value="7">Outros</option>
                </select>
              </div>
            </div>
            <div className={stylesmodaledit.textfield}>
              <label for="type">Tipo:</label>
              <div className={stylesmodaledit.textfield_type}>
                <select 
                  name="type" 
                  id="type" 
                  required
                >
                  <option value="" disabled selected>
                    Selecione...
                  </option>
                  <option value="KeyboardArrowUpOutlinedIcon">Entrada</option>
                  <option value="KeyboardArrowDownOutlinedIcon">Saída</option>
                </select>
              </div>
            </div>
          </div>
          <div className={stylesmodaledit.button_teste}>
            <button
              type="submit"
              onClick={() => closeModal(false)}
              className={stylesmodaledit.btn_submit}
            >
              Cancelar
            </button>
            <button type="submit" className={stylesmodaledit.btn_submit}>
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
