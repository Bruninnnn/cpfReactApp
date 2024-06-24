import React from 'react'

export const TableExtract = () => {
  return (
    <div class="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-white-primary">
        <thead className="bg-color-bginputs text-base uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Valor
            </th>
            <th scope="col" className="px-6 py-3">
              Descrição
            </th>
            <th scope="col" className="px-6 py-3">
              Categoria
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
      </table>
    </div>
  )
}
