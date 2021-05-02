import React from 'react';
import { Router, Route, Switch, Redirect,BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import SignIn from './Pages/Login/SignIn';
import ProtectedRoute from './ProtectedRoute';
import Password_reset from './Pages/Home/Password_reset'
import Home from './Pages/Home/Home';
import { AnimatePresence } from 'framer-motion';

const history = createBrowserHistory();

// coonected user context
export const ConnectedUser = React.createContext();

// notification context
export const Notifications = React.createContext();

function App() {

  const [user, setuser] = React.useState({});
  const [notifications, setNotifications] = React.useState([]);


 
  
  return (

    <BrowserRouter>
    <ConnectedUser.Provider value={[user,setuser]} >
    <Notifications.Provider value={[notifications,setNotifications]}>
    <Router  history={history}>


       <Switch >
        <Route component={SignIn} exact path='/'/> 
        <Route component={Password_reset}  path='/password_reset/:id'/>

        {/* <Route component={Home}  path='/home'/> */}
        <ProtectedRoute  component={Home}  path='/home' />

         {/* <ProtectedRoute  component={Dashboard}  path='/home' /> */}
      </Switch>
    </Router>
    </Notifications.Provider>
    </ConnectedUser.Provider>

    </BrowserRouter>
  );
}

export default App;
