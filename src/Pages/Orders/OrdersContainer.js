import React from 'react'
import Orders from './Orders'
import {motion} from 'framer-motion'
import useToken from '../../Hooks/useToken';
import axios from 'axios'
import {uri} from "../../Url_base";
function OrdersContainer() {
    const [orders, setOrders] = React.useState([])
    const [setToken,getToken] = useToken();

    const contentVariant = {
        hidden:{
            scale:0,
        },
        visible:{
            scale:1,
            transition:{
                type:'tween',
                duration:0.4,  
            }
        },   
    }

    

    const _fetch = (mounted)=>{
        axios.get(`${uri.link}/orders/`,{
            headers:{'auth-token':`${getToken()}`}
        })
           .then(function (response) {
               if(mounted){
                    console.log('ORDERS DATA',response.data)
                    setOrders(response.data)
               }
           })
           .catch(function (error) {
               // handle error
               console.log(error);
           });
    }



    React.useEffect(() => {
        console.log('HERE FETCH ORDERS')
        let mounted = true;
            _fetch(mounted)
       return ()=>{
           mounted=false
       }
    }, [])
    
    return (
        <motion.div variants={contentVariant} initial='hidden' animate='visible'>
             <Orders orders={orders} fetch={_fetch}/>
        </motion.div>
    )
}

export default OrdersContainer
