import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {IconButton, TextField} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type AddItemFormType = {
    maxLengthUserMessage: number
    addNewItem: (title: string) => void
}

const AddItemForm: FC<AddItemFormType> = ({
    maxLengthUserMessage,
    addNewItem
}) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>)=>{
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            addNewItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>)=> e.key === "Enter" && addItem()


    const userErrorMessage = error && <div style={{color: "hotpink"}}>Title is required!</div>
    const isUserMessageToLong: boolean = title.length > maxLengthUserMessage
    const isAddBtnDisabled = !title.length || isUserMessageToLong || error
    const userMaxLengthMessage = isUserMessageToLong && <div style={{color: "hotpink"}}>Title is to long!</div>
    const inputErrorClasses = error || isUserMessageToLong ? "input-error" : ""
    const onKeyDownHandler = isAddBtnDisabled ? undefined : onKeyDownAddItem
    const isInputShowError = isUserMessageToLong || error
    const helperText = (error && "Title is required!") || (isUserMessageToLong && "Title is to long!")
    return (
        <div>
            <TextField
                size="small"
                value={title}
                placeholder="Please, enter title"
                onChange={changeLocalTitle}
                onKeyDown={onKeyDownHandler}
                className={inputErrorClasses}
                error={isInputShowError}
                helperText={helperText}
            />

            <IconButton
                size={"small"}
                onClick={addItem}
                disabled={isAddBtnDisabled}
                color={"primary"}
            >
                <AddCircleOutlineIcon />
            </IconButton>
            {/*{userMaxLengthMessage}*/}
            {/*{userErrorMessage}*/}
        </div>
    );
};

export default AddItemForm;