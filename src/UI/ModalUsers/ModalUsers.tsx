import React,{FC, useRef, useState} from "react"
import { Button } from "react-bootstrap"
import APIUsers from "../../API/usersApi"
import MyModal from "../MyModal/MyModal"

interface IModalUsers{
    role?: string ,
    id?: number,
    callback?: any
}

const ModalUsers: FC<IModalUsers> = ({role, id, callback})=>{
    const Api = new APIUsers()
    const [roleState, setRoleState] = useState<any>(role)
    console.log(roleState);
    
    const editRole = (roles: string, ids: number)=>{
        Api.edit(roleState, ids)
        callback()
        console.log(roleState);
        
    }

   
    
    return(
    <>
        <MyModal nameButton={'Подробнее'}>
            <br />
        <label>
            <h5>Роль</h5>
            <input onChange = {(e)=>setRoleState(e?.target?.value)} value={roleState}/>
        </label>
        <br/>
        <Button onClick={()=>editRole(roleState || 'USER', id || 0)}>
            Сохранить
        </Button>
        </MyModal>
    </>
    )
}

export default ModalUsers