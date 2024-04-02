import React from "react";
import PieChart from "../../components/Charts/PieChart";
import SideBar from "../../components/SideBar";
import styles from "./Analystics.module.css";

/* defaults.maintainAspectRatio = false;
defaults.responsive = true; */

function Analystics() {
  return (
    <div className="w-screen h-screen text-sm m-0 bg-color-background text-color-border-login select-none overflow-x-hidden"> {/* body */}
      <div className="grid w-full h-full mx-auto my-0 gap-7 grid-cols-[14rem_auto]"> {/* container */}
        <SideBar />
        <main>
          <h1>Gráficos</h1>
          <div className="grid grid-cols-[repeat(4,_1fr)] grid-rows-[repeat(4,_1fr)] gap-x-4 gap-y-4 auto-rows-[200px] h-4/5"> {/* tableAnalystic */}
            <div className="flex items-center justify-center bg-color-bgforms [grid-area:1_/_1_/_3_/_3]"> {/* rowOne */}
              <PieChart data={[]} />
            </div>
            <div className="flex items-center justify-center bg-color-bgforms [grid-area:1_/_3_/_3_/_5]"> {/* rowTwo */}
              <div className="flex justify-content-center bg-slate-300 p-10">
                <p>chart2</p>
              </div>
            </div>
            <div className="flex items-center justify-center bg-color-bgforms [grid-area:3_/_1_/_5_/_3]"> {/* rowThree */}
              <p>chart3</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Analystics;
