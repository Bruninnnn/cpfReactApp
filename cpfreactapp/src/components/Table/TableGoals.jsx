import React from 'react'

export const TableGoals = () => {
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
          <tr>
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
              18/06/2024
            </th>
            <td className="px-6 py-4">
              R$ 430,99
            </td>
            <td className="px-6 py-4">
              Deletar
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  )
}
