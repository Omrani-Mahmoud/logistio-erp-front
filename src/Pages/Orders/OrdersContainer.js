//orders container
// appi calls is here
// all the orders are here
// Orders component accept orders arrray as props

import React from 'react'
import Orders from './Orders'
import {motion} from 'framer-motion'
import useToken from '../../Hooks/useToken';
import axios from 'axios'
import {uri} from "../../Url_base";
import Loader from '../../Components/Loader';
function OrdersContainer() {
    const [orders, setOrders] = React.useState([])
    const [setToken,getToken] = useToken();
    const [loading, setLoading] = React.useState(false);
    const [modalIsOpen, setmodalIsOpen] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };
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
        setLoading(true);
        console.log('REFETCH HERE ------>')
        axios.get(`${uri.link}/orders/filter_by/updated_at-desc`,{
            headers:{'auth-token':`${getToken()}`}
        })
           .then(function (response) {
               setLoading(false)
               if(mounted){
                    console.log('ORDERS DATA',response.data)
                    setOrders(response.data)
               }
           })
           .catch(function (error) {
               // handle error
               setLoading(false)
               console.log(error);
           });
    }

    const _fetchBG = (mounted)=>{
        axios.get(`${uri.link}/orders/filter_by/updated_at-desc`,{
            headers:{'auth-token':`${getToken()}`}
        })
           .then(function (response) {
               if(!mounted){
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

    React.useEffect(() => {
        //const sr  = auth.check_auth();
      const check___ = setInterval(() => {
          console.log('here reftech ya mah',modalIsOpen)
          _fetchBG(modalIsOpen)
        }, 60000);
        return () => clearInterval(check___);
    }, [modalIsOpen]);


    console.log(' TEST RATATATA ====>',modalIsOpen)
    return (
        <motion.div variants={contentVariant} initial='hidden' animate='visible'>
                <Orders setmodalIsOpen={setmodalIsOpen} orders={orders} fetch={_fetch} loading={loading} handleDateChange={handleDateChange} selectedDate={selectedDate}/>
        </motion.div>
    )
}

export default OrdersContainer
