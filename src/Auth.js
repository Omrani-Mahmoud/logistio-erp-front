import Swal from 'sweetalert2'
import {uri} from "./Url_base";
import axios from "axios";
import jwt from 'jsonwebtoken'
class Auth{
    constructor(){
        this.authenticated=false
    }
    
    login(inputsValue,setter,cb){
      axios({
        method:'POST',
        url:`${uri.link}/token/`,
        data:inputsValue,
      })
      .then(res=>{
      
        if(res.status===200)
        {
          setter(false)
          console.log('here token',res)

            if(res.data && res.data.token){
                this.authenticated=true;
                cb(res.data.token,res.data.ch_auth)
            }
          }
       
        })

        .catch(err=>{
          setter(false)
          console.log('error',err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.message && err.response.status===401 ? err.response.data.message:'Something went wrong!'}`,
          })
       
        })
   
    }



    logout(his){
      axios({ method: 'post',
              url:`${uri.link}/logout`,
              headers: { 'auth-token': window.localStorage.getItem("erpT") } })
          .then(res=>{

            window.localStorage.setItem('erpT','expired');
            window.location.replace('/')
              
      })
          
          }



    
    isAuthenticated(){
    let token =window.localStorage.getItem('erpT');
    let user ={};
    let value = false;
    if(token!=='expired'){
      user = jwt.decode(token);
    }
   
    var current_time = Date.now() / 1000;
    if(user && Object.keys(user).length>0){
      if ( user.exp < current_time) 
          value = false;
      else
        value = true
    }
    else{
      value = false
    }
    
    return value
      
      // await axios.get(uri.link+"user/me",{

      //       headers:{
      //         'Authorization':`Bearer ${window.localStorage.getItem("token")}`}
      //       })
      //         .then(res=>{
         
      //        window.localStorage.setItem("erpT",'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEwMDU3NzY0LCJqdGkiOiI0MWQ5N2QzNmI2NjE0YmM3OTk2ZDg3ODcxOTc1MmY2NSIsInVzZXJuYW1lIjoicm9vdCJ9.obR0uJ2owtJFypNwh6qSHyzEnPFgZSlKEkOi9KGTPTA')
                
      //         })
      //         .catch(err=>{
      //           window.localStorage.setItem("erpT",'')
      //         })


    }


}

export default new Auth()