import axios from "axios";
import React,{FC, useEffect, useState, useRef} from "react";
import "./Login.css"
import jwt_decode from "jwt-decode"

const Login: FC = ()=>{
    const [error, setError] = useState<any>()
    const login = useRef<any>()
    const [lg, setLg] = useState<any>()
    const password = useRef<any>()
    const [krut, setKrut] = useState({page: '', inf: 'a'})
    document.title="Авторизация"
    
    async function auth() {
        
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

    const [tokens, setTokens]= useState<any>()

    async function check() {
        const response = await axios.post('http://localhost:5001/api/user/authcheck',{
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        )
        .then((e:any)=>{
            if(!e.response.data.bool){
                setTokens(!e.response.data.bool)
                console.log(tokens);
                }else{
                    setTokens(true)
                }
        })
        .catch((e:any)=>{
            if(!e.response.data.bool){
            setTokens(!e.response.data.bool)
            console.log(tokens);
            }else if(e.response.data.bool){
                setTokens(true)
                console.log(tokens);
            }
            
            
        })
    } 

    useEffect(()=>{
        check()
      }, [lg])

      const token = localStorage.getItem('token')

    return(
        <>
        {
            !tokens ? <div className="Login">
            <div>
                <h1>Вы авторизованы</h1>
                
            </div>
        </div> :    
        
        <div className="Login">
            <div>
                <h1>Вход</h1>
                <input ref = {login} placeholder="Логин"/>
                <input ref={password} placeholder="Пароль" type="password"/>
                <div>
                <button onClick={auth}>Войти</button>
                </div>
            </div>
        </div>
    }
        </>
    )
}
export default Login