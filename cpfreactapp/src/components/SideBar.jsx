import React from 'react'
import { Link } from 'react-router-dom'

import { AiOutlineBank } from 'react-icons/ai'
import { FcBullish } from 'react-icons/fc'
import { MdDashboard, MdDataUsage, MdExitToApp } from 'react-icons/md'
import { TbPigMoney } from 'react-icons/tb'
import { VscDebugDisconnect } from 'react-icons/vsc'

export default function SideBar() {
  return (
    <aside className="relative flex h-screen w-60 flex-col md:hidden">
      <div className="left-0 top-0 flex h-screen w-60 flex-col bg-color-bgforms px-4 py-0">
        <div className="mx-auto flex w-full items-center border-b-2 border-color-border p-2">
          <span>
            <FcBullish fontSize={32} />
          </span>
          <h2 className="mt-2 p-2 text-lg">ConnectBills</h2>
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
          <Link to="/openfinance" className="flex items-center px-0 font-light">
            <div className="-mb-2 flex w-full items-center p-4 hover:bg-color-border">
              <span>
                <VscDebugDisconnect fontSize={24} />
              </span>
              <p className="mt-1 items-center px-2">OpenFinance</p>
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
  )
}
