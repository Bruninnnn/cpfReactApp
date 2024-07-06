import React, { useCallback, useContext, useEffect, useState } from 'react'
import PieChartCategory from '../../components/Charts/PieChartCategory'
import { defaults } from 'chart.js'
import { IP } from '../../env'
import PieChartCard from '../../components/Charts/PieChartCard'
import InputDate from '../../components/Input/InputDate'
import PieChartBankAccounts from '../../components/Charts/PieChartBankAccounts'
import { Context } from '../../Context'

defaults.maintainAspectRatio = false
defaults.responsive = true

function Reports() {
  const [data, setData] = useState([])
  const [selectedMonth, setSelectedMonth] = useState('')
  const [initialized, setInitialized] = useState(false)
  const { userContext } = useContext(Context)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date()
        const year = today.getFullYear()
        const month = (today.getMonth() + 1).toString().padStart(2, '0')
        const defaultValue = `${year}-${month}`

        setSelectedMonth(defaultValue)

        if (!initialized) {
          await filterCalendar(defaultValue)
          setInitialized(true)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (!initialized) {
      fetchData()
    }
  }, [initialized])

  const handleMonthChange = useCallback(async (e) => {
    const monthValue = e.target.value
    setSelectedMonth(monthValue)
    await filterCalendar(monthValue)
  }, [])

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  async function filterCalendar(calendar) {
    try {
      const userId = userContext?.id
      const response = await fetch(
        `http://${IP}:8080/register/filteredRegisters?date=${calendar}&userId=${userId}`,
        options
      )

      const responseData = await response.json()
      if (responseData) {
        await setData(responseData)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="mx-4 flex w-full flex-col gap-4 sm:mx-0">
      <h1 className="mb-4 mt-4 sm:mt-12">Gráficos</h1>
      <div className="inline-block rounded-3xl">
        <InputDate
          id="calendarReports"
          type="month"
          value={selectedMonth}
          onChange={handleMonthChange}
        />
      </div>
      <div className="flex w-full flex-row flex-wrap gap-x-4 gap-y-4 mt-6 ">
        <div className="flex w-full flex-row gap-x-4 gap-y-4 md:flex-col">
          <div className="flex w-1/2 flex-auto px-0 py-0 sm:flex-1 m-sm:w-full">
            <PieChartCategory
              baseData={data}
              title={'Gasto mensal por categoria:'}
            />
          </div>
          <div className="flex w-1/2 flex-initial px-0 py-0 sm:flex-1 m-sm:w-full">
            <PieChartCard baseData={data} title={'Gastos com o cartão:'} />
          </div>
        </div>
        <div className="flex w-full flex-row gap-x-4 gap-y-4 md:flex-col">
          <div className="flex w-1/2 flex-initial px-0 py-0 sm:flex-1 m-sm:w-full">
            <PieChartCategory
              baseData={data}
              title={'Distribuição de despesa mensal:'}
            />
          </div>
          <div className="flex w-1/2 flex-initial px-0 py-0 sm:flex-1 m-sm:w-full">
            <PieChartBankAccounts baseData={data} title={'Gastos por conta:'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
