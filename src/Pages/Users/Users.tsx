import axios from "axios";
import jwtDecode from "jwt-decode";
import React, {FC, useEffect, useRef, useState,useMemo} from "react";
import API from "../../API/postApi";
import MyButton from "../../UI/MyButton/MyButton";
import "./Users.css";
import {useSearchParams} from "react-router-dom"
import { NavLink, Link } from "react-router-dom";
import Paginations from "../../UI/Pagination/Pagination";
import MyModal from "../../UI/MyModal/MyModal";
import Button from "react-bootstrap/esm/Button";
import FormAdd from "../../UI/FormAdd/FormAdd";
import CloseButton from "react-bootstrap/esm/CloseButton";
import APIUsers from "../../API/usersApi";
import ModalUsers from "../../UI/ModalUsers/ModalUsers";

interface IUser{
id?: number,
role?: string,
email?: string,
data?: string
}

let post:IUser[] = []
let pages: any = 1
let querys: any =''
let count: any = 0

const Users:FC = ()=>{
document.title="Пользователи"
const contents: any = []
const Api: any = new APIUsers()

const [searchParams, setSearchParams]:any = useSearchParams();

const inp = useRef<any>(null)
const [post, setPost] = useState<IUser[]>([])

const fetchUsers = async ()=>{

const response = Api.fetchUsers(searchParams.get('query') || '', searchParams.get('role') || '', searchParams.get('sort'), searchParams.get('pole'))
.then((res: any)=>{
count=res?.count
setPost(res?.user?.rows)
console.log(res.user);
})
.catch(()=>{
console.error('Ошибка запроса на посты');
})
}
const textRef = useRef<any>(null)

const deleteUsers = (id: number)=>{
Api.delete(id)
.finally(()=>{
fetchUsers()
})

}
const token:any = localStorage.getItem('token')

const addRequest = (text:string)=>{
console.log(jwtDecode(token));

Api.add(text, jwtDecode(token) || 'none')
.then(()=>{
fetchUsers()
})

}

useMemo(()=>{
fetchUsers()
},[searchParams])

const [sorts,setSorts] = useState(true)

const addParams = (pole?: string)=>{
    setSorts(s=>!s);
    sorts ? searchParams.set('sort', "DESC") : searchParams.set('sort', "ASC")
    searchParams.set('pole', pole)
    setSearchParams(searchParams.toString())
}

return(
<>
    <div className="Search">
        
        <input placeholder="Поиск по описанию" type="text" ref = {inp}/>
            <Button className="btn-lg" onClick={()=>{
                    searchParams.set('query', inp?.current?.value)
                    setSearchParams(searchParams.toString())
            }}>
                Поиск
            </Button>
        
    </div>
<br/>

<div className="Users">
<div className="Users__blockMain">
<div onClick={()=>addParams("id")}>№</div>
<div onClick={()=>addParams("email")}>Логин</div>
<div onClick={()=>addParams("role")}>Роль</div>
</div>
{post?.map((post)=>(
<>
<div
className="Users__block" key={post?.id}>
<div>{post?.id}</div>
<div>{post?.email}</div>
<div>{post?.role}</div>
<ModalUsers callback={fetchUsers} id={post?.id} role={post?.role} />
<div>
<p onClick = {()=>deleteUsers(post?.id || 0)}> <CloseButton /></p>
</div>
</div>
</>
))}
</div>
<div className="Pagination">
<Paginations post = {post} count={count}/>
</div>
</>
)
}

export default Users