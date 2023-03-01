import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";


// CRUD
// R - filter, sort, search

export type FilterValuesType = "all" | "active" | "completed"

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TastsStateType = {
    [key: string]: TaskType[]
}

function App (): JSX.Element {
    //BLL:

    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistId_1, title: "What to learn", filter: 'all'},
        {id: todolistId_2, title: "What to buy", filter: 'all'}
    ])

    const todoListTitle: string = "What to learn"
    const [tasks, setTasks] = useState<TastsStateType>({
        [todolistId_1]: [
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "ES6 & TS", isDone: true},
        {id: v1(), title: "React & Redux", isDone: false}],
            [todolistId_2] : [
        {id: v1(), title: "BREAD", isDone: true},
        {id: v1(), title: "MILK", isDone: true},
        {id: v1(), title: "CARROT", isDone: false}
    ]
    })

    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})
    }
    const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map (tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType):  Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }

   const todolistsComponents = todolists.map(tl => {

       const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)

        return (
            <TodoList
                key={tl.id}
                todolistId={tl.id}
                title={todoListTitle}
                tasks={filteredTasks}
                filter={tl.filter}
                changeTodolistFilter={changeTodolistFilter}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}
            />
        )
    })

    //UI:
    return (
        <div className="App">
            {todolistsComponents}
        </div>
    );
}

export default App;
