'use client'

import { useBoardStore } from '@/store/BoardStore'
import { XCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd'

type Props = {
  id: TypedColumn,
  todo: Todo,
  index: number,
  draggableProps: DraggableProvidedDraggableProps,
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined,
  innerRef: (element: HTMLElement | null) => void
}

const TodosCard = ({ id, todo, index, draggableProps, dragHandleProps, innerRef }: Props) => {
  const deleteTask = useBoardStore((state) => state.deleteTask)
  return (
    <div
      className='bg-white rounded-md space-y-2 drop-shadow-md px-2 py-1'
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}>
      <div className='flex justify-between items-center p-5'>
        <p>{todo.title}</p>
        <button onClick={() => deleteTask(index, todo, id)} className='text-red-500 hover:text-red-600'>
          <XCircleIcon className='ml-5 w-8 h-8' />
        </button>
      </div>
    </div>
  )
}

export default TodosCard