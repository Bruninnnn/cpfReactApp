import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./Home.module.css";

import { ModalComponent } from "../../components/Modals/ModalAdd";
import { ModalEdit } from "../../components/Modals/ModalEdit";

import { Table } from "./Table";
import { Context } from "../../Context";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MoneyOffCsredOutlinedIcon from "@mui/icons-material/MoneyOffCsredOutlined";
import TollOutlinedIcon from "@mui/icons-material/TollOutlined";
import DataUsageIcon from "@mui/icons-material/DataUsage";

function Home() {
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const { userContext, setContext } = useContext(Context);
  const redirect = useNavigate();

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
        `http://192.168.3.11:8080/register/delete`,
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
  const [cost, setCost] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = userContext?.id;

        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(
          `http://192.168.3.11:8080/register/registers?userId=${userId}`,
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
            <li className={styles.option}>
              <button>
                <span>
                  <AddCircleOutlineOutlinedIcon className={styles.icon} />
                </span>
                {"Add"}
              </button>
            </li>
          </ul>
          <ul>
            <li className={styles.option}>
              <Link to="/analystics">
                <span>
                  <DataUsageIcon className={styles.icon} />
                </span>
                {"Analystics"}
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/aboutTech">
                <span></span>
                <p></p>
                {"Tecnologia"}
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/">
                <span
                  onClick={() => {
                    setContext(null);
                  }}
                >
                  <ExitToAppOutlinedIcon className={styles.icon} />
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/*<Sidebar />*/}
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
                <h1>{receipt}</h1>
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
                <h1>{balance}</h1>
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
        <Table
          rows={rows}
          deleteRow={handleDeleteRow}
          editRow={handleEditRow}
        />
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          color="white"
          onClick={() => setModalAddOpen(true)}
        >
          Add
        </Button>
      </main>
    </div>
  );
}

export default Home;
