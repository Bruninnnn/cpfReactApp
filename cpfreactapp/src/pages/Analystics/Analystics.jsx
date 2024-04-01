import React, { useCallback, useEffect, useState } from "react";
import PieChartCategory from "../../components/Charts/PieChartCategory";
import SideBar from "../../components/SideBar";
import { defaults } from "chart.js";
import { BarChart } from "../../components/Charts/BarChart";
import { IP } from "../../env";
import PieChartCard from "../../components/Charts/PieChartCard";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

function Analystics() {
  const [data, setData] = useState();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [initialized, setInitialized] = useState(false);

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
      if (responseData) {
        await setData(responseData);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex h-dvh">
      <SideBar />
      <div className="flex flex-row w-screen h-screen"> {/* body */}
        <main className="p-7 mt-8">
          <h1 className="mb-4">Gráficos</h1>
          <div className="inline-block mt-4 rounded-[2rem]">
            <input
              id="calendar"
              type="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="bg-color-rows text-sm text-[#ffffff] border-2 border-[solid] border-color-border p-2 text-center [transition:all_450ms_ease] hover:[transition:all_450ms_ease] hover:[box-shadow:none]"
            />
          </div>
          <div className="flex w-full flex-wrap overflow-hidden mx-auto my-auto">
            <div className="w-full px-2 py-2 sm:w-full sm:px-1 sm:my-1 md:w-full md:px-2 md:my-1 lg:w-1/2 lg:px-1 lg:my-1 m-xlw-full ">
              <BarChart baseData={data} title={"Ganhos X Despesas:"} />
            </div>
            <div className="w-1/2 px-2 py-2 my-1 sm:w-full sm:px-1 sm:my-1 md:w-1/2 md:px-1 md:my-1 lg:w-1/2 lg:px-1 lg:my-1 m-xlw-1/2 ">
              <PieChartCategory baseData={data} title={"Categoria de Gasto Mensal:"} />
            </div>
            <div className="w-1/2 px-2 py-2 sm:w-full sm:px-1 sm:my-1 md:w-1/2 md:px-1 md:my-1 lg:w-1/2 lg:px-1 lg:my-1 m-xlw-1/2 ">
              <PieChartCard baseData={data} title={"Gastos com o cartão:"} />
            </div>
          </div>
        </main>
      </div >
    </div >
  );
}

export default Analystics;
