import React from 'react';
import {FilterValeusType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValeusType) => void
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(el =>
                (
                    <li>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={() => {props.removeTask(el.id)}}>X</button>
                    </li>
                )
            )}
        </ul>
        <div>
            <button onClick={ () => {props.changeFilter('all')} }>All</button>
            <button onClick={ () => {props.changeFilter('completed')} }>Active</button>
            <button onClick={ () => {props.changeFilter('active')} }>Completed</button>
        </div>
    </div>
}
