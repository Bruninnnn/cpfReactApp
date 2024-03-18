import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./Home.module.css";

import { ModalComponent } from "../../components/Modals/ModalAdd";
import { ModalEdit } from "../../components/Modals/ModalEdit";
import SideBar from "../../components/SideBar";

import { Context } from "../../Context";
import { Table } from "./Table";

import AddIcon from "@mui/icons-material/Add";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import MoneyOffCsredOutlinedIcon from "@mui/icons-material/MoneyOffCsredOutlined";
import TollOutlinedIcon from "@mui/icons-material/TollOutlined";

function Home() {
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const { userContext, setContext } = useContext(Context);
  const redirect = useNavigate();
  const { IP } = require("../../env");

  function enter(userContext) {
    if (!userContext) {
      redirect("/");
    }
  }

  useEffect(() => {
    enter(userContext);
  });

  const [rows, setRows] = useState([]);

  const [rowToEdit, setRowToEdit] = useState(null);

  async function deleteRow(row) {
    const register = row;
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      };

      const response = await fetch(
        `http://${IP}:8080/register/delete`,
        options
      );
      const data = await response.json();
      console.log("Resposta do servidor:", data);
    } catch (error) {
      console.error("Erro na solicitação:", error);
      throw error;
    }
  }

  const handleDeleteRow = async (targetIndex) => {
    const row = rows[targetIndex];
    await deleteRow(row);
    setRows(rows.filter((_, idx) => idx !== targetIndex));
    toast.warn("Registro excluído com sucesso!", {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

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

  const [receipt, setReceipt] = useState();
  const [balance, setBalance] = useState();
  const [calendar, setCalendar] = useState();
  const [cost, setCost] = useState();

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  async function filterCalendar(calendar) {
    try {
      const response = await fetch(
        `http://${IP}:8080/register/filteredRegisters?date=${calendar}`,
        options
      );

      const responseData = await response.json();
      setRows(responseData);
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = userContext?.id;

        const response = await fetch(
          `http://${IP}:8080/register/registers?userId=${userId}`,
          options
        );
        const responseData = await response.json();
        setRows(responseData);
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };

    fetchData();
  }, [userContext?.id]);

  useEffect(() => {
    const receiptSum = rows.reduce((total, obj) => {
      if (obj.registerType === "INCOME") {
        return total + obj.registerValue;
      }
      return total;
    }, 0);

    const costSum = rows.reduce((total, obj) => {
      if (obj.registerType === "COST") {
        return total + obj.registerValue;
      }
      return total;
    }, 0);

    const balanceValue = receiptSum - costSum;

    setReceipt(
      receiptSum.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      })
    );
    setCost(
      costSum.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      })
    );
    setBalance(
      balanceValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      })
    );
  }, [rows]);

  return (
    <div className="w-screen h-screen text-sm m-0 bg-color-background text-color-border-login select-none overflow-x-hidden"> {/* body */}
      <div className="grid w-full mx-auto my-0 gap-8 grid-cols-[14rem_auto]"> {/* container */}
        <SideBar />
        <main>
          <h1>Controle Financeiro Pessoal</h1>
          <div className={styles.month}> {/* month */}
            <input
              id="calendar"
              type="month"
              onChange={(e) => {
                console.log(e.target.value);
                filterCalendar(e.target.value);
              }}
            ></input>
          </div>
          <div className={styles.balances}> {/* balances */}
            <div className={styles.receipt}> {/* receipt */}
              <span>
                <AttachMoneyOutlinedIcon />
              </span>
              <div className="middle"> {/* middle */}
                <div className="left"> {/* left */}
                  <h3>Receita</h3>
                  <h1>{receipt}</h1>
                </div>
              </div>
            </div>
            <div className={styles.balance}> {/* balance */}
              <span>
                <TollOutlinedIcon />
              </span>
              <div className="middle"> {/* middle */}
                <div className="left"> {/* left */}
                  <h3>Saldo</h3>
                  <h1>{balance}</h1>
                </div>
              </div>
            </div>
            <div className={styles.cost}> {/* cost */}
              <span>
                <MoneyOffCsredOutlinedIcon />
              </span>
              <div className="middle"> {/* middle */}
                <div className="left"> {/* left */}
                  <h3>Despesas</h3>
                  <h1>{cost}</h1>
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
              userContext={userContext}
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
              userContext={userContext}
            />
          )}
          <div className={styles.btnDiv}> {/* btnDiv */}
            <button
              className={styles.darkButton}
              onClick={() => setModalAddOpen(true)}
            >
              <AddIcon />
            </button>
          </div>

          <Table
            rows={rows}
            deleteRow={handleDeleteRow}
            editRow={handleEditRow}
          />
        </main>
      </div>
    </div>
  );
}

export default Home;
