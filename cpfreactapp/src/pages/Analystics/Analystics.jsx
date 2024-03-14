import React from "react";
import PieChart from "../../components/Charts/PieChart";
import SideBar from "../../components/SideBar";
import styles from "./Analystics.module.css";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

function Analystics() {
  return (
    <div className={styles.container}>
      <SideBar />
      <main>
        <h1>Gráficos</h1>
        <div className={styles.tableAnalystic}>
          <div className={styles.rowOne}>
            <PieChart data={[]} />
          </div>
          <div className={styles.rowTwo}>
            <div className="flex justify-content-center bg-slate-300 p-10">
              <p>chart2</p>
            </div>
          </div>
          <div className={styles.rowThree}> chart 3</div>
        </div>
      </main>
    </div>
  );
}

export default Analystics;
