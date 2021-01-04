import React from 'react';
import { Router, Route, Switch, Redirect,BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import SignIn from './Pages/Login/SignIn';
import {ProtectedRoute} from './ProtectedRoute';
import Test from './Pages/Home/Test'
const history = createBrowserHistory();
export const ConnectedUser = React.createContext();

function App() {
  const [user, setuser] = React.useState({});

  return (

    <BrowserRouter>
    <ConnectedUser.Provider value={[user,setuser]} >

    <Router  history={history}>
       <Switch>
        <Route component={SignIn} exact path='/'/> 
        <Route component={Test}  path='/test'/> 
         {/* <ProtectedRoute  component={Dashboard}  path='/home' /> */}
      </Switch>
    </Router>
    </ConnectedUser.Provider>

    </BrowserRouter>
  );
}

export default App;
