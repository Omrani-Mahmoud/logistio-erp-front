import { Divider, Grid } from '@material-ui/core'
import React from 'react'
import CustomAppBar from '../../Components/CustomAppBar'
import SideMenu from '../../Components/sideBar/SideMenu'
import {ConnectedUser}  from '../../App'
import jwt from 'jsonwebtoken';
import UsersContainer from '../Users/UsersContainer'
import { Switch, Route, Link } from 'react-router-dom';
import Test from './Test'
import LockRoute from '../../Components/sideBar/LockRoute'
import ProductsContainer from '../Products/ProductsContainer'
function Home() {
    const user_context = React.useContext(ConnectedUser)
    const [sections, setsections] = React.useState('all')


    console.log('USER',user_context[0])
    React.useEffect(() => {
        if(Object.keys(user_context[0]).length ===0){
            const token = window.localStorage.getItem('erpT');
            //user_context[1]({userName:'mahmpud',roles:['products','stock']});
            user_context[1]({userName:jwt.decode(token)?.username});
            
        }
        
      }, [])

    return (
        <Grid lg={12} >
                
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                >
         <Grid item lg={2}>
                <SideMenu sections={sections} />
                </Grid>
               
                <Grid item lg={10}>
                <CustomAppBar user={user_context[0]} />
                    <div style={{display:'flex',flexDirection:'column',backgroundColor:'rgb(243,245,247)',minHeight:'90vh'}}>
                  
                    <Switch>
                            <Route exact path='/home' component={Test}/>
                            {/* <Route  path='/home/orders'   render={(props) => (
                                        <OrdersContainer {...props} isMobile={isMobile} />
                                        )} /> */}
                            
                            <LockRoute sections={sections} name='users_management' path='/home/users'>
                                        <UsersContainer />
                            </LockRoute>

                            <LockRoute sections={sections} name='products' path='/home/products'>
                                        <ProductsContainer />
                            </LockRoute>
                            
                                
                    </Switch>
                 
                    </div>
                    
                </Grid>
            </Grid>
        </Grid>

    )
}

export default Home
