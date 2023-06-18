import React, { useContext, useState } from "react";
import styles from "./Home.module.css";

import { ModalComponent } from "./ModalComponent";
import { Table } from "./Table";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MoneyOffCsredOutlinedIcon from "@mui/icons-material/MoneyOffCsredOutlined";
import TollOutlinedIcon from "@mui/icons-material/TollOutlined";

import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import { ModalEdit } from "./ModalEdit";

function Home() {
  /* Const para funcionalidade de Abrir as Modals */
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const { userContext, setContext } = useContext(Context);
  console.log(userContext);

  const [rows, setRows] = useState([
    {
      amount: "135,57",
      description: "teste",
      category: "Alimentação",
      type: <KeyboardArrowDownOutlinedIcon style={{ fill: "#5A2036" }} />,
    },
    {
      amount: "5523,39",
      description: "Salário",
      category: "Contas",
      type: <KeyboardArrowUpOutlinedIcon style={{ fill: "#0a5c5a" }} />,
    },
    {
      amount: "1423,94",
      description: "Mercado",
      category: "Alimentação",
      type: <KeyboardArrowDownOutlinedIcon style={{ fill: "#5A2036" }} />,
    },
  ]);

  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const navigate = useNavigate();

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalEditOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.side_nav}>
          <div className={styles.menu}>
            <span>
              <MenuOutlinedIcon />
            </span>
            <h2>MENU</h2>
          </div>
          <ul>
            <li>
              <button onClick={() => setModalAddOpen(true)}>
                <span>
                  <AddCircleOutlineOutlinedIcon />
                </span>
                <p>Add</p>
              </button>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/">
                <span
                  onClick={() => {
                    setContext(null);
                    navigate("/");
                  }}
                >
                  <ExitToAppOutlinedIcon />
                </span>
                <p>Sair</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <main>
        <h1>Controle Financeiro Pessoal</h1>
        <div className={styles.balances}>
          <div className={styles.receipt}>
            <span>
              <AttachMoneyOutlinedIcon />
            </span>
            <div className={styles.middle}>
              <div className={styles.left}>
                <h3>Receita</h3>
                <h1>{/*receipt*/}</h1>
              </div>
            </div>
          </div>
          <div className={styles.balance}>
            <span>
              <TollOutlinedIcon />
            </span>
            <div className={styles.middle}>
              <div className={styles.left}>
                <h3>Saldo</h3>
                <h1>{/*balance*/}</h1>
              </div>
            </div>
          </div>
          <div className={styles.cost}>
            <span>
              <MoneyOffCsredOutlinedIcon />
            </span>
            <div className={styles.middle}>
              <div className={styles.left}>
                <h3>Despesas</h3>
                <h1>{/*cost*/}</h1>
              </div>
            </div>
          </div>
        </div>

        {modalAddOpen && (
          <ModalComponent
            closeAddModal={() => {
              setModalAddOpen(false);
            }}
            onSubmit={handleSubmit}
          />
        )}

        {modalEditOpen && (
          <ModalEdit
            closeEditModal={() => {
              setModalEditOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null && rows[rowToEdit]}
          />
        )}

        <Table
          rows={rows}
          deleteRow={handleDeleteRow}
          editRow={handleEditRow}
        />
      </main>
    </div>
  );
}

export default Home;
