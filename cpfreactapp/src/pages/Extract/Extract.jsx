import React from 'react'
import { TableExtract } from '../../components/Table/TableExtract'
import InputDate from '../../components/Input/InputDate'
import DashBoardBalances from '../DashBoard/DashBoardBalances'
import ExtractBalances from './ExtractBalances'


const Extract = () => {
  return (
    <div className="flex w-full flex-col gap-4 mx-4 sm:mx-0">
      <h1 className="mb-4 mt-4 sm:mt-12">Extrato</h1>
      <div className="mt-0 inline-block rounded-3xl">
        <InputDate
          id="calendarDashBoard"
          type="month"
          value={"selectedMonth"}
          onChange={"handleMonthChange"}
        />
      </div>
      <div className="flex flex-wrap flex-row w-full gap-x-4 gap-y-4 ">
        <ExtractBalances balance={"R$ 500,00"} balanceCard={"- R$ 253,22"} balanceGoals={"R$ 600,00"} />
        <div className="bg-color-rows w-full h-3/4 mt-4">
          <TableExtract

          />
        </div>
      </div>
    </div>
  )
}

export default Extract