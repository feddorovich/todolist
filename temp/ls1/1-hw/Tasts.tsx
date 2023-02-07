import React from 'react';

type TastsPropsType = {
    data: DataType
}

type DataType = {
    title: string,
    tasks: Array<ArrayDataType>,
    students: Array<string>
}

type ArrayDataType = {
    taskId: number,
    title: string,
    isDone: boolean
}

export function Tasks(props: TastsPropsType) {
    return (
        <div>
            <h2>{props.data.title}</h2>
            <ul>
                {props.data.tasks.map((el) => {
                    return (
                        <li key={el.taskId}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span> {el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <select>
                {props.data.students.map((el) => {
                    return (
                        <option>{el}</option>
                    )
                })}
            </select>
            <ul>
                {props.data.students.map((el) => {
                    return (
                        <div>
                            {el}
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}