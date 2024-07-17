import { format } from 'date-fns'
import React from 'react'

export const TableExtract = () => {
  // Mock data
  const data = [
    {
      date: '2024-07-04',
      amount: 19.9,
      description: 'Taxi and ride-hailing',
      category: 'Uber',
      type: 'DEBIT'
    },
    {
      date: '2024-07-03',
      amount: -1856.25,
      description: 'Entrepreneurial activities',
      category: 'Pagamento recebido',
      type: 'CREDIT'
    },
    {
      date: '2024-07-04',
      amount: 24.99,
      description: 'Taxi and ride-hailing',
      category: 'Uber',
      type: 'DEBIT'
    },
    {
      date: '2024-07-04',
      amount: 17.99,
      description: 'Ec*Melimais',
      category: '',
      type: 'DEBIT'
    },
    {
      date: '2024-07-02',
      amount: -40,
      description: 'Entrepreneurial activities',
      category: 'Pagamento recebido',
      type: 'CREDIT'
    },
    {
      date: '2024-06-22',
      amount: 19.97,
      description: 'Taxi and ride-hailing',
      category: 'Uber',
      type: 'DEBIT'
    },
    {
      date: '2024-07-01',
      amount: 24.99,
      description: 'Eating out',
      category: 'Ifd*Restaurante e Lanc',
      type: 'DEBIT'
    },
    {
      date: '2024-06-21',
      amount: 8.5,
      description: 'Eating out',
      category: 'Lucca Cantina e Restau',
      type: 'DEBIT'
    },
    {
      date: '2024-07-04',
      amount: 142.19,
      description: 'Food delivery',
      category: 'Ifd*Click Pizza',
      type: 'DEBIT'
    },
    {
      date: '2024-07-03',
      amount: 24.99,
      description: 'Eating out',
      category: 'Ifd*Restaurante e Lanc',
      type: 'DEBIT'
    },
    {
      date: '2024-07-04',
      amount: 4.95,
      description: 'Food delivery',
      category: 'Ifd*Ifood.Com Agncia D',
      type: 'DEBIT'
    }
  ]

  return (
    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
      <div className="max-h-[500px] overflow-y-auto">
        <table className="w-full text-left text-sm text-white-primary">
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
                Tipo
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={idx}
                className="border-b-2 border-color-bginputs bg-color-bgforms hover:bg-color-border"
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium text-color-border-login">
                  {format(new Date(item.date), 'dd/MM/yyyy')}
                </td>
                <td className="px-6 py-4">
                  {item.amount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2
                  })}
                </td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">
                  {item.type === 'DEBIT' ? 'Débito' : 'Crédito'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
