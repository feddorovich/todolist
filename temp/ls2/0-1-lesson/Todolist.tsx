import React, {useState} from 'react';
import {FilterValeusType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    setTasks: (tasks: Array<TaskType>) => void
}

export function Todolist(props: PropsType) {

    let [filter, setFilter] = useState<FilterValeusType>('all')

    function removeTask(id: number) {
        let filteredTask = props.tasks.filter( (el) => el.id !== id)
        props.setTasks(filteredTask)
    }

    function changeFilter(value: FilterValeusType) {
        setFilter(value)
    }

    let tasksForTodolist = props.tasks
    if (filter === 'completed') {
        tasksForTodolist = props.tasks.filter( (t) => t.isDone === true)
    }
    if (filter === 'active') {
        tasksForTodolist = props.tasks.filter( (t) => t.isDone === false)
    }

    function todoCheckboxHandler () {

    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {tasksForTodolist.map(el =>
                (
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone} onChange={todoCheckboxHandler}/>
                        <span>{el.title}</span>
                        <button onClick={() => {removeTask(el.id)}}>X</button>
                    </li>
                )
            )}
        </ul>
        <div>
            <button onClick={ () => {changeFilter('all')} }>All</button>
            <button onClick={ () => {changeFilter('completed')} }>Active</button>
            <button onClick={ () => {changeFilter('active')} }>Completed</button>
        </div>
    </div>
}
