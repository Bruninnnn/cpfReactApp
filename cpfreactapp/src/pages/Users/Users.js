import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";

import styles from "./Users.module.css";
import UserTable from "./UserTable";

function Users() {
  const [usersArray, setUsersArray] = useState();

  useEffect(() => {
    const nonParsedArrays = localStorage.getItem("users");
    if (nonParsedArrays) {
      const arrayParseado = JSON.parse(nonParsedArrays);
      setUsersArray(arrayParseado);
    }
  }, []);

  return (
    <div className={styles.container}>
      <SideBar />
      <main>
        <h1>Lista de Usuários</h1>
        <div className={styles.tableUsers}>
          <UserTable rows={usersArray} />
        </div>
      </main>
    </div>
  );
}

export default Users;
