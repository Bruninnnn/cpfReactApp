import React from 'react'
import { TableExtract } from '../../components/Table/TableExtract'


const Extract = () => {
  return (
    <div className="flex w-full flex-col gap-4 mx-4 sm:mx-0">
      <h1 className="mb-4 mt-4 sm:mt-12">Extrato</h1>

      <div className="flex flex-wrap flex-row w-full gap-x-4 gap-y-4 ">
        <div className="bg-color-rows w-full h-3/4">
          <TableExtract

          />
        </div>
      </div>
    </div>
  )
}

export default Extract