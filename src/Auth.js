import Swal from 'sweetalert2'
import {uri} from "./Url_base";
import axios from "axios";
import jwt from "jsonwebtoken";
class Auth{
    constructor(){
        this.authenticated=false
    }
    
    login(inputsValue,setter,cb){
      axios({
        method:'POST',
        url:`${uri.link}/api/token/`,
        data:inputsValue,
      })
      .then(res=>{
        console.log('here',res.data)
        if(res.status===200)
            if(res.data && res.data.access){
                //window.localStorage.setItem("tuabalsilennufh","maomhdni")
                // window.localStorage.setItem("token",res.data.token);
                this.authenticated=true;
                cb(res.data.access)
            }
        })

        .catch(err=>{
          console.log('error')
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
       
        })
        setter(false)
    }



    logout(his){
      // axios({ method: 'post', url: uri.link+'user/logout', headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") } }).then(res=>{
      //   window.localStorage.setItem('token','');
      //   window.localStorage.removeItem('tuabalsilennufh');
      //   his.push('/');
        
      // })
             window.localStorage.setItem('erpT','expired');
             his.push('/');
          
          }



    
   async isAuthenticated(){
    let token =window.localStorage.getItem('erpT');
    let user = jwt.decode(token);
    var current_time = Date.now() / 1000;
      if ( user.exp < current_time) 
      /* expired */ 
      console.log('EXPIRED')
      else 
      console.log('STILL')

      
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