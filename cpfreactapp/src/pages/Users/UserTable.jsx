import { React } from "react";

import stylestable from "./UserTable.module.css";

export const UserTable = ({ rows, deleteRow }) => {
  return (
    <div className={stylestable.recent_users}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
