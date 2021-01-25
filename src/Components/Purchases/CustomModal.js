import React from 'react'
import Modal from '@material-ui/core/Modal';
import { Grid, Paper, TextField,Button } from '@material-ui/core';
import { Language, Rowing } from '@material-ui/icons';
import {motion} from 'framer-motion'
import axios from 'axios'
import {uri} from "../../Url_base";
import useToken from '../../Hooks/useToken';
import Swal from 'sweetalert2'
import CustomSnackbar from '../CustomSnackBar';
import InfoIcon from '@material-ui/icons/Info';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import StatusBadge from '../StatusBadge';
import VariantsTable from './VariantsTable';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  }));
const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`);




// const reducer = (state,action)=>{
//     switch (action.type) {
//         case 'tracking':
//             return {...state,tracking_id:action.value}
//             case 'price':
//                 return {...state,order_price:action.value}
        
//         default:
//             return state
//     }
// }
function CustomModal({open,handleClose,purchase}) {
    const classes = useStyles();

    // const [status, setStatus] = React.useState('');
    // console.log('aaaaaaaaaaaaaaaaaaaaaaa',order)
    // const [setToken,getToken] = useToken();
    // const initOrderInfo = {
    //     tracking_id:order.tracking_number?order.tracking_number:'',
    //     order_price:order.shipping_cost?order.shipping_cost:0
    // };
    // const [orderInfo, dispatch] = React.useReducer(reducer, initOrderInfo)

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


    // const _updateOrder = ()=>{
    // axios.patch(`${uri.link}/orders/`, 
	//     { 
    //         id:order._id,
	// 	    tracking: orderInfo.tracking_id, 
	// 	    cost: orderInfo.order_price
	//     }, 
	// {
    //     headers:{'auth-token':`${getToken()}`}

    // }).then(res=>{
    //     if(res.status===200){
    //         fetch(true);
    //         setStatus(200)
    //     }
    //             // return  <CustomSnackbar  content='Order updated!!' type="success"/>
    //         else
    //         setStatus('error')
    //             // return <CustomSnackbar  content='Ops, order update failed!' type="error"/>

    // })
    // .catch(function (error) {
    //     // handle error
    //     handleClose()
    //     console.log(error);
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         text: 'Something went wrong!',
    //       })
          
          
    // });
    // }


    const variant = [

        {option1:'red',option2:'s',option3:'coton'},
        {option1:'green',option2:'xs',option3:'coton'},
        {option1:'black',option2:'xl',option3:'coton'}
    ]

    const options  = [
        {name:'color'},
        {name:'size'},
        {name:'type'}


    ]
    return (
        <Modal
            open={open}
            onClose={handleClose}
            style={{display:'flex',justifyContent:'center',alignItems:'center',overflowY:'auto'}}

        >
            
            
            <Grid item md={10} >
                <Paper elevation={3} style={{display:'flex', padding:'20px',overflowY:'auto',height:'650px',background:'rgb(243,245,247)',flexDirection:'column'}}>
                    <h1 style={{color:'#303030',opacity:'90%'}}>{`${lang.purchase} #${purchase._id}`}</h1>
                   
                    <Grid item md={12}>
                        <span style={{padding:'10px',background:'white',borderRadius:'10px',marginBottom:'35px',fontWeight:'bold'}}>{new Date(purchase.date).toDateString()}</span>
                        <section style={{display:'flex',padding:'15px',background:'white',borderRadius:'15px',marginTop:'20px'}}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} variant='square' />
                        <section style={{display:"flex",flexDirection:'column',padding:'10px'}}>
                            <StatusBadge status={purchase.status} align='center' marginBottom='10px' />
                            <span><b>Product name</b> : aaa </span>
                            <span><b>Quantity</b> : aaa </span>
                            <span><b>Sku</b> : aaa </span>
                        </section>
                        </section>
                        
                        <h4 style={{color:'#303030',opacity:'90%',marginLeft:'15px'}}>{lang.item_variants}</h4>

                        <section style={{display:'flex',padding:'15px',background:'white',borderRadius:'15px',marginTop:'20px',justifyContent:'center'}}>
                            {/* <VariantsTable variants={purchase.variants} options={purchase.options} /> */}
                            <VariantsTable variants={variant} options={options} />

                        </section>
                    </Grid>
                </Paper>
            </Grid>
      </Modal>
    )
}

export default CustomModal
