import React, { useCallback, useEffect, useState } from "react";
import PieChart from "../../components/Charts/PieChart";
import SideBar from "../../components/SideBar";
const { IP } = require("../../env");

/* defaults.maintainAspectRatio = false;
defaults.responsive = true; */

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
    <div className="w-screen h-screen text-sm m-0 bg-color-background text-color-border-login select-none overflow-x-hidden">
      {" "}
      {/* body */}
      <div className="grid w-full h-full mx-auto my-0 gap-7 grid-cols-[14rem_auto]">
        {" "}
        {/* container */}
        <SideBar />
        <main>
          <h1>Gráficos</h1>
          <div className="transition-all duration-450 ease-in bg-transparent bg-secondary text-white rounded-lg border border-gray-900 p-2 text-center shadow-lg hover:shadow-none">
            <input
              id="calendar"
              type="month"
              value={selectedMonth}
              onChange={handleMonthChange}
            ></input>
          </div>
          <div className="grid grid-cols-[repeat(4,_1fr)] grid-rows-[repeat(4,_1fr)] gap-x-4 gap-y-4 auto-rows-[200px] h-4/5">
            {" "}
            {/* tableAnalystic */}
            <div className="flex items-center justify-center bg-color-bgforms [grid-area:1_/_1_/_3_/_3]">
              {" "}
              {/* rowOne */}
              <PieChart baseData={data} />
            </div>
            <div className="flex items-center justify-center bg-color-bgforms [grid-area:1_/_3_/_3_/_5]">
              {" "}
              {/* rowTwo */}
              <div className="flex justify-content-center bg-slate-300 p-10">
                <p>chart2</p>
              </div>
            </div>
            <div className="flex items-center justify-center bg-color-bgforms [grid-area:3_/_1_/_5_/_3]">
              {" "}
              {/* rowThree */}
              <p>chart3</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Analystics;
