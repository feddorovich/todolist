import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilteredValuesType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTaks] = useState<Array<TaskType>>([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Redux", isDone: false }
    ])

/*    function removeTask(id: number) {
        let filteredTask = tasks.filter( (el) => el.id !== id )
        setTaks(filteredTask)
        console.log(filteredTask)
    }

    let [filter, setFilter] = useState<FilteredValuesType>('all')

    let tasksForTodoLisk = tasks
    if(filter === 'active') {
        tasksForTodoLisk = tasks.filter( (el) => el.isDone === false)
    }
    if(filter === 'completed') {
        tasksForTodoLisk = tasks.filter( (el) => el.isDone === true)
    }

    function changeFilter(value: FilteredValuesType) {
        setFilter(value)
        console.log(value)
    }*/

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                setTaks={setTaks}
            />
        </div>
    );
}

export default App;
