import { React } from 'react'
import {
  MdDeleteForever,
  MdCreate,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp
} from 'react-icons/md'

export const Table = ({ rows, deleteRow, editRow }) => {

  const row = {

  }
  return (
    <div className="max-h-[500px] w-full overflow-x-auto">
      <table className="max-h-[500px] w-full table-auto text-left text-base text-color-border-login">
        <thead className="bg-color-bginputs text-base uppercase text-color-border-login">
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
        <tbody>
          {rows?.map((row, idx) => {
            return (
              <tr
                key={idx}
                className="border-b-2 border-color-bginputs bg-color-bgforms hover:bg-color-border"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-color-border-login"
                >
                  {row.registerValue.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2
                  })}
                </th>
                <td className="px-6 py-4">{row.description}</td>
                <td className="px-6 py-4">{row.regGroupType}</td>
                <td className="px-6 py-4">
                  <span className="flex items-center justify-start text-center">
                    <MdKeyboardArrowUp className='bg-sea-green-900 rounded-full shad'
                      style={{ fill: '#00aaa1', fontSize: '24px' }}
                    />
                    {row.registerType === 'INCOME' ? (
                      <MdKeyboardArrowUp className='bg-color-receipt'
                        style={{ fill: '#0a5c5a', fontSize: '24px' }}
                      />
                    ) : (
                      <MdKeyboardArrowDown className='bg-color-cost rounded-full'
                        style={{ fill: '#a35f83', fontSize: '24px' }}
                      />
                    )}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center justify-start text-center">
                    <MdDeleteForever className='bg-japanese-maple-900 rounded-md p-0.5'
                      onClick={() => deleteRow(idx)}
                      style={{
                        cursor: 'pointer',
                        fill: '#fb0707',
                        fontSize: '24px'
                      }}
                    />
                    <MdCreate className='bg-texas-900 rounded-md p-1'
                      onClick={() => editRow(idx)}
                      style={{ fill: '#d9bd19', cursor: 'pointer', fontSize: '24px' }}
                    />
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
