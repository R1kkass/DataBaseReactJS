import axios from "axios";
import React,{FC, useEffect, useState, useRef} from "react";
import "./Registration.css"
import jwt_decode from "jwt-decode"

const Registration: FC = ()=>{
    const [error, setError] = useState<any>()
    const login = useRef<any>()
    const [lg, setLg] = useState<any>()
    const password = useRef<any>()
    const [krut, setKrut] = useState({page: '', inf: 'a'})
    document.title="Регистрация"

    
    async function auth() {
        console.log('r');
        
        const response = await axios.post('http://localhost:5001/api/user/login',{
            email:login.current?.value, 
            password: password.current?.value
        })
        .then((response:any)=> {
            setError('')
            localStorage.setItem('token', response.data.token)
            console.log('fd')
            document.location.href = '/'
            return jwt_decode(response.data.token)
            
          })
          .catch(function (e) {
            setError('Неверный логин или пароль')
            console.log(e);
            
        })  
    } 

   

    async function check() {
    
        const response = await axios.get('http://localhost:5001/api/user/auth',{
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        )
        .then(function () {
            setError(true)
            
          })
          .catch(function () {
            setError(false)
        })  
    } 



    // console.log(jwt_decode(localStorage.getItem('token')))
    useEffect(()=>{
        check()
        console.log(localStorage.getItem('token'))
      }, [lg])

      const token = localStorage.getItem('token')

    return(
        <>
        {
            token ? <div className="Login">
            <div>
                <h1>Вы авторизованы</h1>
            </div>
        </div> :    
        
        <div className="Login">
            <div>
                <h1>Регистрация</h1>
                <input ref = {login} placeholder="Логин"/>
                <input ref={password} placeholder="Пароль" type="password"/>
                <div>
                <button onClick={auth}>Зарегистрироваться</button>
                </div>
            </div>
        </div>
    }
        </>
    )
}
export default Registration