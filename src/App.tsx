import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ])

    function removeTask(id: number) {
        let filteredTask = tasks.filter((el) => el.id !== id)
        setTasks(filteredTask)
        console.log(filteredTask)
    }

    let [filter, SetFilter] = useState<FilterValuesType>('all')

    let tasksForTodolisk = tasks
    if (filter === 'completed') {
        tasksForTodolisk = tasks.filter( (el) => el.isDone === true)
    }
    if (filter === 'active') {
        tasksForTodolisk = tasks.filter( (el) => el.isDone === false)
    }

    function changeFilter(value: FilterValuesType) {
        SetFilter(value)
        console.log(value)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolisk}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
