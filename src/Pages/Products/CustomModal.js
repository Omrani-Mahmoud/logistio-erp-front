import { Avatar, Button, CircularProgress, Grid, Modal, Paper } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import UrlsTable from '../../Components/UrlsTable';
import CustomSpan from '../../Components/CustomSpan';
import VariantsTable from '../../Components/VariantsTable';
import AccessoriesTable from '../../Components/AccessoriesTable';
import EmailModal from '../../Components/EmailModal';
import img from '../../Assets/img/productPlaceHolder.png';
import {uri} from "../../Url_base";
import axios from 'axios';
import useToken from '../../Hooks/useToken';
import Swal from 'sweetalert2'

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`);





const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 650,
  },
  large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
      marginRight:'20px'
    },
}));

const reducer = (state,action)=>{
  switch (action.type) {
    case 'moq':
        return {...state,moq:action.value}
        case 'moqcp':
          return {...state,moqcp:action.value}
          case 'agentDesc':
            return {...state,agentDesc:action.value}
            case 'samplePrice':
             return {...state,price_sample:action.value}
     
  
    default:
      return state
      break;
  }
}


function CustomModal({open,handleOpen,handleClose,product,fetch}) {
  const classes = useStyles();
  const [setToken,getToken] = useToken();


  const initProduct = {
    moq:product.moq,
    moqcp:product.moqcp,
    price_sample:product.price_sample,
    agentDesc:product.agent_description,
  }

  const [emailModal, setemailModal] = React.useState(false);

  const [loading, setloading] = React.useState(false)
  const [productsInputs, dispatch] = React.useReducer(reducer, initProduct);


  const lableSpan = {
    color:'#303030',
    opacity:'70%',
    fontWeight:'bold'
  }

  const valueSpan = {
    color:'#303030',
  }

  const handleCloseEmailModal = ()=>{
    setemailModal(false)
  }

  const handleOpeneEmailModal = ()=>{
    setemailModal(true)
  }


  const _updateProd = ()=>{
    setloading(true)
    axios.patch(`${uri.link}/products/${product._id}`,productsInputs,{
      headers:{'auth-token':`${getToken()}`}
    }).then( (response)=> {
          setloading(false);
          fetch();
        })
        .catch(error =>{
          setloading(false);
          handleClose();
          Swal.fire({
            title: 'Ops, an Error!',
            text: "An error appear while updating",
            icon: 'error',
            confirmButtonText: 'OK',
            backdrop: `
                rgba(0,0,123,0.4)
                url("/images/nyan-cat.gif")
                left top
                no-repeat
              `
          })
        })
   
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{display:'flex',justifyContent:'center',alignItems:'center'}}
    >
    
          <Grid item md={10} >
           <Paper elevation={3} style={{display:'flex', padding:'20px',overflowY:'auto',height:'650px',background:'white'}}>
           
             <Grid item md={12} style={{display:'flex',flexDirection:'column'}}>
               <section style={{background:'rgb(243,245,247)',borderRadius:'15px',padding:'10px',marginBottom:'20px',display:'flex',flexDirection:'row'}}>
                <div>
                  <Avatar  alt={product.name} src={product.img?product.img:img}  variant="square" className={classes.large} />
                      
                  </div>
                  <div style={{width:'100%'}}>
                <Grid item md={12}>
                    <section style={{display:'flex',justifyContent:'space-between',flexDirection:'row',width:'58%'}}>
                      <CustomSpan label={`${lang.product_name} :`} value={product.name} />
                   
                      <CustomSpan label={`${lang.type} :`} value={product.type_shopping} />
                      <Button variant="contained" size='small' style={{background:'#939BA4',color:"white",fontWeight:'bold',fontSize:'12px'}} onClick={handleOpeneEmailModal} >{lang.send_mail}</Button>

                    </section>
                </Grid>

              
                  <CustomSpan label={`${lang.sku} :`} value={product.sku} /> 
          
                <CustomSpan label={`${lang.category} :`} value={product.category.name} />

                <CustomSpan label={`${lang.minim_q} :`} value={productsInputs.moq} input type='moq' handler={dispatch} disabled={product.type==='bolk'?false:true}  />

                <CustomSpan label={`${lang.minim_p_q} :`} value={productsInputs.moqcp} type='moqcp' input handler={dispatch} />

                <CustomSpan label={`${lang.sample} :`} value={productsInputs.price_sample} type='samplePrice' input handler={dispatch} />

                <CustomSpan label={`${lang.description} :`} value={product.description?product.description:''} textArea  disabled />
                
                <CustomSpan label={`${lang.agent_desc} :`} value={product.agentDesc?product.agentDesc:''} textArea type='agentDesc' handler={dispatch} />
                {
                    loading?
                      <CircularProgress style={{float:'right'}} size={30} />
                    :
                    <Button variant='contained'  style={{background:'black',color:'white',fontWeight:'bold',zIndex:999999999,float:'right',width:'200px'}} onClick={_updateProd}>Update product</Button>

                }

                </div>
                
                </section>
                <section style={{background:'rgb(243,245,247)',borderRadius:'15px',padding:'10px',marginBottom:'20px'}}>
                <CustomSpan label={`${lang.urls_table} :`} />
                <UrlsTable urls_array={product.urls?product.urls:[]} />
              </section>

              <section style={{background:'rgb(243,245,247)',borderRadius:'15px',padding:'10px',marginBottom:'20px'}}>
                <CustomSpan label={`${lang.variants_table} :`} />
                <VariantsTable variants={product.variants?product.variants:[]} options={product.options?product.options:[]} productId={product?._id} fetch={fetch} />
              </section>

              <section style={{background:'rgb(243,245,247)',borderRadius:'15px',padding:'10px',marginBottom:'20px'}}>
              
                <CustomSpan label={`${lang.accessories_table} :`}  />
                <AccessoriesTable accessories={product.accessories?product.accessories:[]} productId={product?._id}  fetch={fetch}/>
              </section>
            </Grid>
           
           </Paper>
           <EmailModal open={emailModal} handleClose={handleCloseEmailModal} />
          </Grid>
   
  </Modal>
  )
}

export default CustomModal
