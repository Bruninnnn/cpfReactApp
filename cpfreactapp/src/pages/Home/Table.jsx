import { React } from "react";

import stylestable from "./Table.module.css";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className={stylestable.recent_orders}>
      <table>
        <thead>
          <tr>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>
                  {row.registerValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td>{row.description}</td>
                <td>{row.regGroupType}</td>
                <td>
                  {row.registerType === "INCOME" ? (
                    <KeyboardArrowUpOutlinedIcon style={{ fill: "#0a5c5a" }} />
                  ) : (
                    <KeyboardArrowDownOutlinedIcon
                      style={{ fill: "#5A2036" }}
                    />
                  )}
                </td>
                <td>
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
