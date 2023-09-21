import React from "react";
import { Chart } from "react-google-charts";
import SideBar from "../../components/SideBar";

import styles from "./Analystics.module.css";

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
    backgroundColor: "#09090b",
    tooltip: {
      textStyle: {
        color: "#09090b",
      },
      trigger: "hover",
      backgroundColor: "#f0fd"
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
    }
  };

  return (
    <div className={styles.container}>
      <SideBar />
      <Chart
        chartType="PieChart"
        width="200%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}

export default Analystics;
