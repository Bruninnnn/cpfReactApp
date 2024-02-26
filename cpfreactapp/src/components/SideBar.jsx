import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from ".././Context";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

import styles from "./SideBar.module.css";

function SideBar() {
  const { userContext, setContext } = useContext(Context);

  return (
    <div className={styles.header}>
      <div className={styles.side_nav}>
        <div className={styles.menu}>
          <span>
            <MenuOutlinedIcon />
          </span>
          <h2>MENU</h2>
        </div>
        <ul>
          <li>
            <Link to="/home">
              <span>
                <DashboardIcon />
                <p>Cadastro</p>
              </span>
            </Link>
          </li>
        </ul>
        {userContext?.isAdmin && (
        <ul>
          <li className={styles.option}>
            <Link to="/analystics">
              <span>
                <DataUsageIcon className={styles.icon} />
                <p>Analystics</p>
              </span>
            </Link>
          </li>
        </ul>
        )}
        <ul>
          <li>
            <Link to="/aboutTech">
              <span>
                <PrecisionManufacturingIcon />
                <p>Tecnologia</p>
              </span>
            </Link>
          </li>
        </ul>
        {userContext?.isAdmin && (
          <ul>
            <li>
              <Link to="/teste">
                <span>
                  <RecentActorsIcon />
                  <p>Lista Usuários</p>
                </span>
              </Link>
            </li>
          </ul>
        )}
        <ul>
          <li>
            <Link to="/">
              <span
                onClick={() => {
                  setContext(null);
                }}
              >
                <ExitToAppOutlinedIcon className={styles.icon} />
                <p>Sair</p>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
