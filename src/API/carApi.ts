import axios from "axios";

export default class APICar{
    async fetchCar(query:string, page: number,sort?: string, pole?: string){
        if(query=='null'){
            query=''
        }
        const response= await axios.get(`http://localhost:5001/api/car/getall?limit=10&page=${page}&query=${query}&sort=${sort || ''}&pole=${pole || ''}`,{
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


    async add(name:string, year: any, number: string){
        const response = await axios.post('http://localhost:5001/api/car/addcar', {
            name: name || 'none',
            year: year || 'none',
            number: number || 'none'
        })   
        return true
    }

    async edit(id: any,name:string, year: any, number: string){
        const response = await axios.put('http://localhost:5001/api/car/edit', {
            id:id || '0',
            name: name || 'none',
            year: year || 'none',
            number: number || 'none'
        })   
        return true
    }

    async delete(id: any){
        const response = await axios.post('http://localhost:5001/api/car/deletecar', {
            id
        })   
        return true
    }
}