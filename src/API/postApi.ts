import axios from "axios";

export default class API{
    async fetchPost(query:string, page: number,sort?: string, pole?: string, search?:string){
        if(query=='null'){
            query=''
        }
        
        const response= await axios.get(`http://localhost:5001/api/request/find?limit=10&page=${page || 1}&query=${query || ''}&sort=${String(sort) || 'DESC'}&pole=${pole}&search=${search || ''}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .catch((e)=>{
            console.log(e)
        })
        .then((response)=>{
            return(response?.data)
        })

        return (response)
    }

    async fetchMyPost(query:string, page: number,sort?: string, pole?: string, search?:string, login?:any){
        if(query=='null'){
            query=''
        }
        
        const response= await axios.get(`http://localhost:5001/api/request/findmy?limit=10&page=${page || 1}&query=${query || ''}&sort=${String(sort) || 'DESC'}&pole=${pole}&search=${search || ''}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .catch((e)=>{
            console.log(e)
        })
        .then((response)=>{
            return(response?.data)
        })

        return (response)
    }

    async delete(id:number){
        const response = await axios.post('http://localhost:5001/api/request/delete', {
            id:id
            
        },{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return true
    }

    async add(text:string, email: any, category: string, time?: string){
        const response = await axios.post('http://localhost:5001/api/request/add', {
            text: text,
            email: email || 'none',
            date: Date.now(),
            category : category || 'none',
            time: time || 'none',
            status: "Еще непросмотрен"
        })
        console.log(true);
        
        return true
    }

    async edit(status: string, id: number){
        const response = await axios.put('http://localhost:5001/api/request/edit', {
            status: status || 'Принят в работу',
            id: id || '0',
        },{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        return true  
    }
}