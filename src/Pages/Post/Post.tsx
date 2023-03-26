import axios from "axios";
import jwtDecode from "jwt-decode";
import React, {FC, useEffect, useRef, useState} from "react";
import API from "../../API/postApi";
import MyButton from "../../UI/MyButton/MyButton";
import "./Post.css";
import {useSearchParams} from "react-router-dom"
import { NavLink, Link } from "react-router-dom";
import Paginations from "../../UI/Pagination/Pagination";
import MyModal from "../../UI/MyModal/MyModal";
import Button from "react-bootstrap/esm/Button";
import FormAdd from "../../UI/FormAdd/FormAdd";
import CloseButton from "react-bootstrap/esm/CloseButton";
import ModalPost from "../../UI/ModalPost/ModalPost";

interface IUser{
id?: number,
text?: string,
email?: string,
data?: string, 
category?: string,
time?: string,
status?: string
}

let post:IUser[] = []
let pages: any = 1
let querys: any =''
let count: any = 0

const Post:FC = ()=>{
document.title="Посты"
const contents: any = []
const Api: any = new API()

const [searchParams, setSearchParams]:any = useSearchParams();

const inp = useRef<any>(null)
const [post, setPost] = useState<IUser[]>([])

const fetchUsers = async ()=>{
searchParams.set('search', selectRef?.current?.value)
setSearchParams(searchParams.toString())
const response = Api.fetchPost(searchParams.get('query') || '', searchParams.get('page') || 1, searchParams.get('sort') || 'DESC', searchParams.get('pole') || 'id',searchParams.get('search') || '')
.then((res: any)=>{
count=res?.count
setPost(res.rows)
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

const addRequest = (text:string, category: string, time:string)=>{
Api.add(text, jwtDecode(token) || 'none', category,time)
.then(()=>{
fetchUsers()
})
}

useEffect(()=>{
fetchUsers()
},[searchParams])

const [sorts,setSorts] = useState(true)

const addParams = (pole?: string)=>{
    setSorts(s=>!s);
    sorts ? searchParams.set('sort', "DESC") : searchParams.set('sort', "ASC")
    searchParams.set('pole', pole)
    setSearchParams(searchParams.toString())
}

const addSearch=()=>{
    searchParams.set('search', selectRef?.current?.value)
}

const selectRef = useRef<any>('')

return(
<>
    <div className="Search">
        <label>
            Искать по
            <br/>
        <select ref={selectRef}>
            <option value="text">Описанию</option>
            <option value="category">Категориям</option>
            <option value="email">Логину</option>
            <option value="id">Номеру</option>
            <option value="data">Дате</option>
            <option value="status">Статусу</option>
        </select>
        </label>
        <input placeholder="Введите запрос..." type="text" ref = {inp}/>
            <Button className="btn-lg" onClick={()=>{
                    searchParams.set('query', inp?.current?.value)
                    setSearchParams(searchParams.toString())
            }}>
                Поиск
            </Button>
        
        <FormAdd click={addRequest}/>
    </div>
<br/>

<div className="Post">
<div className="Post__blockMain">
<div onClick={()=>addParams("id")}>№</div>
<div onClick={()=>addParams("email")}>Логин</div>
<div onClick={()=>addParams("category")}>Категория</div>
<div onClick={()=>addParams("text")}>Описание</div>
<div onClick={()=>addParams("data")}>Дата</div>
<div onClick={()=>addParams("status")}>Статус</div>
</div>
{post?.map((post)=>(
<>
<div
className="Post__block" key={post?.id}>
<div>{post?.id}</div>
<div>{post?.email}</div>
<div>{post?.category}</div>
<div>{post?.text}</div>
<div>{post?.data}</div>
<div>{post?.status}</div>
<ModalPost callback={fetchUsers} post={post}></ModalPost>
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

export default Post