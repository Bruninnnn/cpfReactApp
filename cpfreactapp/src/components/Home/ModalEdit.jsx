import React, { useContext, useState } from "react";

import stylesmodaledit from "./ModalEdit.module.css";
import { format } from "date-fns";
import { Context } from "../../Context";

export const ModalEdit = ({ closeEditModal, onSubmit, defaultValue }) => {
  const { userContext, setContext } = useContext(Context);
  const user = userContext;

  const [formState, setFormState] = useState(
    defaultValue || {
      amount: "",
      description: "",
      category: "",
      type: "",
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
      const formattedDate = format(currentDate, 'yyyy-MM-dd');

      const newRegister = {
        id: formState.id,
        registerValue: parseFloat(formState.amount.replace(",", ".")).toFixed(2),
        description: formState.description,
        regGroupType: formState.category,
        registerType: formState.type === 'Entrada' ? 'INCOME' : 'COST',
        balance: 0,
        user: user,
        registerDate: formattedDate,
      };

      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRegister),
      };

      const response = await fetch(`http://192.168.0.107:8080/register/update`, options);
      return await response.json();
    } catch (error) {
      console.error('Erro na solicitação:', error);
      throw error;
    }
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const newRegister = await updateRegister();
    onSubmit(newRegister);

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
              <label htmlFor="value">Valor:</label>
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
              <label htmlFor="category">Categoria</label>
              <div className={stylesmodaledit.textfield_category}>
                <select
                  name="category"
                  id="category"
                  value={formState.category}
                  onChange={handleChangeEdit}
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
                  <option value="Entrada">
                    Entrada
                  </option>
                  <option value="Saida">
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
