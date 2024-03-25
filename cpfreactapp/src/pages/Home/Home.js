import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./Home.module.css";

import { ModalComponent } from "../../components/Modals/ModalAdd";
import { ModalEdit } from "../../components/Modals/ModalEdit";
import SideBar from "../../components/SideBar";

import { Context } from "../../Context";
import { Table } from "./Table";

import { MdAdd, MdAttachMoney, MdMoneyOff, MdOutlineToll } from "react-icons/md";
import { DashBoardBalances } from "./DashBoardBalances";

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
    <div className="flex flex-row w-screen h-screen bg-color-background text-color-border-login overflow-hidden"> {/* body */}
      <SideBar />
      <div className="flex w-full h-full mx-auto my-0 gap-12"> {/* container */}
        <main className="p-7 mt-8">
          <h1 className="mb-4">Controle Financeiro Pessoal</h1>
          <div className="inline-block mt-4 rounded-[2rem]"> {/* month */}
            <input
              id="calendar"
              type="month"
              onChange={(e) => {
                console.log(e.target.value);
                filterCalendar(e.target.value);
              }}
              className="bg-color-rows text-sm text-[#ffffff] border-2 border-[solid] border-color-border p-2 text-center [transition:all_450ms_ease] hover:[transition:all_450ms_ease] hover:[box-shadow:none]"
            />
          </div>

          <DashBoardBalances
            receipt={receipt}
            balance={balance}
            cost={cost}
          />

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
          <div className="flex justify-end mt-14 pr-0 pb-2"> {/* btnDiv */}
            <button
              className="bg-color-receipt h-8 w-16 rounded-2xl border-b-2 border-solid border-color-border text-[#ffffff]" /* darkButton */
              onClick={() => setModalAddOpen(true)}
            >
              <MdAdd />
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
