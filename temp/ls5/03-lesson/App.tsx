import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = { id: string, title: string, filter: FilterValuesType }

type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id != id)
        setTasks({...tasks});
    }
    function addTask(title: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = {id: v1(), title: title, isDone: false};
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks});
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks});
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find( tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    function removeTodokist(id: string) {
        setTodolists(todolists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    let todolistID1 = v1()
    let todolistID2 = v1()
    let [todolists, setTodolists] = useState<TodolistsType[]>(
        [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'active'}
        ]
    )

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}

        ],
        [todolistID2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Carrot', isDone: false},
            {id: v1(), title: 'Book', isDone: true},
        ]
    })

    return (
        <div className="App">
            {
                todolists.map(t => {

                    let tasksForTodolist = tasks[t.id];
                    if (t.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                    }
                    if (t.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                    }

                    return (
                        <Todolist
                            key={t.id}
                            id={t.id}
                            title={t.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={t.filter}
                            removeTodokist={removeTodokist}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
