import React, { useState } from "react";
import styles from "./Home.module.css";

import ModalComponent from "./ModalComponent";
import { Table } from "./Table";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MoneyOffCsredOutlinedIcon from "@mui/icons-material/MoneyOffCsredOutlined";
import TollOutlinedIcon from "@mui/icons-material/TollOutlined";
import CreateIcon from "@mui/icons-material/Create";

import { Link } from "react-router-dom";

function Home() {
  /* Const para funcionalidade de Abrir as Modals */
  const [modalAddOpen, setModalAddOpen] = useState(false);

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

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleSubmit = (newRow) => {
    setRows([...rows, newRow])
  }

   

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
                <span>
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
                <h1>0,00</h1>
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
                <h1>0,00</h1>
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
                <h1>0,00</h1>
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

        <Table rows={rows} deleteRow={handleDeleteRow} />

      </main>
    </div>
  );
}

export default Home;
