import React from "react";
import PieChart from "../../components/Charts/PieChart";
import SideBar from "../../components/SideBar";
import { defaults } from "chart.js";
import { BarChart } from "../../components/Charts/BarChart";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

function Analystics() {
  return (
    <div className="flex h-dvh">
      <SideBar />
      <div className="flex flex-row w-screen h-screen"> {/* body */}
        <main className="p-7 mt-8">
          <h1 className="mb-4">Gráficos</h1>
          <div className="flex w-full flex-wrap overflow-hidden mx-auto my-auto">
            <div className="w-full px-2 py-2 sm:w-full sm:px-1 sm:my-1 md:w-full md:px-2 md:my-1 lg:w-1/2 lg:px-1 lg:my-1 m-xlw-full ">
              <BarChart title={"Ganhos X Despesas:"} />
            </div>
            <div className="w-1/2 px-2 py-2 my-1 sm:w-full sm:px-1 sm:my-1 md:w-1/2 md:px-1 md:my-1 lg:w-1/2 lg:px-1 lg:my-1 m-xlw-1/2 ">
              <PieChart title={"Categoria de Gasto Mensal:"} />
            </div>
            <div className="w-1/2 px-2 py-2 sm:w-full sm:px-1 sm:my-1 md:w-1/2 md:px-1 md:my-1 lg:w-1/2 lg:px-1 lg:my-1 m-xlw-1/2 ">
              <PieChart title={"Gastos com o cartão:"} />
            </div>
          </div>
        </main>
      </div >
    </div >
  );
}

export default Analystics;
