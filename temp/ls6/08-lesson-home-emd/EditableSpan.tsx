import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    spanClasses?: string
    inputClasses?: string
}

const EditableSpan: FC<EditableSpanPropsType> = (
    {
        title,
        changeTitle,
        spanClasses,
        inputClasses
    }) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [localTitle, setLocaleTitle] = useState<string>(title)

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setLocaleTitle(e.currentTarget.value)
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(localTitle)
    }

    return (
        editMode
            ? <input
                value={localTitle}
                onChange={changeLocalTitle}
                autoFocus
                onBlur={offEditMode}
                className={inputClasses}
            />
            : <span
                className={spanClasses}
                onClick={onEditMode}
            >{title}</span>
    );
};

export default EditableSpan;