import Swal from 'sweetalert2'
import {uri} from "./Url_base";
import axios from "axios";

class Auth{
    constructor(){
        this.authenticated=false
    }
    
    login(inputsValue,cb){
      axios.post(uri.link+'user/login',inputsValue)
      .then(res=>{
        console.log('after res')
            if(res.data && res.data.token){
                window.localStorage.setItem("tuabalsilennufh","maomhdni")
                window.localStorage.setItem("token",res.data.token);
                this.authenticated=true
                cb()
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
       
    }

    logout(his){
      axios({ method: 'post', url: uri.link+'user/logout', headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") } }).then(res=>{
        window.localStorage.setItem('token','');
        window.localStorage.removeItem('tuabalsilennufh');
        his.push('/');
        
      })
          
          }



    
   async isAuthenticated(){
      await axios.get(uri.link+"user/me",{

            headers:{
              'Authorization':`Bearer ${window.localStorage.getItem("token")}`}
            })
              .then(res=>{
         
             window.localStorage.setItem("tuabalsilennufh",'maomhdni')
                
              })
              .catch(err=>{
                window.localStorage.setItem("tuabalsilennufh",'hindomam')
              })

    }


}

export default new Auth()