import React from 'react'
import Modal from '@material-ui/core/Modal';
import { Grid, Paper, TextField,Button,Avatar } from '@material-ui/core';
import { Language, Rowing } from '@material-ui/icons';
import AddressTable from './AddressTable';
import OrderItem from './OrderItem';
import {motion} from 'framer-motion'
import axios from 'axios'
import {uri} from "../../Url_base";
import useToken from '../../Hooks/useToken';
import Swal from 'sweetalert2'
import CustomSnackbar from '../CustomSnackBar';
import InfoIcon from '@material-ui/icons/Info';
import imgP from '../../Assets/img/productPlaceHolder.png';
import { makeStyles } from '@material-ui/core/styles';

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`);


const useStyles = makeStyles((theme)=>({

    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        marginRight:'20px'
  
      },
      small: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginRight:'20px',
        marginTop:'8px'
      },
      hover: {
        width: theme.spacing(28),
        height: theme.spacing(28),
        marginRight:'20px',
        marginTop:'8px'
      },
  }));


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
function CustomModal({open,handleClose,order,fetch,reship}) {
    const classes = useStyles();

    const [status, setStatus] = React.useState('');
    const [setToken,getToken] = useToken();
    const initOrderInfo = {
        tracking_id:order.tracking_number?order.tracking_number:'',
        order_price:order.shipping_cost?order.shipping_cost:0
    };
    const [orderInfo, dispatch] = React.useReducer(reducer, initOrderInfo)
    const [displayImg, setDisplayImg] = React.useState({
        isHovred:false,
        link:''
      });
    const spanColorbg = {
        background:'white',
        height:'30px',
        borderRadius:'8px',
        width:'100%',
        display:'flex',
        alignItems:'center',
        padding:'5px'
    }

    const spanColorType = {
        background:'white',
        height:'30px',
        borderRadius:'8px',
        width:'100%',
        display:'flex',
        alignItems:'center',
        padding:'5px',
        marginBottom:'10px',
        marginTop:'10px'

    }


  const handleImageDisplay = (link)=>{
    setDisplayImg({
      isHovred:true,
      link:link
    })
}

const removeImageDisplay = (link)=>{
  setDisplayImg({
    isHovred:false,
    link:''
  })
}

    const _updateOrder = ()=>{
    axios.patch(`${uri.link}/orders/`, 
	    { 
            id:order._id,
		    tracking: orderInfo.tracking_id, 
		    cost: orderInfo.order_price
	    }, 
	{
        headers:{'auth-token':`${getToken()}`}

    }).then(res=>{
        if(res.status===200){
            fetch(true);
            setStatus(200)
        }
                // return  <CustomSnackbar  content='Order updated!!' type="success"/>
            else
            setStatus('error')
                // return <CustomSnackbar  content='Ops, order update failed!' type="error"/>

    })
    .catch(function (error) {
        // handle error
        handleClose()
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
          
          
    });
    }

    const isItemDS = ()=>{
        let isValid = false
        order.order_items.map(item=>{
            if(item.product.type_shopping==='ds')
                isValid = true;
            else
                isValid = false;
        })
        return isValid
    }


    const create_purchase = ()=>{
        console.log('create purchase ehre')
    }

    // const get_client_store = ()=>{
    //    let storeId =  order.order_items[0].store_id;
    //    let store = order.client.accounts.filter(elem => elem.id===storeId);
    //    return `${store.name} ${store.url?`(${store.url})`:''}`

    // }

    console.log("ORDER --------->",order);

    const img_display = {
        display:{
          opacity:1,
        },
        hidden:{
          opacity:0,
      },
        transition:{
          duration:0.3,
        }
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            style={{display:'flex',justifyContent:'center',alignItems:'center',overflowY:'auto'}}

        >
            
            {/* <h1>{reship}</h1> */}
            <Grid item md={10} >
                <Paper elevation={3} style={{display:'flex', padding:'20px',overflowY:'auto',height:'650px',background:'rgb(243,245,247)',flexDirection:'column'}}>
                    <h1 style={{color:'#303030',opacity:'90%'}}>{lang.order} {`#${order.order_id}`}</h1>
                    {
                status===200?
                <CustomSnackbar  content='Order updated!!' type="success"/>
                :
                status==='error'?
                <CustomSnackbar  content='Ops, order update failed!' type="error"/>
                : null
            }




            
           {
               reship &&
                <div style={{display:"flex",flexDirection:'row',width:'100%'}}>
                    {
                    order.reship_media.map(img=>{
                      return <Avatar  style={{cursor:'pointer',marginRight:'8px'}}onMouseEnter={()=>handleImageDisplay(img)} onMouseLeave={()=>removeImageDisplay()} alt='broken' src={img.link}  variant="square" className={classes.small} />
                    })
                    }
                </div>
           } 
            {
                  displayImg.isHovred  && 
                <motion.div variants={img_display} initial='hidden' animate='display' style={{alignSelf:'center',marginTop:'150px',position:'absolute',zIndex:'999999999',justifyContent:'center'}}>
                  <Avatar  alt='reship item' src={displayImg.link}  variant="square" className={classes.hover} />
                </motion.div>
                }





                    <Grid item md={12} style={{display:'flex',justifyContent:"space-around",maxHeight:'50px',marginTop:'7px',marginBottom:'7px'}}>
                        <Grid item md={4}><span style={spanColorbg}><b>{lang.fullfillment_mode} </b> : {order.fulfillment_mode}</span></Grid>
                        <Grid item md={4}><span style={spanColorbg}><b>{lang.fullfillment_status}</b> : {order.status}</span></Grid>
                    </Grid>

                    <Grid item md={4} >
                        <span style={spanColorType}><InfoIcon style={{marginRight:'10px',color:'rgb(146,203,247)'}}/><b>{lang.shipping_type} </b> : {order.shipping_type}</span>

                    </Grid>
                    {
                        order.status!=='fulfilled' && isItemDS() && 
                        <Button variant="contained" style={{textTransform:'capitalize',fontWeight:'bold', marginBottom:'10px'}} color='default' onClick={create_purchase}>Create purchase</Button>
                    }

                    <Grid item md={12} style={{display:order.fulfillment_mode==='fulfill_all'?'flex':'none',background:'white',borderRadius:'8px',flexDirection:'column',padding:'10px',maxHeight:'400px',marginBottom:'10px'}}>
                            <span style={{color:'#303030',opacity:'60%',fontWeight:'bold',fontSize:'18px',marginBottom:'10px'}}>{lang.order_info}</span>
                            <span style={{marginLeft:'7px',marginBottom:'7px',alignItems:'center', display:'flex'}}><b>{lang.track_number}</b> :   <TextField defaultValue={order.tracking_number}  size='small'  onChange={(e)=>dispatch({type:'tracking',value:e.target.value})} />
 </span>
                            {
                                !reship && 
                                    <span style={{marginLeft:'7px',marginBottom:'7px',alignItems:'center', display:'flex'}}><b>{lang.shipping_price}</b> :   <TextField  defaultValue={order.shipping_cost}  size='small' onChange={(e)=>dispatch({type:'price',value:e.target.value})} />
 </span>
} 
                        
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
                    <Grid item md={12} style={{display:'flex',background:'white',borderRadius:'8px',flexDirection:'column',padding:'10px',maxHeight:'400px',marginBottom:'10px'}}>
                            <span style={{color:'#303030',opacity:'60%',fontWeight:'bold',fontSize:'18px',marginBottom:'10px'}}>{lang.logitio_client}</span>
                            <span style={{marginLeft:'7px',marginBottom:'7px'}}><b>{lang.logistio_client_store}</b> : maaa </span>
                            <span style={{marginLeft:'7px',marginBottom:'7px'}}><b>{lang.logistio_client_username}</b> : {order.client.username} </span>
                            <span style={{marginLeft:'7px',marginBottom:'7px'}}><b>{lang.logistio_client_fullname}</b> : {`${order.client.first_name} ${order.client.last_name}` } </span>
                            <span style={{marginLeft:'7px',marginBottom:'7px'}}><b>{lang.logistio_client_email}</b> : {order.client.email} </span>


                    </Grid>
                    <Grid item md={12} style={{display:'flex',background:'white',borderRadius:'8px',flexDirection:'column',padding:'10px',maxHeight:'400px'}}>
                            <span style={{color:'#303030',opacity:'60%',fontWeight:'bold',fontSize:'18px',marginBottom:'10px'}}>{lang.cli_info}</span>
                            <span style={{marginLeft:'7px',marginBottom:'7px'}}><b>{lang.cli_email}</b> : {order.shipping_infos[0].email} </span>
                            <span style={{marginLeft:'7px',marginBottom:'7px'}}><b>{lang.cli_fn}</b> : {order.shipping_infos[0].first_name} </span>
                            <span style={{marginLeft:'7px',marginBottom:'7px'}}><b>{lang.cli_ln}</b> : {order.shipping_infos[0].last_name} </span>

                            <span style={{color:'#303030',opacity:'60%',fontWeight:'bold',fontSize:'15px',marginBottom:'10px',marginTop:'15px'}}>{lang.shippingInfo}</span>

                                <AddressTable adrs={order.shipping_infos} />

                    </Grid>
                            <span style={{color:'#303030',opacity:'60%',fontWeight:'bold',fontSize:'18px',marginBottom:'10px',marginTop:'10px'}}>{lang.order_items}</span>
                            {
                                order.order_items.map(row=>{
                                        return   <OrderItem product={row} disabled={order.fulfillment_mode==='fulfill_all'?true:false} order_id={order._id} fetch={fetch} />

                                })
                            }

                </Paper>
            </Grid>
      </Modal>
    )
}

export default CustomModal
