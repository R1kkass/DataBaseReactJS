import React,{FC, useEffect, useState, useMemo} from "react";
import { Link } from "react-router-dom";
import { NavLink, useSearchParams } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import PaginationComponent from "./PaginationComponent";

interface CardProps{
    count:number,
    post: object 
}

const Paginations: FC<CardProps> = ({count,post})=>{
    const [searchParams, setSearchParams]:any = useSearchParams();
    const [blockPag, setBlockPag] = useState()

    const contents: any = []

    function pagM (this: any, id: number){
        searchParams.set('page', id)
        console.log(this);
        
        setSearchParams(searchParams.toString())
    }

    let a =0

    const pag = () => {
        contents.length=0
        if(Math.ceil(count/10)<8)
        for(let i = 0; i<Math.ceil(count/10); i++){
        contents.push(<>
        <Pagination.Item onClick={()=>pagM(i+1)}>{1+i}</Pagination.Item>
        </>
        );
        
        setBlockPag(contents)
        }else {
            a=0
            a=Number(searchParams.get('page'))
            if(Number(searchParams.get('page'))>3 && Number(searchParams.get('page'))<Math.ceil(count/10)-2){
                
            for(let i = Number(searchParams.get('page'))-3 ; i<a+2; i++){
 
                contents.push(<>
                    <Pagination.Item  onClick={()=>pagM(i+1)}>{1+i}</Pagination.Item>
                </>
                )}
                
            }else if(Number(searchParams.get('page'))<=3 &&  Number(searchParams.get('page'))<Math.ceil(count/10)-2){
                for(let i = 1; i<6; i++){
                    
                    contents.push(<>
                    
                        <Pagination.Item onClick={()=>pagM(i+1)} >{1+i}</Pagination.Item>
                    
                    </>
                    );
                }}
            else if(Number(searchParams.get('page'))>=Math.ceil(count/10)-2){
                
                for(let i = Math.ceil(count/10)-6; i<Math.ceil(count/10)-1; i++){
                    contents.push(<>
                    
                        <Pagination.Item onClick={()=>pagM(i+1)}>{1+i}</Pagination.Item>
                    
                    
                    </>
                    );
                    }
            }
        }
            setBlockPag(contents)
        }
        

    useMemo(()=>{
        pag()
    },[count,post,searchParams])

    return(
        <>
        <PaginationComponent max={Math.ceil(count/10)}>{blockPag}</PaginationComponent>
        </>
    )
}

export default Paginations