import React, {useState} from 'react';
import {ButtonNameType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number, id2: string) => void
}

export function Todolist(props: PropsType) {

    const filteringTasks = (buttonName: ButtonNameType) => {
        setfilterTask(buttonName)
        console.log(buttonName)
    }

    let [filterTask, setfilterTask] = useState<ButtonNameType>('all')

    let filteredTasks = props.tasks
    if (filterTask === 'active') {
        filteredTasks = props.tasks.filter(el => el.isDone)
    }
    if (filterTask === 'completed') {
        filteredTasks = props.tasks.filter(el => !el.isDone)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {filteredTasks.map((el) => {
                return (
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={() => {props.removeTask(el.id, 'Hello world')}}>X</button>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={ () => {filteringTasks ('all')} }>ALL</button>
            <button onClick={ () => {filteringTasks ('active')} }>ACTIVE</button>
            <button onClick={ () => {filteringTasks ('completed')} }>COMPLETED</button>
        </div>
    </div>
}
