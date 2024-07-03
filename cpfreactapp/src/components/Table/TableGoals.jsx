import React from 'react'
import { MdDeleteForever } from 'react-icons/md'

export const TableGoals = ({ rows, deleteRow }) => {
  return (
    <div class="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-white-primary">
        <thead class="text-xs border-b border-color-nubank uppercase">
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
            return (
              <tr
                key={idx}
              >
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {row.nome_da_função_que_retorna_a_data}
                </th>
                <td className="px-6 py-4">
                  {row.value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2
                  })}
                </td>
                <td className="px-6 py-4" title='Deletar linha'>
                  <MdDeleteForever className='bg-japanese-maple-900 rounded-md p-0.5'
                    onClick={() => deleteRow(idx)}
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
