import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolos.module.css'

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
    changeStatus: (taskId: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<null | string>(null)
    let [filter, setFilter] = useState<FilterValuesType>('all')

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError('Error!!!')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => {
        setFilter('all')
        return props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        setFilter('active')
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        setFilter('completed')
        props.changeFilter("completed")
    }

    const onChangeMapHandler = (taskId: string, event: boolean) => {
        props.changeStatus(taskId, event)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? s.error : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
/*                    const onChangeMapHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked)
                    }*/

                    return <li key={t.id} className={t.isDone ? s.isDone : ''}>
                        <input type="checkbox"
                               onChange={(e)=>onChangeMapHandler(t.id, e.currentTarget.checked)}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={filter === 'all' ? s.activeFilter : ''} onClick={onAllClickHandler}>All</button>
            <button className={filter === 'active' ? s.activeFilter : ''} onClick={onActiveClickHandler}>Active</button>
            <button className={filter === 'completed' ? s.activeFilter : ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
