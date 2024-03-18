import React from "react";
import stylesabout from "./StylesAbout.module.css";

export const ModalAbout = ({ closeModalAbout, imagem }) => {

  return (
    <div className="flex w-full h-full left-0 top-0 items-center justify-center fixed z-[1] text-sm"> {/* modal_container */}
      <div className="w-[85%] h-[70vh] rounded-lg p-8 bg-color-bgforms border-2 border-solid border-color-bginputs"> {/* modal */}
        <div className="flex flex-col w-full h-full items-center justify-center mt-2 mb-6 pb-6"> {/* center */}
          <img src={imagem} alt="imagem" className="w-full h-full object-contain" />
        </div>
        <div>
          <button
            type="submit"
            className="w-full h-full text-white-primary bg-color-bginputs p-1 rounded-lg cursor-pointer" /* btn_cancel */
            onClick={closeModalAbout}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};