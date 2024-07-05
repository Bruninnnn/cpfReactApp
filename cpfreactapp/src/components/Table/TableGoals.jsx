import { format, parseISO } from 'date-fns'
import React from 'react'
import { MdDeleteForever } from 'react-icons/md'

export const TableGoals = ({ rows, onDeleteRow }) => {
  return (
    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg sm:max-h-28 xl:max-h-64">
      <table className="w-full text-left text-sm text-white-primary ">
        <thead className="border-b border-color-nubank text-xs uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Data
            </th>
            <th scope="col" className="px-6 py-3">
              Valor
            </th>
            <th scope="col" className="w-auto px-6 py-3">
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, idx) => {
            const date =
              typeof row.date === 'string' ? parseISO(row.date) : row.date
            const formattedDate =
              date instanceof Date && !isNaN(date)
                ? format(date, 'dd/MM/yyyy')
                : ''

            return (
              <tr key={idx}>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium"
                >
                  {formattedDate}
                </th>
                <td className="px-6 py-4">
                  {row.value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2
                  })}
                </td>
                <td className="px-6 py-4" title="Deletar registro">
                  <MdDeleteForever
                    className="rounded-md bg-japanese-maple-900 p-0.5"
                    onClick={() => onDeleteRow(row.id)}
                    style={{
                      cursor: 'pointer',
                      fill: '#fb0707',
                      fontSize: '24px'
                    }}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
