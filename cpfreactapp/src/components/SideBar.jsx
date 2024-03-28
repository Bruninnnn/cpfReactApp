import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from ".././Context";

import { MdDashboard, MdDataUsage, MdExitToApp } from "react-icons/md";
import { FcBullish } from "react-icons/fc"
/* 
import styles from "./SideBar.module.css"; */

export default function SideBar() {
  const { userContext, setContext } = useContext(Context);

  return (
    <aside className="fixed h-dvh loat-left top: 0 right: 0">
      <div className="fixed flex h-dvh mt-2.5">
        <div className="flex flex-col flex-1 w-60 h-screen fixed top-0 left-0 px-4 py-8 bg-color-bgforms">
          <div className="flex w-full p-4 mx-auto items-center">
            <span>
              <FcBullish fontSize={32} />
            </span>
            <h2 className="mt-2 p-2">ConnectBills</h2>
          </div>
          <div className="py-8 h-full flex flex-col flex-1 gap-0.5 ">
            <div className="flex w-full p-4 -mb-3 items-center hover:bg-color-background">
              <Link to="/home" className="flex items-center font-light px-3">
                <span>
                  <MdDashboard fontSize={24} />
                </span>
                <p className="mt-1 items-center px-2">Cadastro</p>
              </Link>
            </div>
            <div className="flex w-full p-4 items-center">
              <Link to="/reports" className="flex items-center font-light px-3">
                <span>
                  <MdDataUsage fontSize={24} />
                </span>
                <p className="mt-1 items-center px-2">Relatórios</p>
              </Link>
            </div>
          </div>

          <div className="relative flex items-end flex-1">
            <div className="flex w-3/5 p-4 items-center">
              <Link to="/" className="flex items-center font-light px-3 mb-2">
                <span>
                  <MdExitToApp fontSize={24} />
                </span>
                <p className="mt-1 items-center px-2">Sair</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}