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



const _check  = (array,value)=>{
  let valid = false;
  array.map(obj =>{
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
          render={({ location }) =>
            typeof sections ==='object'?
            _check(sections,name)? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/home",
                  state: { from: location }
                }}
              />
            )
            :
            sections==='all'? (
              children
            ):
            (
              <Redirect
                to={{
                  pathname: "/home",
                  state: { from: location }
                }}
              />
            )
          }
        />
      );
}

export default LockRoute
