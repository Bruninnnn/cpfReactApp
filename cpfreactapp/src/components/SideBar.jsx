import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { AiOutlineBank } from 'react-icons/ai'
import { FcBullish } from 'react-icons/fc'
import { MdDashboard, MdDataUsage, MdExitToApp } from 'react-icons/md'
import { TbPigMoney } from 'react-icons/tb'
import { IoMenu } from 'react-icons/io5'
import { IoMdClose } from 'react-icons/io'

export default function SideBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="relative sm:absolute z-10">
      <div className={`bg-color-bgforms rounded-full relative flex p-2 m-2 ${sidebarOpen ? 'hidden ' : 'flex'}  m-md:hidden `} onClick={toggleSidebar}>
        <IoMenu fontSize={"2.5rem"} />
      </div>
      <aside className={`relative flex h-screen w-60 flex-col transition-width duration-700 ease-in-out ${sidebarOpen ? 'w-60' : 'w-0 m-md:w-60 md:hidden'}`}>
        <div className="left-0 top-0 flex h-screen flex-col bg-color-bgforms px-4 py-0">
          <div className="mx-auto flex w-full items-center border-b-2 border-color-border p-2">
            <span>
              <FcBullish fontSize={32} />
            </span>
            <h2 className="mt-2 p-2 text-lg">ConnectBills</h2>
            <div className="m-md:hidden flex ml-4 mt-2 p-2 hover:bg-color-border rounded-full">
              <IoMdClose onClick={closeSidebar} />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-0.5 py-8 ">
            <Link to="/dashboard" className="flex items-center px-0 font-light">
              <div className="-mb-2 flex w-full items-center p-4 hover:bg-color-border">
                <span>
                  <MdDashboard fontSize={24} />
                </span>
                <p className="mt-1 items-center px-2">Cadastro</p>
              </div>
            </Link>
            <Link
              to="/dashboard/reports"
              className="flex items-center px-0 font-light"
            >
              <div className="-mb-2 flex w-full items-center p-4 hover:bg-color-border">
                <span>
                  <MdDataUsage fontSize={24} />
                </span>
                <p className="mt-1 items-center px-2">Relatórios</p>
              </div>
            </Link>
            <Link
              to="/dashboard/goals"
              className="flex items-center px-0 font-light"
            >
              <div className="-mb-2 flex w-full items-center p-4 hover:bg-color-border">
                <span>
                  <TbPigMoney fontSize={24} />
                </span>
                <p className="mt-1 items-center px-2">Metas</p>
              </div>
            </Link>
            <Link
              to="/dashboard/bankaccount"
              className="flex items-center px-0 font-light"
            >
              <div className="-mb-2 flex w-full items-center p-4 hover:bg-color-border">
                <span>
                  <AiOutlineBank fontSize={24} />
                </span>
                <p className="mt-1 items-center px-2">Carteiras</p>
              </div>
            </Link>
          </div>

          <div className="mb-4 flex items-end">
            <Link to="/" className="flex items-center px-0 font-light">
              <div className="flex w-full items-center p-4 hover:bg-color-border">
                <span>
                  <MdExitToApp fontSize={24} />
                </span>
                <p className="mt-1 items-center px-2">Sair</p>
              </div>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  )
}
