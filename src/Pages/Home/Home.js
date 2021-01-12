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
import axios from 'axios'
import {uri} from "../../Url_base";

function Home() {
    const user_context = React.useContext(ConnectedUser)
    const [sections, setsections] = React.useState([])


    console.log('USER',user_context[0])
    React.useEffect(() => {
        if(Object.keys(user_context[0]).length ===0){
            const token = window.localStorage.getItem('erpT');
            //user_context[1]({userName:'mahmpud',roles:['products','stock']});
            user_context[1]({userName:jwt.decode(token).username,role:jwt.decode(token).role});
            //setsections(jwt.decode(token).role.sections)

        }
        
      }, [])

      React.useEffect(() => {
          
       setsections(user_context[0]?.role?.sections)
        
      }, [user_context[0]])

    // React.useEffect(() => {
    //     let mounted = true;
    //     if(sections.length<0){
            
    //     axios.get(`${uri.link}/sections/`,
        
    //     {

    //     },
        
    //     {

    //         headers:{'Authorization':`Bearer ${getToken()}`}
    //     })
    //        .then(function (response) {
    //            if(mounted){
    //                 console.log(response);
                   
    //            }
    //        })
    //        .catch(function (error) {
    //            // handle error
    //            console.log(error);
    //        });
    //     }
    //        return ()=>{
    //         mounted=false
    //     }
    // }, [])

    return (

                
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                style={{flexWrap:'nowrap'}}
                
                >
                <Grid item  style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',minHeight:'100vh',padding:'10px'}}>
                    <SideMenu sections={sections} />
                </Grid>
               
                <Grid  md={10} style={{padding:'16px 10px 10px 10px'}}>
                <CustomAppBar user={user_context[0]} />
                    <div style={{display:'flex',flexDirection:'column',backgroundColor:'white',height:'86vh'}}>
                  
                    <Switch>
                            <Route exact path='/home' component={Test}/>
                            {/* <Route  path='/home/orders'   render={(props) => (
                                        <OrdersContainer {...props} isMobile={isMobile} />
                                        )} /> */}
                            
                            <LockRoute sections={sections} name='user' path='/home/users'>
                                        <UsersContainer />
                            </LockRoute>

                            <LockRoute sections={sections} name='product' path='/home/products'>
                                        <ProductsContainer />
                            </LockRoute>
                            
                                
                    </Switch>
                 
                    </div>
                    
                </Grid>
            </Grid>
   

    )
}

export default Home
