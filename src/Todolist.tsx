import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css'

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
    changeCheckbox: (taskId: string, newIsDone: boolean) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    let [buttonName, setButtonName] = useState<FilterValuesType>('all')

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError('Title is reqired!')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all")
        setButtonName('all')
    };
    const onActiveClickHandler = () => {
        props.changeFilter("active")
        setButtonName('active')
    };
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
        setButtonName('completed')
    };

    const onChangeHandler2 = (tID:string ,eventValue: boolean) => {
        props.changeCheckbox(tID, eventValue)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
                   className={error ? s.error : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
/*                     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                       props.changeCheckbox(t.id, e.currentTarget.checked)
                     }
                     */

                    return <li key={t.id} className={t.isDone ? s.isDone : ''}>
                        <input type="checkbox"
                               onChange={(event)=> onChangeHandler2(t.id, event.currentTarget.checked) }
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={buttonName === 'all' ? s.activeFilter : s.filter} onClick={ onAllClickHandler }>All</button>
            <button className={buttonName === 'active' ? s.activeFilter : s.filter} onClick={ onActiveClickHandler }>Active</button>
            <button className={buttonName === 'completed' ? s.activeFilter : s.filter} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
