import React from 'react'
import Modal from '@material-ui/core/Modal';
import { Grid, Paper, TextField,Button } from '@material-ui/core';
import { Language, Rowing } from '@material-ui/icons';
import AddressTable from './AddressTable';
import OrderItem from './OrderItem';
import {motion} from 'framer-motion'
import axios from 'axios'
import {uri} from "../../Url_base";
import useToken from '../../Hooks/useToken';
import Swal from 'sweetalert2'
const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`);




const reducer = (state,action)=>{
    switch (action.type) {
        case 'tracking':
            return {...state,tracking_id:action.value}
            case 'price':
                return {...state,order_price:action.value}
        
        default:
            return state
    }
}
function CustomModal({open,handleClose,order}) {

    console.log('aaaaaaaaaaaaaaaaaaaaaaa',order)
    const [setToken,getToken] = useToken();
    const initOrderInfo = {
        tracking_id:order.tracking_number?order.tracking_number:'',
        order_price:order.shipping_cost?order.shipping_cost:0
    };
    const [orderInfo, dispatch] = React.useReducer(reducer, initOrderInfo)
    const spanColorbg = {
        background:'white',
        height:'30px',
        borderRadius:'8px',
        width:'100%',
        display:'flex',
        alignItems:'center',
        padding:'5px'

    }


    const _updateOrder = ()=>{
        console.log('ORDER INFO',orderInfo)
    axios.patch(`${uri.link}/orders/`, 
	    { 
            id:order._id,
		    tracking: orderInfo.tracking_id, 
		    cost: orderInfo.order_price
	    }, 
	{
        headers:{'auth-token':`${getToken()}`}

    }).then(res=>{
                res.status===200?
                Swal.fire({
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: true,
                  })
                  :
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
          
    });
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            style={{display:'flex',justifyContent:'center',alignItems:'center',overflowY:'auto'}}

        >
            
            <Grid item md={10} >
                <Paper elevation={3} style={{display:'flex', padding:'20px',overflowY:'auto',height:'650px',background:'rgb(243,245,247)',flexDirection:'column'}}>
                    <h1 style={{color:'#303030',opacity:'90%'}}>{lang.order}</h1>
                    <Grid item md={12} style={{display:'flex',justifyContent:"space-around",maxHeight:'50px',marginTop:'7px',marginBottom:'7px'}}>
                        <Grid item md={4}><span style={spanColorbg}><b>{lang.fullfillment_mode} </b> : {order.fulfillment_mode}</span></Grid>
                        <Grid item md={4}><span style={spanColorbg}><b>{lang.fullfillment_status}</b> : {order.status}</span></Grid>

                    </Grid>

                    <Grid item md={12} style={{display:order.fulfillment_mode==='fulfill_all'?'flex':'none',background:'white',borderRadius:'8px',flexDirection:'column',padding:'10px',maxHeight:'400px',marginBottom:'10px'}}>
                            <span style={{color:'#303030',opacity:'60%',fontWeight:'bold',fontSize:'18px',marginBottom:'10px'}}>{lang.order_info}</span>
                            <span style={{marginLeft:'7px',marginBottom:'7px',alignItems:'center', display:'flex'}}><b>{lang.track_number}</b> :   <TextField defaultValue={order.tracking_number}  size='small'  onChange={(e)=>dispatch({type:'tracking',value:e.target.value})} />
 </span>
                            <span style={{marginLeft:'7px',marginBottom:'7px',alignItems:'center', display:'flex'}}><b>{lang.shipping_price}</b> :   <TextField defaultValue={order.shipping_cost}  size='small' onChange={(e)=>dispatch({type:'price',value:e.target.value})} />
 </span>
                        
 <motion.Button
                    
                    whileHover={{scale:1.1 }}
                            variant="contained"
                            
                            style={{marginTop:'15px'}}
                            onClick={_updateOrder}
                            style={{width:'300px',alignSelf:'center',background:'rgb(65,84,179)',border:'0px',borderRadius:'5px',height:'30px',marginTop:'15px',color:'white',cursor:'pointer',fontWeight:'bold'}}
                        >
                            {lang.save_it}
                    </motion.Button>

                    </Grid>
                    <Grid item md={12} style={{display:'flex',background:'white',borderRadius:'8px',flexDirection:'column',padding:'10px',maxHeight:'400px'}}>
                            <span style={{color:'#303030',opacity:'60%',fontWeight:'bold',fontSize:'18px',marginBottom:'10px'}}>{lang.cli_info}</span>
                            <span style={{marginLeft:'7px',marginBottom:'7px'}}><b>{lang.cli_email}</b> : {order.client.email} </span>
                            <span style={{marginLeft:'7px',marginBottom:'7px'}}><b>{lang.cli_fn}</b> : {order.client.first_name} </span>
                            <span style={{marginLeft:'7px',marginBottom:'7px'}}><b>{lang.cli_ln}</b> : {order.client.last_name} </span>

                            <span style={{color:'#303030',opacity:'60%',fontWeight:'bold',fontSize:'15px',marginBottom:'10px',marginTop:'15px'}}>{lang.shippingInfo}</span>

                                <AddressTable adrs={order.shipping_adress} />

                    </Grid>
                            <span style={{color:'#303030',opacity:'60%',fontWeight:'bold',fontSize:'18px',marginBottom:'10px',marginTop:'10px'}}>{lang.order_items}</span>
                            {
                                order.order_items.map(row=>{
                                        return   <OrderItem product={row} disabled={order.fulfillment_mode==='fulfill_all'?true:false} order_id={order._id} />

                                })
                            }

                </Paper>
            </Grid>
      </Modal>
    )
}

export default CustomModal
