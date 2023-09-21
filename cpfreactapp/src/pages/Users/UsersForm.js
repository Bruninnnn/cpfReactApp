import React from "react";
import SideBar from "../../components/SideBar";

import styles from "./UsersForm.module.css";
import UserTable from "./UserTable";

function UsersForm() {
  
  const rows = [];
  const person1 = { id: 1, name: "Teste", email: "teste@gmail.com" };
  const person2 = { id: 1, name: "Teste", email: "teste@gmail.com" };
  const person3 = { id: 1, name: "Teste", email: "teste@gmail.com" };
  const person4 = { id: 1, name: "Teste", email: "teste@gmail.com" };
  const person5 = { id: 1, name: "Teste", email: "teste@gmail.com" };
  const person6 = { id: 1, name: "Teste", email: "teste@gmail.com" };
  const person7 = { id: 1, name: "Teste", email: "teste@gmail.com" };
  const person8 = { id: 1, name: "Teste", email: "teste@gmail.com" };
  const person9 = { id: 1, name: "Teste", email: "teste@gmail.com" };
  const person10 = { id: 1, name: "Teste", email: "teste@gmail.com" };

  rows.push(
    person1,
    person2,
    person3,
    person4,
    person5,
    person6,
    person7,
    person8,
    person9,
    person10
  );
  return (
    <div className={styles.container}>
      <SideBar />
      <main>
        <h1>Lista de Usuários</h1>
        <div className={styles.tableUsers}>
          <UserTable rows={rows} />
        </div>
      </main>
    </div>
  );
}

export default UsersForm;
