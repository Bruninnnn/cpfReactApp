import React, { useEffect, useState } from 'react'
import { TableExtract } from '../../components/Table/TableExtract'
import ExtractBalances from './ExtractBalances'

const Extract = () => {
  const { IP } = require('../../env')

  const [rows, setRows] = useState([])
  const [initialized, setInitialized] = useState(false)

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await sendRequest()
        setInitialized(true)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (!initialized) {
      fetchData()
    }
  }, [initialized])

  async function sendRequest() {
    try {
      const response = await fetch(
        `http://${IP}:8080/bank-account-register/all`,
        options
      )
      const responseData = await response.json()
      setRows(responseData)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="mx-4 flex w-full flex-col gap-4 sm:mx-0">
      <h1 className="mb-4 mt-4 sm:mt-12">Extrato</h1>
      <div className="mt-0 inline-block rounded-3xl"></div>
      <div className="flex w-full flex-row flex-wrap gap-x-4 gap-y-4">
        <ExtractBalances
          balance={' - R$ 13.634,33'}
          balanceCard={'- R$ 634,33'}
          balanceGoals={'R$ 10.000,00'}
        />
        <div className="mt-4 h-3/4 w-full bg-color-rows">
          <TableExtract data={rows || []} />
        </div>
      </div>
    </div>
  )
}

export default Extract
