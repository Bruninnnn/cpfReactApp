import { React } from "react";

import stylestable from "./UserTable.module.css";

export const UserTable = ({ rows, deleteRow }) => {
  return (
    <div className="max-h-[640px] w-[66vw] overflow-x-hidden overflow-y-auto rounded-lg [transition:all_500ms]"> {/* recent_users */}
      <table className="w-3/5 h-auto rounded-lg border-2 border-solid border-color-border p-2 text-center [transition:all_300ms_ease] text-[#c9c9c9] h-12 p-2 border-solid border-b-2 border-b-color-bginputs">
        <thead>
          <tr>
            <th className="text-[1rem] tracking-[2px] uppercase">ID</th>
            <th className="text-[1rem] tracking-[2px] uppercase">Nome</th>
            <th className="text-[1rem] tracking-[2px] uppercase">Email</th>
            <th className="text-[1rem] tracking-[2px] uppercase">Data de Nascimento</th>
          </tr>
        </thead>
        <tbody className="overflow-auto max-h-[640px]">
          {rows?.map((row, idx) => {
            return (
              <tr key={idx}>
                <td className="text-base tracking-[1.5px] overflow-ellipsis">{row?.id}</td>
                <td className="text-base tracking-[1.5px] overflow-ellipsis">{row?.name}</td>
                <td className="text-base tracking-[1.5px] overflow-ellipsis">{row?.email}</td>
                <td className="text-base tracking-[1.5px] overflow-ellipsis">{row?.birthDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
