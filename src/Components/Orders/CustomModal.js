// modal of a single Order
// display order details
// annd the updates and post  needed is here too 
// shipping line ect
import React from 'react'
import Modal from '@material-ui/core/Modal';
import { Grid, Paper, TextField,Button,Avatar, Select } from '@material-ui/core';
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`);
const companies = require(`../../Assets/Files/companies.json`);

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
                case 'company':
                    return {...state,shipping_company:action.value}
                    case 'line':
                        return {...state,shipping_line:action.value}
                        case 'country':
                            return {...state,country:action.value}
                            case 'push':
                            {
                                let old = state.items?.length>0?state.items:[];
                                
                                old.push(action.value);
                                return {...state,items:old}

                            }
                            case 'remove':
                                {
                                    let old = state.items;
                                    let newT = old.filter(elem=>{return elem!==action.value})
                                    return {...state,items:newT}
    
                                }
        
        default:
            return state
    }
}
function CustomModal({open,handleClose,order,fetch,reship}) {
    const classes = useStyles();

    const [status, setStatus] = React.useState('');
    const [setToken,getToken] = useToken();
    const [disableIntegrations, setdisableIntegrations] = React.useState(false);
    const [companies_, setcompanies_] = React.useState([]);


    const get_companies_ = ()=>{
        console.log('hereloo there')
          axios.get(`${uri.link}/shipper/lines/`,{
              headers:{'auth-token':getToken()}
          }).then(res=>{
            setcompanies_(res.data)
        });
          
    }

    const initOrderInfo = {
        tracking_id:order.tracking_number?order.tracking_number:'',
        order_price:order.shipping_cost?order.shipping_cost:"",
        shipping_company:0,
        shipping_line:{code:'',name:''},
        country:'',
        items: []
    };


    React.useEffect(() => {
        if(order?.tracking_number?.length>0 || order.shipping_cost>0)
            setdisableIntegrations(true)
    }, []);

    const [orderInfo, dispatch] = React.useReducer(reducer, initOrderInfo)
    const [displayImg, setDisplayImg] = React.useState({
        isHovred:false,
        link:''
      });
    const [lines, setlines] = React.useState([{}]);

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

    const _updateOrder = (v)=>{
        let body = {};
        if(v==1)
        body = {
                e:'create_order',
                id:order._id,
                c: orderInfo.shipping_company, 
                line: orderInfo.shipping_line.code,
                items:orderInfo.items
	        }
        else{
            body = {
                tracking:orderInfo.tracking_id,
                id:order._id,
                cost:orderInfo.order_price,
                items:orderInfo.items

	        }
        }
   
        
     if(v==1){
                    axios.post(`${uri.link}/shipper`,body, 
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
                else{
                    axios.patch(`${uri.link}/orders`,body, 
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
    }
    const verifInputs = ()=>{
        if(orderInfo.shipping_company!== -1  && orderInfo.shipping_line!=={} ){
                _updateOrder(1);
        }
        else if(orderInfo.tracking_id.length>0 || orderInfo.order_price.length>0){
                _updateOrder(2);

        }
        else{
            alert('Empty Orders info not allowed');
            console.log(orderInfo)
        }
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

    const company_handler = (val)=>{
        dispatch({type:'company',value:val})
    }

    const lines_handler = (val)=>{
        let elem = lines.filter(e=>{
            return e.Code==val
        })[0];

        dispatch({type:'line',value: {code:elem.Code,name:elem.EName}})
       
    }

    const country_handler = (val)=>{
        dispatch({type:'country',value:val})
    }


    const getLines = ()=>{
        setlines([]);
        axios.post(`${uri.link}/shipper`,
        {
            e:'shipping_lines',
            c:orderInfo.shipping_company,
            country:order.shipping_infos[0].country
        },
        
        {
            headers:{
                'auth-token':getToken()
            }
        })
            .then(function (response) {
                // handle success
                let res = [];
                console.log('aaaaaaa raaaa',response)
                switch (orderInfo.shipping_company) {
                    case 0:
                        setlines(response.data['Items'])
                        case 1:
                           {
                            response.data.map(elem=>{
                                    res.push({CName:elem.logistics_product_name_cn,EName:elem.logistics_product_name_en,Code:elem.logistics_product_code})
                            })
                            setlines(res)
                           }
                           case 2:
                            {
                             response.data.map(elem=>{
                                     res.push({CName:elem.ServiceName,EName:elem.ServiceName,Code:elem.ServiceCode})
                             })
                             setlines(res)
                            }
                            // x544D - GDWSE
                            case 3:
                            {
                             response.data.map(elem=>{
                                console.log(elem.product_shortname);
                                res.push({CName:elem.product_shortname,EName:elem.product_shortname,Code:elem.product_id})
                             })
                             setlines(res)
                            }
                            // x544D - YITONGGUAN 
                            case 4:
                            {
                                response.data.map(elem=>{
                                        res.push({CName:elem.shipName,EName:elem.shipName,Code:elem.shipCode})
                                })
                                setlines(res)
                            }
                            // x544D -  topalink
                            case 5:
                            {
                                response.data.map(elem=>{
                                        res.push({CName:elem.product_shortname,EName:elem.product_shortname,Code:elem.product_id})
                                })
                                setlines(res)
                            }
                }
               
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

   
    React.useEffect(() => {
        if(open){
            getLines();
            get_companies_();

        }
    }, [open]) //,orderInfo.country

    React.useEffect(() => {
        if(open){
            getLines();
            // get_companies_();

        }
    }, [orderInfo.shipping_company])
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

{/* order.fulfillment_mode==='fulfill_all' || orderInfo.items.length>0 ?'flex':'none', */}
                    <Grid item md={12} style={{display:'flex',background:'white',borderRadius:'8px',flexDirection:'column',padding:'10px',maxHeight:'400px',marginBottom:'10px'}}>
                            <span style={{color:'#303030',opacity:'60%',fontWeight:'bold',fontSize:'18px',marginBottom:'10px'}}>{lang.order_info}</span>
                            {/* <FormControl style={{width:'30%',marginBottom:'10px'}}>
                                    <InputLabel id="country">Country</InputLabel>
                                    <Select
                                    labelId="country"
                                  
                                    value={orderInfo.country}
                                    onChange={(e)=>country_handler(e.target.value)}
                                    >
                                        {
                                           countries?.length>0 &&  countries?.map(elem=>{
                                                return <MenuItem value={elem.code}>{elem.name}</MenuItem>
                                            })
                                        }

                                    </Select>
                                </FormControl> */}
                            {
                                !disableIntegrations && !(orderInfo.tracking_id != "" || orderInfo.order_price != "") ?
                            
                                <FormControl style={{width:'30%',marginBottom:'10px'}}>
                                    <InputLabel id="shipingcompany">Shipping Company</InputLabel>
                                    <Select
                                    labelId="shipingcompany"
                                  
                                    value={orderInfo.shipping_company}
                                    onChange={(e)=>company_handler(e.target.value)}
                                    >
                                        {
                                            companies_.map(company=>{
                                               return  <MenuItem value={company.code}>{company.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                :
                                null
}

{
                                !disableIntegrations &&  !(orderInfo.tracking_id != "" || orderInfo.order_price != "") ?
                                <FormControl style={{width:'30%',marginBottom:'10px'}}>
                                    <InputLabel id="shipingline">Shipping Line</InputLabel>
                                    <Select
                                    labelId="shipingline"
                                  
                                    value={orderInfo.shipping_line.code}
                                    onChange={(e)=>lines_handler(e.target.value)}
                                    >
                                        {
                                           lines?.length>0 &&  lines?.map(elem=>{
                                                return <MenuItem value={elem.Code}>{lngc ==='EN'?elem.EName:elem.CName}</MenuItem>
                                            })
                                        }

                                    </Select>
                                </FormControl>
                                : null
                                    }
                            <span style={{marginLeft:'7px',marginBottom:'7px',alignItems:'center', display:'flex'}}><b>{lang.track_number}</b> : 
                              <TextField defaultValue={order.tracking_number}  size='small'  onChange={(e)=>dispatch({type:'tracking',value:e.target.value})} />
                               
 </span>
                            {
                                !reship && 
                                    <span style={{marginLeft:'7px',marginBottom:'7px',alignItems:'center', display:'flex'}}><b>{lang.shipping_price}</b> : 
                                      <TextField  defaultValue={order.shipping_cost}  size='small' onChange={(e)=>dispatch({type:'price',value:e.target.value})} />
 </span>
} 
                        
 {/* <motion.Button 
                    
                    whileHover={{scale:1.1 }}
                            variant="contained"
                            
                            style={{marginTop:'15px'}}
                            onClick={verifInputs}
                            style={{width:'300px',alignSelf:'center',background:'rgb(65,84,179)',border:'0px',borderRadius:'5px',height:'30px',marginTop:'15px',color:'white',cursor:'pointer',fontWeight:'bold'}}
                        >
                            {lang.save_it}
                    </motion.Button> */}


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
                                        return   <OrderItem dispatcher={dispatch} product={row} disabled={order.fulfillment_mode==='fulfill_all'?true:false} order_id={order._id} fetch={fetch} />

                                })
                            }
                                                    
                    {
                        order.fulfillment_mode=='partially_fulfilled' &&  orderInfo.items.length>0 &&  (orderInfo.shipping_line.code!=="" || orderInfo.tracking_id !== "") &&
                        <motion.Button
                    
                    whileHover={{scale:1.1 }}
                            variant="contained"
                            
                            style={{marginTop:'15px'}}
                            // onClick={_updateItem}
                            onClick={verifInputs}
                            style={{width:'300px',alignSelf:'center',background:'rgb(65,84,179)',border:'0px',borderRadius:'5px',height:'30px',marginTop:'15px',color:'white',cursor:'pointer',fontWeight:'bold'}}
                        >
                            Push orders for shipping
                    </motion.Button>
}

{
                        order.fulfillment_mode=='fulfill_all'  &&
                        <motion.Button
                    
                    whileHover={{scale:1.1 }}
                            variant="contained"
                            
                            style={{marginTop:'15px'}}
                            // onClick={_updateItem}
                            onClick={verifInputs}
                            style={{width:'300px',alignSelf:'center',background:'rgb(65,84,179)',border:'0px',borderRadius:'5px',height:'30px',marginTop:'15px',color:'white',cursor:'pointer',fontWeight:'bold'}}
                        >
                            Push orders for shipping
                    </motion.Button>
}
                </Paper>
            </Grid>
      </Modal>
    )
}

export default CustomModal
