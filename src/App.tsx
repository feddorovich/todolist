import React, {useState} from 'react';
import './App.css';
import {PropsType, TaskType, Todolist} from './Todolist';

export type ButtonNameType = 'all' | 'active' | 'completed'

function App() {

let [tasks1, setTasks1] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskId: number, id2: string) => {
        setTasks1(tasks1.filter((el) => el.id !== taskId))
        console.log(tasks1)
    }

    // const filteringTasks = (buttonName: ButtonNameType) => {
    //     setfilterTask(buttonName)
    //     console.log(buttonName)
    // }
    //
    // let [filterTask, setfilterTask] = useState<ButtonNameType>('all')
    //
    // let filteredTasks = tasks1
    // if (filterTask === 'active') {
    //     filteredTasks = tasks1.filter(el => el.isDone)
    // }
    // if (filterTask === 'completed') {
    //     filteredTasks = tasks1.filter(el => !el.isDone)
    // }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks1}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
