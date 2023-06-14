import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MoneyOffCsredOutlinedIcon from "@mui/icons-material/MoneyOffCsredOutlined";
import TollOutlinedIcon from "@mui/icons-material/TollOutlined";
import React, { useState } from "react";
import styles from "./Home.module.css";
import ModalComponent from "./ModalComponent";

import { Link } from 'react-router-dom';

function Home() {
  const [open, setOpen] = useState(false);

  console.log(open);
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
              <button onClick={() => setOpen(true)}>
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
        {/* {open && <ModalComponent open={open} setOpenModal={setOpen} />} */}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle className={styles.dialogTitle}>Registro</DialogTitle>
          <DialogContent className={styles.dialogContent}>
            <ModalComponent />
          </DialogContent>
          <DialogActions style={{justifyContent: "space-between"}} className={styles.dialogActions}>
            <Button onClick = {() => ""}className={styles.dialogButtonConcluded}>
              Concluido
            </Button>
            <Button onClick={() => setOpen(false)} className={styles.dialogButtonClose}>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
        <div className={styles.recent_orders}>
          <h2>Extrato</h2>
          <table>
            <thead>
              <tr>
                <th>Valor</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>R$ 32,75</td>
                <td>Almoço</td>
                <td>Alimentação</td>
                <td>
                  <span className={styles.keyboardDown}>
                    <KeyboardArrowDownOutlinedIcon />
                  </span>
                </td>
              </tr>
              <tr>
                <td>R$ 875,90</td>
                <td>Dividas</td>
                <td>Outros</td>
                <td>
                  <span className={styles.keyboardDown}>
                    <KeyboardArrowDownOutlinedIcon />
                  </span>
                </td>
              </tr>
              <tr>
                <td>R$ 1500,45</td>
                <td>Salário</td>
                <td>Outros</td>
                <td>
                  <span className={styles.keyboardUp}>
                    <KeyboardArrowUpOutlinedIcon/>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Home;
