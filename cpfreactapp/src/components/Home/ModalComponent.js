import React from "react";
import stylesmodal from "./Modal.module.css";

function Modal({ open, setOpen }) {
  return (
    <>
      <form className={stylesmodal.center_imputs}>
        <div className={stylesmodal.main_imputs}>
          <div className={stylesmodal.textfield}>
            <label for="value">Valor:</label>
            <input 
              type="text" 
              placeholder="0,00" 
              id="amount" 
              required 
            />
          </div>
          <div className={stylesmodal.textfield}>
            <label for="description">Descrição:</label>
            <input
              type="text"
              placeholder="Descrição"
              id="description"
              required
            />
          </div>
          <div className={stylesmodal.textfield}>
            <label for="type">Tipo:</label>
            <div className={stylesmodal.textfield_type}>
              <select className={stylesmodal.type} id="type" required>
                <option value="" disabled selected>
                  Selecione...
                </option>
                <option value="1">Entrada</option>
                <option value="2">Saída</option>
              </select>
            </div>
          </div>
          <div className={stylesmodal.textfield}>
            <label for="category">Categoria</label>
            <div className={stylesmodal.textfield_category}>
              <select className={stylesmodal.category} id="category" required>
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
        </div>
      </form>
    </>
  );
}

export default Modal;
