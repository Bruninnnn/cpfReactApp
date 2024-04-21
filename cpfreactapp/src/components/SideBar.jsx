import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from ".././Context";

import { MdDashboard, MdDataUsage, MdExitToApp } from "react-icons/md";
import { FcBullish } from "react-icons/fc"
import { VscDebugDisconnect } from "react-icons/vsc";
import { TbPigMoney } from "react-icons/tb";

export default function SideBar() {
  const { userContext, setContext } = useContext(Context);

  return (
    <aside className="relative flex flex-col w-60 h-screen">
      <div className="flex flex-col w-60 h-screen top-0 left-0 px-4 py-0 bg-color-bgforms">
        <div className="flex w-full p-2 mx-auto items-center border-b-2 border-color-border">
          <span>
            <FcBullish fontSize={32} />
          </span>
          <h2 className="mt-2 p-2 text-lg">ConnectBills</h2>
        </div>
        <div className="py-8 flex flex-1 flex-col gap-0.5 ">
          <Link to="/dashboard" className="flex items-center font-light px-0">
            <div className="flex w-full p-4 -mb-2 items-center hover:bg-color-border focus:bg-color-border">
              <span>
                <MdDashboard fontSize={24} />
              </span>
              <p className="mt-1 items-center px-2">Cadastro</p>
            </div>
          </Link>
          <Link to="/dashboard/reports" className="flex items-center font-light px-0">
            <div className="flex w-full p-4 -mb-2 items-center hover:bg-color-border">
              <span>
                <MdDataUsage fontSize={24} />
              </span>
              <p className="mt-1 items-center px-2">Relatórios</p>
            </div>
          </Link>
          <Link to="/openfinance" className="flex items-center font-light px-0">
            <div className="flex w-full p-4 -mb-2 items-center hover:bg-color-border">
              <span>
                <VscDebugDisconnect fontSize={24} />
              </span>
              <p className="mt-1 items-center px-2">OpenFinance</p>
            </div>
          </Link>
          <Link to="/dashboard/goals" className="flex items-center font-light px-0">
            <div className="flex w-full p-4 -mb-2 items-center hover:bg-color-border">
              <span>
                <TbPigMoney fontSize={24} />
              </span>
              <p className="mt-1 items-center px-2">Metas</p>
            </div>
          </Link>
        </div>

        <div className="relative flex items-end flex-1 mb-4">
          <div className="flex w-full p-4 items-center hover:bg-color-border">
            <Link to="/" className="flex items-center font-light px-0">
              <span>
                <MdExitToApp fontSize={24} />
              </span>
              <p className="mt-1 items-center px-2">Sair</p>
            </Link>
          </div>
        </div>
      </div>
    </aside >
  )
}