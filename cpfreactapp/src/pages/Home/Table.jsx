import { React } from "react";

import stylestable from "./Table.module.css";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="overflow-x-hidden overflow-y-auto max-h-[300px] w-3/5 [transition:all_500ms] rounded-lg mb-2"> {/* recent_orders */}
      <table className="w-3/5 h-auto rounded-lg border-2 border-solid border-color-border p-2 text-center [transition:all_300ms_ease] text-[#c9c9c9] h-12 p-2 border-solid border-b-2 border-b-color-bginputs">
        <thead>
          <tr>
            <th className="text-[1rem] tracking-[2px]">Valor</th>
            <th className="text-[1rem] tracking-[2px]">Descrição</th>
            <th className="text-[1rem] tracking-[2px]">Categoria</th>
            <th className="text-[1rem] tracking-[2px]">Status</th>
            <th className="text-[1rem] tracking-[2px]">Ações</th>
          </tr>
        </thead>
        <tbody className="text-[#c9c9c9] h-12 p-2 border-solid border-b-2 border-b-color-bginputs">
          {rows?.map((row, idx) => {
            return (
              <tr key={idx}>
                <td className="text-[#c9c9c9] h-12 p-2 border-solid border-b-2 border-b-color-bginputs">
                  {row.registerValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className="text-[#c9c9c9] h-12 p-2 border-solid border-b-2 border-b-color-bginputs">{row.description}</td>
                <td className="text-[#c9c9c9] h-12 p-2 border-solid border-b-2 border-b-color-bginputs">{row.regGroupType}</td>
                <td className="text-[#c9c9c9] h-12 p-2 border-solid border-b-2 border-b-color-bginputs">
                  {row.registerType === "INCOME" ? (
                    <KeyboardArrowUpOutlinedIcon style={{ fill: "#0a5c5a" }} />
                  ) : (
                    <KeyboardArrowDownOutlinedIcon
                      style={{ fill: "#5A2036" }}
                    />
                  )}
                </td>
                <td className="text-[#c9c9c9] h-12 p-2 border-solid border-b-2 border-b-color-bginputs">
                  <span className={stylestable.actions}>
                    <DeleteForeverIcon
                      onClick={() => deleteRow(idx)}
                      style={{ cursor: "pointer", fill: "#750a0a" }}
                    />
                    <CreateIcon
                      onClick={() => editRow(idx)}
                      style={{ cursor: "pointer", fontSize: "large" }}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
