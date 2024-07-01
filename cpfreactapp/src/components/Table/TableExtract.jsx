import React from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineCreditCard } from 'react-icons/md'

export const TableExtract = () => {
  return (
    <div class="relative w-full max-h-[500px] overflow-x-auto shadow-md sm:rounded-lg">
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
          <tr
            className="border-b-2 border-color-bginputs bg-color-bgforms hover:bg-color-border"
          >
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-color-border-login"
            >
              01/06/2024
            </th>
            <td className="px-6 py-4">R$ 253,22</td>
            <td className="px-6 py-4">Amazon 2/3</td>
            <td className="px-6 py-4">Compras Online</td>
            <td className="px-6 py-4">Contas Bancárias</td>
            <td className="px-6 py-4">
              <span className="flex items-center text-center">
                <MdKeyboardArrowDown className='bg-color-cost rounded-full'
                  style={{ fill: '#a35f83', fontSize: '24px' }}
                />
              </span>
            </td>
          </tr>
          <tr
            className="border-b-2 border-color-bginputs bg-color-bgforms hover:bg-color-border"
          >
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-color-border-login"
            >
              27/06/2024
            </th>
            <td className="px-6 py-4">R$ 500,00</td>
            <td className="px-6 py-4">Pix</td>
            <td className="px-6 py-4">Diversos</td>
            <td className="px-6 py-4">Registro Manual</td>
            <td className="px-6 py-4">
              <span className="flex items-center text-center">
                <MdKeyboardArrowUp className='bg-sea-green-900 rounded-full'
                  style={{ fill: '#00aaa1', fontSize: '24px' }}
                />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
