import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "./TodoList";
import EditableSpan from "./EditableSpan";
import {Checkbox, IconButton, List, ListItem} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

type TasksListPropsType = {
    todoListId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
}

const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
            ? props.tasks.map((task) => {
                const taskClasses = task.isDone ? "task task-done" : "task"
                const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)
                const changeTaskStatusHandler =
                    (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                const changeTaskTitleHandler = (title: string) =>
                    props.changeTaskTitle(task.id, title, props.todoListId)
                return (
                    <ListItem disableGutters
                              divider
                              secondaryAction={
                                  <IconButton color={'secondary'}
                                              size={'small'}
                                              onClick={removeTaskHandler}>
                                      <HighlightOffIcon/>
                                  </IconButton>
                              }
                              key={task.id}>
                        <Checkbox size={'small'}
                                  checked={task.isDone}
                                  onChange={changeTaskStatusHandler}
                        />
                        <EditableSpan title={task.title} spanClasses={taskClasses} changeTitle={changeTaskTitleHandler}/>
                    </ListItem>
                )
            })
            : <span>Your taskslist is empty</span>
    return (
        <List disablePadding={false}>
            {tasksItems}
        </List>
    );
};

export default TasksList;