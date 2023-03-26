import axios from "axios";

export default class APIUsers{
    async fetchUsers(email:string, role: number,sort?: string, pole?: string){
        console.log(pole,sort);
        
        const response= await axios.get(`http://localhost:5001/api/user/getall?email=${email || ''}&role=${role || ''}&sort=${sort || 'DESC'}&pole=${pole || 'id'}`,{
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
        console.log(localStorage.getItem('token'));
        return true
    }

    async edit(role?:string, id?: number){
        console.log(role, id);
        
        const response = await axios.put('http://localhost:5001/api/user/edit', {
            role: role || 'USER',
            id: id || 0
        },{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        return true
    }
}