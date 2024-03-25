import React from "react";
import PieChart from "../../components/Charts/PieChart";
import SideBar from "../../components/SideBar";
import styles from "./Analystics.module.css";
import { defaults } from "chart.js";
import { BarChart } from "../../components/Charts/BarChart";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

function Analystics() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-row gap-80"> {/* body */}
        <main className="p-7 mt-8 w-full">
          <h1 className="mb-4">Gráficos</h1>
          <div className="flex flex-row gap-8 w-full">
            <BarChart title={"Gastos X Despesas:"}/>
          </div>
          <div className="flex flex-row gap-8 w-full">
            <PieChart title={"Categoria de Gasto Mensal:"}/>
          </div>
          <div className="flex flex-row gap-8 w-full">
            <PieChart title={"Gastos com o cartão:"}/>
          </div>
        </main>
      </div >
    </div >
  );
}

export default Analystics;
