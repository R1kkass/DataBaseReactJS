import Pagination from 'react-bootstrap/Pagination';
import React,{FC, useMemo} from 'react'
import { useSearchParams } from 'react-router-dom';
import "./Pagination.css"


interface IPag{
    children?: any,
    max?: any
}

const PaginationComponent:FC<IPag> = ({children, max}) =>{
    const [searchParams, setSearchParams]:any = useSearchParams();
    const pagM = (id: number)=>{
        searchParams.set('page', id)
        console.log(searchParams.toString());
        setSearchParams(searchParams.toString())
        console.log(max);   
    }

  return (
    <>
     {(max > 7) ? 
    <Pagination className='pagination'>
      <Pagination.Item onClick={()=>pagM(1)}>{1}</Pagination.Item>
      <div className='ots'></div>
            {children}
      <div className='ots'></div>
      <Pagination.Item onClick={()=>pagM(max)}>{max}</Pagination.Item>
      
    </Pagination>
    :
    <Pagination>
          {children}
  </Pagination>
}

    </>
    
  );
}

export default PaginationComponent;