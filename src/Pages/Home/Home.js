import { Divider, Grid } from '@material-ui/core'
import React from 'react'
import CustomAppBar from '../../Components/CustomAppBar'
import SideMenu from '../../Components/sideBar/SideMenu'
import {ConnectedUser}  from '../../App'
import jwt from 'jsonwebtoken';
import UsersContainer from '../Users/UsersContainer'
import { Switch, Route, Link,useLocation } from 'react-router-dom';
import Test from './Password_reset'
import LockRoute from '../../Components/sideBar/LockRoute'
import ProductsContainer from '../Products/ProductsContainer'
import axios from 'axios'
import {uri} from "../../Url_base";
import StockContainer from '../Stock/StockContainer'
import { motion,AnimatePresence } from "framer-motion"
import OrdersContainer from '../Orders/OrdersContainer'
import auth from '../../Auth';

import PurchasesContainer from '../Purchases/PurchasesContainer'
import Overview from './Overview'
import Profile from '../Settings/Profile'

function Home() {

    const location = useLocation();

    const sideMenuVariant = {
        hidden:{
            opacity:0,
            x:'-100vw'
        },
        visible:{
            opacity:1,
            x:0,
            transition:{
                type:'tween',
                // stiffness:40,
                duration:1
            }
        }
    }

    const topBarVariant = {
        hidden:{
            opacity:0,
            x:'100vw'
        },
        visible:{
            opacity:1,
            x:0,
            transition:{
                type:'tween',
                duration:1
                
            }
        }
    }
    const contentVariant = {
        hidden:{
            opacity:0,
        },
        visible:{
            opacity:1,
            transition:{
                type:'tween',
                duration:0.4,
                delay:1
                
            }
        }
    }


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


      
      React.useEffect(() => {
          const sr  = auth.check_auth();
        const check___ = setInterval(() => {
            auth.check_auth()
          }, 5000);
    
        return () => clearInterval(check___);
      }, []);
      
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
                style={{flexWrap:'nowrap',overflowX:'hidden',background:'white'}}
            
                >
                <motion.Grid variants={sideMenuVariant} initial='hidden' animate='visible' item  style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',maxHeight:'100vh',padding:'10px'}}>
                    <SideMenu sections={sections} />
                </motion.Grid>
                {/* <Grid item  style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',minHeight:'100vh',padding:'10px'}}>
                    <SideMenu sections={sections} />
                </Grid> */}
               
                <Grid variants={sideMenuVariant} initial='hidden' animate='visible' item md={10} style={{padding:'16px 10px 10px 10px'}}>
                    <motion.div  variants={topBarVariant} initial='hidden' animate='visible'>
                        <CustomAppBar user={user_context[0]} />
                    </motion.div>
                   
                    <motion.div variants={contentVariant} initial='hidden' animate='visible' style={{display:'flex',flexDirection:'column',backgroundColor:'white',height:'86vh'}}>
                 
                        <Switch>
                                <Route exact path='/home' component={Overview}/>
                                {/* <Route  path='/home/orders'   render={(props) => (
                                            <OrdersContainer {...props} isMobile={isMobile} />
                                            )} /> */}
                                <Route path='/home/profile' component={Profile}/>
                                
                                <LockRoute sections={sections} name='user' path='/home/users'>
                                            <UsersContainer />
                                </LockRoute>

                                <LockRoute sections={sections} name='product' path='/home/products'>
                                            <ProductsContainer />
                                </LockRoute>
                                <LockRoute sections={sections} name='stock' path='/home/stock'>
                                            <StockContainer />
                                </LockRoute>

                                <LockRoute sections={sections} name='orders' path='/home/orders'>
                                            <OrdersContainer />
                                </LockRoute>

                                <LockRoute sections={sections} name='purchases' path='/home/purchases'>
                                            <PurchasesContainer />
                                </LockRoute>
                                    
                        </Switch>
       

                 
                    </motion.div>
                
                </Grid>
            </Grid>
   

    )
}

export default Home
