import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    taskClasses?: string
    inputClasses?: string
}

export const EditableSpan: FC<EditableSpanPropsType> = (
    {
        title,
        changeTitle,
        taskClasses,
        inputClasses
    }
) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [localeTitle, setlocaleTitle] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setlocaleTitle(e.currentTarget.value)
    }
    const onEditMode = () => {
        setEditMode(true)
        setlocaleTitle(title)
    }
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(localeTitle)
    }

    return (
        editMode
            ? <input
                value={localeTitle}
                onChange={onChangeHandler}
                autoFocus
                onBlur={offEditMode}
                className={inputClasses}
            />
            : <span onClick={onEditMode} className={taskClasses}>{title}</span>
    );
};