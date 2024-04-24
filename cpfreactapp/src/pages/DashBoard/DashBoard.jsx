import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InputDate from "../../components/Input/InputDate";
import { ModalComponent } from "../../components/Modals/ModalAdd";
import { ModalEdit } from "../../components/Modals/ModalEdit";

import { Context } from "../../Context";
import { Table } from "./Table";

import { MdAdd, MdAttachMoney, MdMoneyOff, MdOutlineToll } from "react-icons/md";

import { toast } from "react-toastify";
import DashBoardBalances from "./DashBoardBalances";
import { CardWallet } from "../../components/Card/CardWallet";

function DashBoard() {
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
  const [data, setData] = useState();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [cost, setCost] = useState();

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, "0");
        const defaultValue = `${year}-${month}`;

        setSelectedMonth(defaultValue);

        if (!initialized) {
          await filterCalendar(defaultValue);
          setInitialized(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!initialized) {
      fetchData();
    }
  }, [initialized]);

  const handleMonthChange = useCallback(async (e) => {
    const monthValue = e.target.value;
    setSelectedMonth(monthValue);
    await filterCalendar(monthValue);
  }, []);

  async function filterCalendar(calendar) {
    try {
      const response = await fetch(
        `http://${IP}:8080/register/filteredRegisters?date=${calendar}`,
        options
      );

      const responseData = await response.json();
      if (responseData) {
        await setData(responseData);
      }
    } catch (err) {
      console.log(err);
    }
  }

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
    <div className="flex-col gap-4 mx-4">
      {/*       <main className="mt-4"> */}
      <h1 className="mt-4 mb-4">Registros</h1>
      <div className="inline-block mt-0 rounded-3xl">
        <InputDate
          id="calendarDashBoard"
          type="month"
          value={selectedMonth}
          onChange={handleMonthChange}
        />
      </div>
      <DashBoardBalances receipt={receipt} balance={balance} cost={cost} />
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
          primaryDefaultValue={rowToEdit !== null && rows[rowToEdit]}
          userContext={userContext}
        />
      )}
      <div className="flex mt-8 pr-0 pb-2"> {/* btnDiv */}
        <button
          className="bg-color-receipt h-8 w-16 rounded-2xl border-b-2 border-solid border-color-border text-[#ffffff]" /* darkButton */
          onClick={() => setModalAddOpen(true)}
        >
          <MdAdd />
        </button>
      </div>

      <div className="flex flex-row gap-4 w-full">
        <Table
          rows={rows}
          deleteRow={handleDeleteRow}
          editRow={handleEditRow}
        />
      </div>
      {/*       </main> */}
    </div>
  );
}

export default DashBoard;
