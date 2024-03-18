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
    <div className="w-screen h-screen text-sm m-0 bg-color-background text-color-border-login select-none overflow-x-hidden"> {/* body */}
      <div className="grid w-full mx-auto my-0 gap-7 grid-cols-[14rem_auto]"> {/* container */}
        <SideBar />
        <main>
          <h1>Lista de Usuários</h1>
          <div className="justify-center items-center mt-12"> {/* tableUsers */}
            <UserTable rows={usersArray} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Users;
