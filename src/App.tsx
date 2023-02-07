import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterValeusType = 'all' | 'completed' | 'active'

function App():JSX.Element {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Redux", isDone: false }
    ])
    let [filter, setFilter] = useState<FilterValeusType>('all')

    function removeTask(id: number) {
       let filteredTask = tasks.filter( (el) => el.id !== id)
        setTasks(filteredTask)
    }

    function changeFilter(value: FilterValeusType) {
        setFilter(value)
    }

    let tasksForTodolist = tasks
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter( (t) => t.isDone === true)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter( (t) => t.isDone === false)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
