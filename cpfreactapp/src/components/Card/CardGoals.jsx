import React from 'react'
import { IoMdTrash } from 'react-icons/io'
import { MdFormatListBulleted, MdModeEdit } from 'react-icons/md'
import { RiPlaneFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { ProgressBar } from '../ProgressBar'

export const CardGoals = ({
  goalId,
  titleGoals,
  createdGoalsDate,
  finalGoalsDate,
  targetValue,
  value,
  onOpen,
  handleDeleteGoals
}) => {

  const percentGoals = ((value / targetValue) * 100).toFixed(0) + '%';

  return (
    <div className="mt-0 h-48 w-full items-center rounded-3xl border border-solid border-color-border bg-color-bgforms p-4">
      <div className="flex flex-row">
        <div className="flex h-full flex-1 items-center text-center">
          <div
            className="rounded-full bg-color-receipt p-2 text-center text-xl font-semibold"
            id="imagem-card"
          >
            <RiPlaneFill />
          </div>
          <h3 className="ml-2 text-center text-2xl font-semibold">
            {titleGoals}
          </h3>
        </div>
      </div>
      <div className="mt-2.5 flex flex-row">
        <div className="flex flex-1">
          <h3 className="text-sm">Criado em: {createdGoalsDate}</h3>
        </div>
        <div className="flex">
          <h3 className="text-sm">Expira em: {finalGoalsDate}</h3>
        </div>
      </div>

      <ProgressBar targetValue={targetValue} value={value} percent={percentGoals} />

      <div className="flex justify-center">
        <button
          className="flex-initial rounded-full p-2 text-center text-2xl hover:bg-color-bginputs"
          title="Editar Metas"
          onClick={onOpen}
        >
          <MdModeEdit />
        </button>
        <button
          className="flex-initial rounded-full p-2 text-center text-2xl hover:bg-color-bginputs"
          title="Excluir Metas"
          onClick={handleDeleteGoals}
        >
          <IoMdTrash />
        </button>
        <button
          className="flex-initial rounded-full p-2 text-center text-2xl hover:bg-color-bginputs"
          title="Detalhes Metas"
        >
          <Link
            to={`/dashboard/goals/details/${goalId}`}
            className="flex items-center px-0 font-light"
          >
            <MdFormatListBulleted />
          </Link>
        </button>
      </div>
    </div>
  )
}
