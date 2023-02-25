import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = { id: string, title: string, filter: FilterValuesType }

type TasksType = {
    [key: string]: TaskType[]
}

function App() {

    function removeTask(id: string, todolistId: string) {
        tasks[todolistId] = tasks[todolistId].filter(t => t.id != id);
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        tasks[todolistId] = [task, ...tasks[todolistId]]
        setTasks({...tasks});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let task = tasks[todolistId].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks({...tasks});
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter( tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const todolistID1 = v1()
    const todolistID2 = v1()
    let [todolists, setTodolists] = useState<TodolistsType[]>(
        [
            {id: todolistID1, title: "What to do", filter: 'all'},
            {id: todolistID2, title: "What to learn", filter: 'all'}
        ]
    )

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]:
            [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:
            [{id: v1(), title: "Bread", isDone: true},
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Carrot", isDone: false},
                {id: v1(), title: "Book", isDone: false},
                {id: v1(), title: "Phone", isDone: false},
            ]
    });


    return (
        <div className="App">
            {
                todolists.map(tl => {

                    let tasksForTodolist = tasks[tl.id];
                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
