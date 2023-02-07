import React, {useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    setTasks: Function
}

export function Todolist(props: PropsType) {

    function removeTask(id: number) {
        let filteredTask = props.tasks.filter((el) => el.id !== id)
        props.setTasks(filteredTask)
        console.log(filteredTask)
    }

    let [filter, SetFilter] = useState<FilterValuesType>('all')

    let tasksForTodolisk = props.tasks
    if (filter === 'completed') {
        tasksForTodolisk = props.tasks.filter( (el) => el.isDone === true)
    }
    if (filter === 'active') {
        tasksForTodolisk = props.tasks.filter( (el) => el.isDone === false)
    }

    function changeFilter(value: FilterValuesType) {
        SetFilter(value)
        console.log(value)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {tasksForTodolisk.map( (el) => {
                return (
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone} onChange={()=> console.log('changed')}/>
                        <span>{el.title}</span>
                        <button onClick={()=> {removeTask(el.id)} }>X</button>
                    </li>
                )
            })}
         </ul>
        <div>
            <button onClick={ ()=>{changeFilter('all')} }>All</button>
            <button onClick={ ()=>{changeFilter('active')} }>Active</button>
            <button onClick={ ()=>{changeFilter('completed')} }>Completed</button>
        </div>
    </div>
}
