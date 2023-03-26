import jwtDecode from "jwt-decode";
import React, {FC, useRef, useState,useEffect} from "react";
import Button from "react-bootstrap/esm/Button";
import MyModal from "../MyModal/MyModal";
import './FormAdd.css'

interface IFormAdd{
    click?: any,
    nameButton3?: string
}

const FormAdd: FC<IFormAdd> = ({click, nameButton3})=>{
    
    const textRef = useRef<any>('')
    const categoryRef = useRef<any>('')
    const [categorySt, setCategorySt]=useState<any>('Замена оборудования')
    const [addInputs,setAddInputs] = useState<any>('')
    const timeRef = useRef<any>('')
    const timeRef2 = useRef<any>('')
    const road = useRef<any>('')

    const [arrSt, setArrSt] = useState<any>([])
    const arrOst:Array<string> = [] 
    const allRoad = []

    const addOst = () =>{
        arrOst.push(textRef.current?.value)
        setArrSt([...arrOst, ...arrSt])
        console.log(arrSt);
        textRef.current.value = ''
        
    }

    const addFetch = ()=>{
        if(categorySt=="Поездка"){
        click("'"+arrSt+"'", categoryRef.current?.value, timeRef?.current?.value + ' ' + timeRef2?.current?.value)
        console.log(JSON.stringify(arrSt));
        
        }else{            
        click(textRef.current?.value, categoryRef.current?.value, timeRef?.current?.value + ' ' + timeRef2?.current?.value )
        }
    }


    return(
        <MyModal nameButton2="Добавить" click={click} nameButton={nameButton3 || "+"}>
            <div style={{overflow:'hidden'}} className="FormAdd">
                <div><label>
                    Категория
                    <br/>
                    <select ref={categoryRef} onChange={((e:any)=>setCategorySt(e.target.value))} placeholder="">
                        <option value={categorySt} disabled selected>{categorySt}</option>
                        <option value="Замена оборудования">Замена оборудования</option>
                        <option value="Замена катриджа">Заправка катриджа</option>
                        <option value="Поездка">Поездка</option>
                    </select>
                </label>
                </div>
                <br/>
                <div>
                <label>{categorySt=="Поездка" ? "Куда" : 'Опишите Вашу проблему'}
                    <br/>
                    {categorySt == "Поездка" ?  
                    <>
                    <div><input ref={textRef} placeholder="Куда"/>
                    <Button onClick = {addOst}>+</Button>
                    <p>{arrSt.join(', ')}</p>
                </div>
                <br/>
                <label>
                    Когда
                    <br/>
                    <input type="date" ref={timeRef2} placeholder="Во сколько"/>
                </label>
                <input type="time" ref={timeRef} placeholder="Во сколько"/>
                </>
                : 
                <textarea  ref = {textRef} placeholder="Описание"/>
                }
                    <br/>
                </label>
                </div>
                <br/>
                <Button onClick={()=>addFetch()} variant="primary">Добавить</Button>
            </div>
        </MyModal>
    )
}
export default FormAdd