import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React,{FC,useEffect,useState,useRef} from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import "./Layout.css"

interface IEmail{
    email?: any
}

interface ILayout{
    children: any
}

const Layout:FC<ILayout> = ({children})=>{
    

    const [auth, setAuth] = useState('')
const location = useLocation()
const localhost = new URLSearchParams(location.search).get('location')

let [token,setToken] = useState(false)
const check = async ()=>{

const response:any = await axios.post('http://localhost:5001/api/user/authcheck', {
email: 'kto'
}, {headers: {
Authorization: `Bearer ${localStorage.getItem('token')}`
}}
)
.then((e:any)=>{
    console.log(e.response.bool);
    if(!e?.response?.data?.bool){
        setToken(!e.response.data.bool)
        console.log(token);
        }
})
.catch((e?)=>{
    console.log(e);
})

}

useEffect(()=>{
check()
}, [location,localStorage.getItem('token'), token])

const email:any =localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token') || '' ) : ''

    return(
        <>
            <div className='content'>
                <div className='Header'>
                <div>
                <NavLink  to="/postmy" 
                    className={
                    ({ isActive }) =>
                    isActive ? 'active' : 'a'
                    }>
                        Мои заявки
                    </NavLink>
                    <NavLink  to="/post" 
                    className={
                    ({ isActive }) =>
                    isActive ? 'active' : 'a'
                    }>
                        Заявки
                    </NavLink>
                    <NavLink to="/users" 
                    className={
                    ({ isActive }) =>
                    isActive ? 'active' : 'a'
                    }>
                        Пользователи
                    </NavLink>
                    {
                        email.role=='ADMIN' ?
                        <NavLink to="/car" 
                        className={
                        ({ isActive }) =>
                        isActive ? 'active' : 'a'
                        }>Авто
                        </NavLink>
                            :
                            ''
                    }
                    {token ?
                        <NavLink to="/login" 
                        className={
                        ({ isActive }) =>
                        isActive ? 'active' : 'a'
                        }>
                            Войти
                        </NavLink>
                        :
                        <>
                        <a className="a" onClick={()=>{localStorage.removeItem('token');check()}}>Выйти</a>
                        
                        </>
                    }

                    </div>
                    <div>{email?.email}</div>
                    </div>
                
                {children}
            </div>
            <div className='Footer'>
                <p>О нас</p>
            </div>
        </>
    )
}

export default Layout