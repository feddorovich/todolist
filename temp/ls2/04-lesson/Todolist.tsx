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
    setTaks: Function
}

export function Todolist(props: PropsType) {

    function removeTask(id: number) {
        let filteredTask = props.tasks.filter( (el) => el.id !== id )
        props.setTaks(filteredTask)
        console.log(filteredTask)
    }

    let [filter, setFilter] = useState<FilteredValuesType>('all')

    let tasksForTodoLisk = props.tasks
    if(filter === 'active') {
        tasksForTodoLisk = props.tasks.filter( (el) => el.isDone === false)
    }
    if(filter === 'completed') {
        tasksForTodoLisk = props.tasks.filter( (el) => el.isDone === true)
    }

    function changeFilter(value: FilteredValuesType) {
        setFilter(value)
        console.log(value)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {tasksForTodoLisk.map((el) => {
                return (
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone} onChange={() => console.log('LOG')}/>
                        <span>{el.title}</span>
                        <button onClick={ ()=> {removeTask(el.id)} }>X</button>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={()=> {changeFilter('all')} }>All</button>
            <button onClick={()=> {changeFilter('active')} }>Active</button>
            <button onClick={()=> {changeFilter('completed')} }>Completed</button>
        </div>
    </div>
}
