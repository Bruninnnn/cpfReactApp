import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* import styles from "./Home.module.css"; */

import { ModalComponent } from "../../components/Modals/ModalAdd";
import { ModalEdit } from "../../components/Modals/ModalEdit";
import SideBar from "../../components/SideBar";

import { Context } from "../../Context";
import { Table } from "./Table";

import {
  MdAdd,
  MdAttachMoney,
  MdMoneyOff,
  MdOutlineToll,
} from "react-icons/md";
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
    <div className="flex flex-row w-screen h-dvh bg-color-background text-color-border-login overflow">
      {" "}
      {/* body */}
      <SideBar />
      <div className="flex w-full h-full mx-4 my-0 justify-center">
        {" "}
        {/* container */}
        <main className="ml-24 mt-8">
          <h1 className="mb-4">Registros</h1>
          <div className="inline-block mt-4 rounded-[2rem]">
            {" "}
            {/* month */}
            <input
              id="calendar"
              type="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="bg-color-rows text-sm text-[#ffffff] border-2 border-[solid] border-color-border p-2 text-center [transition:all_450ms_ease] hover:[transition:all_450ms_ease] hover:[box-shadow:none]"
            />
          </div>
          <div className="flex m-lg:flex-row m-sm:m-md:flex-col w-full m-xl:w-[95%] h-1/4 m-md:h-3/4 m-lg:h-1/4 mt-10 m-md:gap-8 m-lg:gap-8 m-xl:gap-40 m-2xl:gap-56">
            {" "}
            {/* balances */}
            <div className="bg-color-rows p-4 w-[15vw] m-md:w-full m-lg:w-[22vw] m-xl:w-[20vw] h-[18vh] rounded-3xl mt-2 border border-[solid] border-color-border [transition:all_300ms_ease]">
              {" "}
              {/* receipt */}
              <span>
                <MdAttachMoney
                  style={{ fontSize: "2.5rem" }}
                  className="bg-color-receipt justify-center text-center p-1.5 mb-2 rounded-full"
                />
              </span>
              <div className="middle">
                {" "}
                {/* middle */}
                <h3 className="mb-4 text-[1rem] mt-1">Receita</h3>
                <h1>{receipt}</h1>
              </div>
            </div>
            <div className="bg-color-rows p-4 w-[15vw] m-md:w-full m-lg:w-[22vw] m-xl:w-[20vw] h-[18vh] rounded-3xl mt-2 border border-[solid] border-color-border [transition:all_300ms_ease]">
              {" "}
              {/* balance */}
              <span>
                <MdOutlineToll
                  style={{ fontSize: "2.5rem" }}
                  className="bg-color-bginputs justify-center text-center p-1.5 mb-2 rounded-full"
                />
              </span>
              <div className="middle">
                {" "}
                {/* middle */}
                <div className="left">
                  {" "}
                  {/* left */}
                  <h3 className="mb-4 text-[1rem] mt-1">Saldo</h3>
                  <h1>{balance}</h1>
                </div>
              </div>
            </div>
            <div className="bg-color-rows p-4 w-[15vw] m-md:w-full m-lg:w-[22vw] m-xl:w-[20vw] h-[18vh] rounded-3xl mt-2 border-[1px] border-[solid] border-color-border [transition:all_300ms_ease]">
              {" "}
              {/* cost */}
              <span>
                <MdMoneyOff
                  style={{ fontSize: "2.5rem" }}
                  className="bg-color-cost justify-center text-center p-1.5 mb-2 rounded-full"
                />
              </span>
              <div className="middle">
                {" "}
                {/* middle */}
                <div className="left">
                  {" "}
                  {/* left */}
                  <h3 className="mb-4 text-[1rem] mt-1">Despesas</h3>
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
          <div className="flex justify-end mt-14 pr-0 pb-2">
            {" "}
            {/* btnDiv */}
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
