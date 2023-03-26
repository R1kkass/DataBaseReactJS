import axios from "axios";
import jwtDecode from "jwt-decode";
import React, {FC, useEffect, useRef, useState,useMemo} from "react";
import MyButton from "../../UI/MyButton/MyButton";
import "./Car.css";
import {useSearchParams} from "react-router-dom"
import { NavLink, Link } from "react-router-dom";
import Paginations from "../../UI/Pagination/Pagination";
import MyModal from "../../UI/MyModal/MyModal";
import Button from "react-bootstrap/esm/Button";
import FormAdd from "../../UI/FormAdd/FormAdd";
import CloseButton from "react-bootstrap/esm/CloseButton";
import ModalUsers from "../../UI/ModalUsers/ModalUsers";
import APICar from "../../API/carApi";
import ModalCar from "../../UI/ModalCar/ModalCar";
import FormEditCar from "../../UI/ModalCar/FormEdit";

interface ICar{
id?: number,
name?: string,
number?: string,
year?: string
}

let post:ICar[] = []
let pages: any = 1
let querys: any =''
let count: any = 0

const Car:FC = ()=>{
document.title="Авто"
const contents: any = []
const Api: any = new APICar()

const [searchParams, setSearchParams]:any = useSearchParams();

const inp = useRef<any>(null)
const [post, setPost] = useState<ICar[]>([])

const fetchCar = async ()=>{
const response = Api.fetchCar(searchParams.get('query') || '', searchParams.get('name') || '', searchParams.get('sort'), searchParams.get('pole'))
.then((res: any)=>{

count=res?.count
setPost(res?.car?.rows)
})
.catch(()=>{
console.error('Ошибка запроса на посты');
})


}
const textRef = useRef<any>(null)

const deleteCar = (id: number)=>{
Api.delete(id)
.finally(()=>{
fetchCar()
})

}
const token:any = localStorage.getItem('token')


useMemo(()=>{
fetchCar()
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
        
        <ModalCar callback={()=>fetchCar()}></ModalCar>
    </div>
<br/>

<div className="Car">
<div className="Car__blockMain">
<div onClick={()=>addParams("id")}>№</div>
<div onClick={()=>addParams("name")}>Название</div>
<div onClick={()=>addParams("year")}>Год</div>
<div onClick={()=>addParams("number")}>Номер</div>
</div>
{post?.map((post)=>(
<>
<div
className="Car__block" key={post?.id}>
<div>{post?.id}</div>
<div>{post?.name}</div>
<div>{post?.year}</div>
<div>{post?.number}</div>
<FormEditCar callback={fetchCar} id={post?.id} name={post?.name} year={post?.year} number={post?.number}/>
<div>
<p onClick = {()=>deleteCar(post?.id || 0)}> <CloseButton /></p>
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

export default Car