import React,{FC, useRef, useState} from "react"
import { Button } from "react-bootstrap"
import APICar from "../../API/carApi"
import MyModal from "../MyModal/MyModal"

interface IModalCar{
    name?: string ,
    year?: string
    number?: string,
    callback?: any,
    id?:any
}

const ModalCar: FC<IModalCar> = ({callback})=>{
    const Api = new APICar()
    const [nameState, setNameState] = useState<any>()
    const [numberState, setNumberState] = useState<any>()
    const [yearState, setYearState] = useState<any>()

    const addCar = ()=>{
        Api.add(nameState, yearState, numberState)
        callback()
    }   
    
    return(
    <>
        <MyModal nameButton={'+'}>
            <br />
        <label>
            <h5>Название машины</h5>
            <input onChange = {(e)=>setNameState(e?.target?.value)} value={nameState}/>
        </label>
        
        <label>
            <h5>Номер</h5>
            <input onChange = {(e)=>setNumberState(e?.target?.value)} value={numberState}/>
        </label>
        
        <label>
            <h5>Год</h5>
            <input onChange = {(e)=>setYearState(e?.target?.value)} value={yearState}/>
        </label>
        <br/>
        <Button onClick={()=>addCar()}>
            Сохранить
        </Button>
        </MyModal>
    </>
    )
}

export default ModalCar