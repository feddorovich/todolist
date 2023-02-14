import React, {useState} from 'react';
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

    let [newTitle, setNewTitle] = useState('')

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle}
                   onChange={(event)=> {setNewTitle(event.currentTarget.value)}}
                   onKeyDown={(event)=>{
                       if (event.key === 'Enter') {
                           props.addTask(newTitle)
                           setNewTitle('')
                       }
                   }}
            />
            <button onClick={()=>{
                props.addTask(newTitle)
                setNewTitle('')
            }}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={ () => { props.removeTask(t.id) } }>x</button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={ () => { props.changeFilter("all") } }>
                All
            </button>
            <button onClick={ () => { props.changeFilter("active") } }>
                Active
            </button>
            <button onClick={ () => { props.changeFilter("completed") } }>
                Completed
            </button>
        </div>
    </div>
}
