import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilteredValuesType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ])

    function removeTask(id: number) {
        let filteredTasks = tasks.filter( (el) => el.id !== id)
        setTasks(filteredTasks)
        console.log(id)
    }

    function changeFilter(value: FilteredValuesType) {
        setFilter(value)
    }

    let [filter, setFilter] = useState<FilteredValuesType>('all')
    let taskForTodolist = tasks
    if (filter === 'active') {
        taskForTodolist = tasks.filter( (el) => el.isDone === false)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter( (el) => el.isDone === true)
    }



    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
