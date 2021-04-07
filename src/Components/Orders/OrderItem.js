import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import LinkIcon from '@material-ui/icons/Link';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ArchiveIcon from '@material-ui/icons/Archive';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import PaymentIcon from '@material-ui/icons/Payment'; 
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Variants from './Variants'
import { TextField } from '@material-ui/core';
import {motion} from 'framer-motion'
import axios from 'axios'
import Swal from 'sweetalert2'
import useToken from '../../Hooks/useToken';
import {uri} from '../../Url_base'
import CustomSnackbar from '../CustomSnackBar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`)



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
function OrderItem({product,disabled,order_id,fetch,dispatcher}) {
    const initItemInfo = {
        tracking_id:product.tracking_number?product.tracking_number:'',
        order_price:product.shipping_cost?product.shipping_cost:0
    };
    const [setToken,getToken] = useToken();
    const [status, setStatus] = React.useState('')
    const [itemInfo, dispatch] = React.useReducer(reducer, initItemInfo)

    const _updateItem = ()=>{
        axios.patch(`${uri.link}/orders/`, 
            { 
                id:order_id,
                item:{
                    id:product._id,
                    tracking: itemInfo.tracking_id, 
                    cost: itemInfo.order_price
                }
                            }, 
        {
            headers:{'auth-token':`${getToken()}`}
    
        }).then(res=>{
                    res.status===200?
                    setStatus(200)
                    // <CustomSnackbar  content='Order updated!' type="success"/>
                    :
                    setStatus('error')
                    fetch(true)
                    // <CustomSnackbar  content='Ops, order update failed!' type="error"/>

        })
        .catch(function (error) {
            // handle error
            console.log(error);
            setStatus('error')
            // <CustomSnackbar  content='Ops, Server Error!' type="error"/>

              
        });
        }

        const handlerShipItems = (e)=>{
                if(e.target.checked){
                    dispatcher({type:'push',value:product.product._id})
                }
                else{
                    dispatcher({type:'remove',value:product.product._id})

                }
        }


        console.log('hahahahahahhahhhahahahaha',product.product)
    return (

        <Accordion >
            {
                status===200?
                     <CustomSnackbar  content='Order updated!' type="success"/>
                :
                status==='error'?
                     <CustomSnackbar  content='Ops, order update failed!' type="error"/>
                :
                null
            }
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <section style={{width:'100%'}}>
                <Avatar alt="gun" src={product?.product?.media[0]?.link}  variant='square'/>
                <Typography>{product.product.name}</Typography>
            </section>
            <div style={{marginLeft:'25px',width:'100%',display:'flex',alignItems:'flex-start',justifyContent:'space-between'}}>
                <section>
                    <span style={{color:'#303030',opacity:'65%'}}>SKU : </span><span style={{color:'#303030',opacity:'85%',fontWeight:'bold'}}>{product.product.sku}</span>
                </section>
            </div>

        </AccordionSummary>
        <AccordionDetails style={{display:'flex',flexDirection:'column'}}>

        <Grid item md={12} style={{display:disabled?'none':'flex',background:'white',borderRadius:'8px',flexDirection:'column',padding:'10px',maxHeight:'400px',marginBottom:'10px'}}>
                            <span style={{color:'#303030',opacity:'60%',fontWeight:'bold',fontSize:'18px',marginBottom:'10px'}}>Item information</span>
                            {/* <span style={{marginLeft:'7px',marginBottom:'7px',alignItems:'center', display:'flex'}}><b>Tracking number</b> :   <TextField  size='small' defaultValue={product.tracking_number} onChange={(e)=>{dispatch({type:'tracking',value:e.target.value})}}   />
 </span>
                            <span style={{marginLeft:'7px',marginBottom:'7px',alignItems:'center', display:'flex'}}><b>Shipping Price</b> :   <TextField  size='small' defaultValue={product.shipping_cost} onChange={(e)=>{dispatch({type:'price',value:e.target.value})}}/>
 </span> */}
  <FormControlLabel
        control={<Checkbox onChange={(e)=>handlerShipItems(e)} color='default' />}
        label="To ship"
      />
{/*                         
 <motion.Button
                    
                    whileHover={{scale:1.1 }}
                            variant="contained"
                            
                            style={{marginTop:'15px'}}
                            onClick={_updateItem}
                            style={{width:'300px',alignSelf:'center',background:'rgb(65,84,179)',border:'0px',borderRadius:'5px',height:'30px',marginTop:'15px',color:'white',cursor:'pointer',fontWeight:'bold'}}
                        >
                            {lang.save}
                    </motion.Button> */}

                    </Grid>
            <section >
                <span style={{color:'#303030',opacity:'65%',marginRight:'5px',fontWeight:'bold',fontSize:'14px',marginBottom:'10px'}}>{lang.quantity} :                {product.quantity}
</span>
              
                {/* style={{backgroundColor:'#f0f0f2',width:'200px',display:'flex',flexDirection:'column',height:'160px',padding:'10px',marginTop:'10px',justifyContent:'space-around'}} */}
                {/* <Paper elevation={0}  style={{background:'red',width:'100%'}}  > */}
                        {/* here */}
                        <Grid item md={10} style={{width:'100%'}}>
                            <Variants options={product.product.options} variants={product.product_variants} />
                        </Grid>
                {/* </Paper> */}
            </section>
           
        </AccordionDetails>

     
      </Accordion>
    )
}

export default OrderItem
