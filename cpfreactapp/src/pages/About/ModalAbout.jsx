import React from "react";
import stylesabout from "./StylesAbout.module.css";

export const ModalAbout = ({ closeModalAbout, imagem }) => {
  
  return (
    <div className={stylesabout.modal_container}>
      <div className={stylesabout.modal}>
        <div className={stylesabout.center}>
          <img src={imagem} alt="imagem" />
        </div>
        <div>
        <button
          type="submit"
          className={stylesabout.btn_cancel}
          onClick={closeModalAbout}
        >
          Sair
        </button>
        </div>
      </div>
    </div>
  );
};