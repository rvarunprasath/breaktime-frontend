import axios from "axios";
import {JPA_API_URL} from "./constants/constants"
class DataService{

    
    verify(email,password)
    {
        return axios.post(`${JPA_API_URL}/login`,{"email":email,"password":password});
    }

    checkExist(email)
    {
        return axios.post(`${JPA_API_URL}/check`,{"email":email});
    }

    create(fname,lname,email,password)
     {
      return axios.post(`${JPA_API_URL}/addUser`,{"firstName":fname,"lastName":lname,"email":email,"password":password});
   }

   addIntrest(data)
   {
       //alert(data);
       return axios.post(`${JPA_API_URL}/addPayload`,{"email":sessionStorage.getItem('username'),"interest_ids":data});
   }

   getInterest()
   {
       return axios.get(`${JPA_API_URL}/${sessionStorage.getItem('username')}/interests`)
   }

   deleteInterest(id)
   {
       return axios.delete(`${JPA_API_URL}/${sessionStorage.getItem('username')}/${id}`)
   }

    
}
export default new DataService()