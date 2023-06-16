import { React, useState } from "react";

import stylestable from "./Table.module.css";

import { ModalEdit } from "./ModalEdit";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";

export const Table = ({ rows, deleteRow }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={stylestable.recent_orders}>
      <h2>Extrato</h2>
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
                <td>{row.amount}</td>
                <td>{row.description}</td>
                <td>{row.category}</td>
                <td>{row.type}</td>
                <td>
                  <span className={stylestable.actions}>
                    <DeleteForeverIcon
                      onClick={() => deleteRow(idx)}
                      style={{ cursor: "pointer", fill: "#750a0a" }}
                    />
                    <CreateIcon
                      onClick={() => setModalOpen(true)}
                      style={{ cursor: "pointer", fontSize: "large" }}
                    />
                    {modalOpen && (
                      <ModalEdit
                        closeModal={() => {
                          setModalOpen(false);
                        }}
                      />
                    )}
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
