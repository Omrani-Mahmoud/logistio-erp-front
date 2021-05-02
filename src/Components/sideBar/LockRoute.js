// this compoennt handle if the user got an access or not to the route

import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";



const _check  = async (array,value)=>{
  let valid = false;
  array && array.map(obj =>{
    console.log('OBJ',obj)
      if(obj.name===value){
        valid = true
      }

  })
  return valid
}
function LockRoute({children,name,sections,...rest}) {
    return (
        <Route
          {...rest}
          render={ ({ location }) =>
            typeof sections ==='object'  &&
              _check(sections,name)? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: _check(sections,name)?location.pathname:'/home',
                  state: { from: location }
                }}
              />
            )
            // :
            // sections==='all'? (
            //   children
            // ):
            // (
            //   <Redirect
            //     to={{
            //       pathname: location.pathname,
            //       state: { from: location }
            //     }}
            //   />
            // )
          }
        />
      );
}

export default LockRoute
