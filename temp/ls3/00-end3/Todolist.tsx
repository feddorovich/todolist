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
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const [newTitle, setNewTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const onKeyPressDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const allChangeFilterHandler = () => {
        {
            props.changeFilter("all")
        }
    }
    const activeChangeFilterHandler = () => {
        {
            props.changeFilter("active")
        }
    }
    const completedChangeFilterHandler = () => {
        {
            props.changeFilter("completed")
        }
    }
    const tsarChangeFilterHandler = (valueFilter: FilterValuesType) => {
        {
            props.changeFilter(valueFilter)
        }
    }
    const removeTaskHandler = (tId: string) => {
        props.removeTask(tId)
    }
    const mappedTasks = props.tasks.map(t => {
            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={()=>removeTaskHandler(t.id)}>x
                    </button>
                </li>)
        })


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle} onChange={onChangeInputHandler} onKeyDown={onKeyPressDownHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {mappedTasks}
        </ul>
        <div>
            <button onClick={() => tsarChangeFilterHandler('all')}>All</button>
            <button onClick={() => tsarChangeFilterHandler('active')}>Active</button>
            <button onClick={() => tsarChangeFilterHandler('completed')}>Completed</button>
        </div>
    </div>
}
