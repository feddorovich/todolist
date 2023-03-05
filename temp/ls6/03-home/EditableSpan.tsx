import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChangeTaskTitle: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const openEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const openViewMode = () => {
        setEditMode(false)
        props.onChangeTaskTitle(title)
    }

    return (
        editMode
            ? <input value={title} onChange={onChangeTitleHandler} onBlur={openViewMode} autoFocus/>
            : <span onDoubleClick={openEditMode}>{props.title}</span>
    )
}