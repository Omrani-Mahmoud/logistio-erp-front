import React from 'react'
import {Route,Redirect} from "react-router-dom"
import auth from './Auth'

 const  ProtectedRoute =({component:Component, ...rest}) =>{
    return (
        <Route  {...rest} render={
            (props)=>{
                auth.isAuthenticated();
                if(window.localStorage.getItem("tuabalsilennufh")==='maomhdni')
                    return <Component {...props}/>
                else{
                    return <Redirect to={{
                        pathname:"/",
                        state:{
                            from:props.location
                        }

                    }} />
                }
            }
        }/>
    )
}


export default React.memo(ProtectedRoute)