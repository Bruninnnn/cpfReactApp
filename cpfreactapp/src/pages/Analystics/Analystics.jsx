import React from "react";
import { Chart } from "react-google-charts";
import SideBar from "../../components/SideBar";

import styles from "./Analystics.module.css";
/* import PieChart from "../../components/PieChart"; */

function Analystics() {
  // Array que passa os dados para o cálculo do gráfico //
  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const options = {
    pieHole: 0.5,
    is3D: false,
    backgroundColor: "",
    tooltip: {
      textStyle: {
        color: "#09090b",
      },
      trigger: "hover",
      backgroundColor: "#f0fd",
    },
    pieSliceText: "none",
    pieSliceBorderColor: "#09090b",
    legend: {
      alignment: "center",
      fontName: "Quicksand",
      textStyle: {
        color: "#ffffff",
      },
    },
    slices: [{ color: "#0a5c5a" }, {}, {}, { color: "#3c1f2d" }],
    chartArea: {
      backgroundColor: "#09090b",
    },
  };

  return (
    <div className={styles.container}>
      <SideBar />
      <main>
        <h1>Analystics</h1>
        <div className={styles.tableAnalystic}>
          <div className={styles.rowOne}>
            <Chart
              chartType="PieChart"
              width="100%"
              height="200%"
              data={data}
              options={options}
            />
          </div>
          <div className={styles.rowTwo}>
            <Chart
              chartType="PieChart"
              width="100%"
              height="100%"
              data={data}
              options={options}
            />
          </div>
          <div className={styles.rowThree}>
            <Chart
              chartType="PieChart"
              width="100%"
              height="100%"
              data={data}
              options={options}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Analystics;
