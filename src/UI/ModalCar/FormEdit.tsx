import React,{FC, useRef, useState} from "react"
import { Button } from "react-bootstrap"
import APICar from "../../API/carApi"
import MyModal from "../MyModal/MyModal"
import './ModalCar.css'

interface IModalCar{
    name?: string ,
    year?: string
    number?: string,
    callback?: any,
    id?:any
}

const FormEditCar: FC<IModalCar> = ({callback, name,number, year, id})=>{
    const Api = new APICar()
    const [nameState, setNameState] = useState<any>(name)
    const [numberState, setNumberState] = useState<any>(number)
    const [yearState, setYearState] = useState<any>(year)
    
    const editCar = (id: any)=>{
        Api.edit(id, nameState, yearState, numberState)
        callback()
    }   
    
    return(
    
        <MyModal nameButton={'Редактировать'}>
            <div className="formAdd">
            <label>
                <h5>Название машины</h5>
                <input onChange = {(e)=>setNameState(e?.target?.value)} value={nameState}/>
            </label>
            <br/>
            <label>
                <h5>Номер</h5>
                <input onChange = {(e)=>setNumberState(e?.target?.value)} value={numberState}/>
            </label>
            <br/>
            <label>
                <h5>Год</h5>
                <input onChange = {(e)=>setYearState(e?.target?.value)} value={yearState}/>
            </label>
            <br/>
            <Button onClick={()=>editCar(id)}>
                Сохранить
            </Button>
            </div>
        </MyModal>
    
    )
}

export default FormEditCar