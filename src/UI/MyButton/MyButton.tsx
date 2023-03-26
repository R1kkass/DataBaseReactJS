import React, {Children, FC} from "react";
import './MyButton.css'

interface CardProps{
    id?:number,
    height?: string,
    children?: any,
    onClick?: ()=> any
}

const MyButton: FC<CardProps> = ({onClick, id, height, children})=>{
    return(
        <button onClick={onClick} className="Btn">
            {children}
        </button>
    )
}

export default MyButton