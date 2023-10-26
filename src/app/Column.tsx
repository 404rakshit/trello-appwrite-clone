import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodosCard from './TodosCard'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useBoardStore } from '@/store/BoardStore'
import { useModelStore } from '@/store/ModelStore'

type Props = {
    id: TypedColumn,
    todos: Todo[],
    index: number
}

const idToColumnText: {
    [key in TypedColumn]: string
} = {
    "todo": "To Do",
    "inprogress": "In Progress",
    "done": "Done"
}

const Column = ({ id, todos, index }: Props) => {
    const [searchString] = useBoardStore(state => [
        state.searchString
    ])
    const openModel = useModelStore(state => state.openModel)
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) =>
                <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                    <Droppable droppableId={index.toString()} type='card'>
                        {(provided, snapshot) =>
                            <div {...provided.droppableProps} ref={provided.innerRef} className={`p-2 rounded-2xl shadow-sm transition-colors duration-150 ${snapshot.isDraggingOver ? "bg-green-300" : "bg-white/50"}`}>
                                <h2 className='flex justify-between text-bold text-xl p-2'>
                                    {idToColumnText[id]}

                                    <span className='px-3 py-1.5 rounded-full bg-gray-200 text-gray-500 text-sm'>{!searchString ? todos.length : todos.filter((todo) =>
                                        todo.title.toLowerCase().includes(searchString.toLowerCase())
                                    ).length}</span>
                                </h2>

                                <div className='space-y-2'>
                                    {todos.map((todo, index) => {
                                        if (searchString && !todo.title.toLowerCase().includes(searchString.toLowerCase())) return null
                                        return (
                                            <Draggable key={todo.$id} draggableId={todo.$id} index={index}>
                                                {(provided) => (
                                                    <TodosCard id={id} todo={todo} index={index} draggableProps={provided.draggableProps} dragHandleProps={provided.dragHandleProps} innerRef={provided.innerRef} />
                                                )}
                                            </Draggable>
                                        )
                                    })}

                                    {provided.placeholder}

                                    <div className='flex justify-end items-end p-2'>
                                        <button onClick={openModel} className='text-green-500 hover:text-green-600'>
                                            <PlusCircleIcon className='w-8 h-8' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </Droppable>
                </div>
            }
        </Draggable>
    )
}

export default Column