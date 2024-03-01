import React from "react";
import SideBar from "../../components/SideBar";
import styles from "./Analystics.module.css";
import PieChart from "../../components/Charts/PieChart";
import SimpleLineChart from "../../components/Charts/SimpleLineChart";


function Analystics() {
  return (
    <div className={styles.container}>
      <SideBar />
      <main>
        <h1>Analystics</h1>
        <div className={styles.tableAnalystic}>
          <div className={styles.rowOne}>
            <PieChart />
          </div>
          <div className={styles.rowTwo}>
            <div className="flex justify-content-center bg-slate-300 p-10">
              <p>chart2</p>
            </div>
          </div>
          <div className={styles.rowThree}>
            <div className="flex">
              <SimpleLineChart />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Analystics;
