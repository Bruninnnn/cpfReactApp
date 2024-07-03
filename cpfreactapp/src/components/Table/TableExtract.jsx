import React from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineCreditCard } from 'react-icons/md'

export const TableExtract = ({ datas }) => {
  return (
    <div class="relative w-full max-h-[500px] overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg">
      <table class="w-full max-h-[500px] text-sm text-left text-white-primary">
        <thead className="bg-color-bginputs text-base uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Data
            </th>
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
              Grupo
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {datas?.map((data, idx) => {
            return (
              <tr
                key={idx}
                className="border-b-2 border-color-bginputs bg-color-bgforms hover:bg-color-border"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-color-border-login"
                >
                  {data.nome_da_função_que_retorna_a_data}
                </th>
                <td className="px-6 py-4">
                  {data.value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2
                  })}
                </td>
                <td className="px-6 py-4">{data.description}</td>
                <td className="px-6 py-4">{data.category}</td>
                <td className="px-6 py-4">{data.group}</td>
                <td className="px-6 py-4">
                  <span className="flex items-center text-center">
                    {data.registerType === 'INCOME' ? (
                      <MdKeyboardArrowUp className='bg-sea-green-900 rounded-full'
                        style={{ fill: '#00aaa1', fontSize: '24px' }}
                      />
                    ) : (
                      <MdKeyboardArrowDown className='bg-color-cost rounded-full'
                        style={{ fill: '#a35f83', fontSize: '24px' }}
                      />
                    )}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
