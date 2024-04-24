import React, { useCallback, useEffect, useState } from "react";
import PieChartCategory from "../../components/Charts/PieChartCategory";
import { defaults } from "chart.js";
import { BarChart } from "../../components/Charts/BarChart";
import { IP } from "../../env";
import PieChartCard from "../../components/Charts/PieChartCard";
import InputDate from "../../components/Input/InputDate";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

function Reports() {
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
    <div className="flex flex-col gap-4 mx-4">
      <h1 className="mb-4 mt-4">Gráficos</h1>
      <div className="inline-block -mt-4 rounded-3xl">
        <InputDate
          id="calendarReports"
          type="month"
          value={selectedMonth}
          onChange={handleMonthChange}
        />
      </div>
      <div className="flex gap-x-4 gap-y-4 flew-row w-full flex-wrap mx-0 my-0 md:flex-col">
        <div className="flex-none w-full px-0 py-0 m-sm:w-full m-sm:px-0 m-sm:my-0 m-lg:px-0 m-lg:w-full ">
          <BarChart baseData={data} title={"Ganhos X Despesas:"} />
        </div>
        <div className="flex-1 w-1/2 px-0 py-0 m-sm:w-full m-sm:px-0 m-sm:my-0 m-lg:px-0 m-lg:w-1/2 ">
          <PieChartCategory baseData={data} title={"Categoria de Gasto Mensal:"} />
        </div>
        <div className="flex-1 w-1/2 px-0 py-0 m-sm:w-full m-sm:px-0 m-sm:my-0 m-lg:px-0 m-lg:w-1/2 ">
          <PieChartCard baseData={data} title={"Gastos com o cartão:"} />
        </div>
      </div>
    </div >
  );
}

export default Reports;