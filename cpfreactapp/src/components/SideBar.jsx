import { React } from "react";

import styles from "./SideBar.module.css";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import DataUsageIcon from '@mui/icons-material/DataUsage';
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

function SideBar() {
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
          <li className={styles.option}>
            <Link to="/analystics">
              <span>
                <DataUsageIcon className={styles.icon} />
              </span>
              {"Analystics"}
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/aboutTech">
              <span></span>
              <p></p>
              {"Tecnologia"}
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/">
              <span
                onClick={() => {
                  setContext(null);
                }}
              >
                <ExitToAppOutlinedIcon className={styles.icon} />
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;