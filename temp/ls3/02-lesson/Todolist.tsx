import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    const [newTitle, setNewTitle] = useState('')
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addTask(newTitle)
            setNewTitle('')
        }
    }
    const newTask = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }
    const onAllClickhandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickhandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickhandler = () => {
        props.changeFilter("completed")
    }
    const mappedTasks = props.tasks.map(t => {

        const onClickRemoveHandler = () => {
            props.removeTask(t.id)
        }

        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onClickRemoveHandler}>x
                </button>
            </li>
        )
    })


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <button onClick={newTask}>+</button>
        </div>
        <ul>
            {mappedTasks}
        </ul>
        <div>
            <button onClick={onAllClickhandler}>All</button>
            <button onClick={onActiveClickhandler}>Active</button>
            <button onClick={onCompletedClickhandler}>Completed</button>
        </div>
    </div>
}
