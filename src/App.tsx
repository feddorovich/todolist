import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

// CRUD
// R - filter, sort, search

export type FilterValuesType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: TaskType[]
}

function App(): JSX.Element {
    //BLL:
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: "What to learn", filter: 'all'},
        {id: todolistId_2, title: "What to learn", filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "React & Redux", isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "BREAD", isDone: true},
            {id: v1(), title: "MEAT", isDone: false}
        ],
    })

    const removeTask = (taskId: string, todolistId: string) => {
        /*      const tasksForUpdate = tasks[todolistId]
                const updatedTasks = tasksForUpdate.filter(t => t.id !== todolistId)
                const copyTasks = {...tasks}
                copyTasks[todolistId] = updatedTasks
                setTasks(copyTasks)       */
        //
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
/*      const tasksForUpdate = tasks[todolistId]
        const updatedTasks = [newTask, ...tasksForUpdate]  // 4 tasks
        const copyTasks = {...tasks}
        copyTasks[todolistId] = updatedTasks
        setTasks(copyTasks)   */
        //
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {
        const tasksForUpdate = tasks[todolistId]
        const updatedTasks = tasksForUpdate.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)
        const copyTasks = {...tasks}
        copyTasks[todolistId] = updatedTasks
        setTasks(copyTasks)
        //
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})
    }
    const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        //delete tasks[todolistId]
        const copyTasks = {...tasks}
        delete copyTasks[todolistId]
        setTasks(copyTasks)
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }

    const todolistsComponents = todolists.map( tl => {

        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)

        return (
            <TodoList
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
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
