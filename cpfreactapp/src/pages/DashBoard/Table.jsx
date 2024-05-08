import { React } from "react";

import { MdDeleteForever, MdCreate, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="overflow-x-auto w-full max-h-[500px]">
      <table className="w-full text-base text-left table-auto text-color-border-login rounded-3xl max-h-[500px]">
        <thead className="text-base text-color-border-login uppercase bg-color-bginputs">
          <tr>
            <th scope="col" className="px-6 py-3">
              Valor
            </th>
            <th scope="col" className="px-6 py-3">
              Descrição
            </th>
            <th scope="col" className="px-6 py-3">
              Categoria
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, idx) => {
            return (
              <tr key={idx} className="bg-color-bgforms border-b-2 border-color-bginputs hover:bg-color-border">
                <th scope="row" className="px-6 py-4 font-medium text-color-border-login whitespace-nowrap">
                  {row.registerValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                  })}
                </th>
                <td className="px-6 py-4">
                  {row.description}
                </td>
                <td className="px-6 py-4">
                  {row.regGroupType}
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center justify-start text-center">
                    {row.registerType === "INCOME" ? (
                      <MdKeyboardArrowUp
                        style={{ fill: "#0a5c5a", fontSize: "24px" }}
                      />
                    ) : (
                      <MdKeyboardArrowDown
                        style={{ fill: "#5A2036", fontSize: "24px" }}
                      />
                    )}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center justify-start">
                    <MdDeleteForever
                      onClick={() => deleteRow(idx)}
                      style={{ cursor: "pointer", fill: "#750a0a", fontSize: "20px" }}
                    />
                    <MdCreate
                      onClick={() => editRow(idx)}
                      style={{ cursor: "pointer", fontSize: "20px" }}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table >
    </div >
  );
};