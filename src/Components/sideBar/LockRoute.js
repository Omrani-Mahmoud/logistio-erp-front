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
function LockRoute({children,name,sections,...rest}) {

    return (
        <Route
          {...rest}
          render={({ location }) =>
            typeof sections ==='object'?
            sections.includes(name)? (
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
