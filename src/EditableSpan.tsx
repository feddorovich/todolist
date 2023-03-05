import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTaskTitle: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [text, setText] = useState('')

    const activeEditMode = () => {
        setEditMode(true)
        setText(props.title)
    }
    const activeViewMode = () => {
        setEditMode(false)
        props.changeTaskTitle(text)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={text} onChange={onChangeHandler} onBlur={activeViewMode} autoFocus/>
            : <span onDoubleClick={activeEditMode}>{props.title}</span>
    )
}