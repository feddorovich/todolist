import React, {useState} from 'react';
import {FilteredValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    setTasks: (value: Array<TaskType>) => void
}

export function Todolist(props: PropsType) {

    function removeTask(id: number) {
        let filteredTasks = props.tasks.filter( (el) => el.id !== id)
        props.setTasks(filteredTasks)
        console.log(id)
    }

    function changeFilter(value: FilteredValuesType) {
        setFilter(value)
        console.log(value)
    }

    let [filter, setFilter] = useState<FilteredValuesType>('all')
    let taskForTodolist = props.tasks
    if (filter === 'active') {
        taskForTodolist = props.tasks.filter( (el) => el.isDone === false)
    }
    if (filter === 'completed') {
        taskForTodolist = props.tasks.filter( (el) => el.isDone === true)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {taskForTodolist.map( (el)=> {
                return (
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone} onChange={()=>{console.log('LOG')}}/>
                        <span>{el.title}</span>
                        <button onClick={()=> removeTask(el.id)}>X</button>
                    </li>
                )
            } )}
        </ul>
        <div>
            <button onClick={()=> {changeFilter('all')} }>All</button>
            <button onClick={()=> {changeFilter('active')} }>Active</button>
            <button onClick={()=> {changeFilter('completed')} }>Completed</button>
        </div>
    </div>
}
