import { Avatar, Button, CircularProgress, Grid, Modal, Paper } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import UrlsTable from '../../Components/UrlsTable';
import CustomSpan from '../../Components/CustomSpan';
import VariantsTable from '../../Components/VariantsTable';
import AccessoriesTable from '../../Components/AccessoriesTable';
import EmailModal from '../../Components/EmailModal';
import imgP from '../../Assets/img/productPlaceHolder.png';
import {uri} from "../../Url_base";
import axios from 'axios';
import useToken from '../../Hooks/useToken';
import Swal from 'sweetalert2'
import Loader from '../../Components/Loader';
import CustomSnackbar from '../../Components/CustomSnackBar';
import {motion} from 'framer-motion'
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
    case 'moq':
        return {...state,moq:action.value}
        case 'moqcp':
          return {...state,moqcp:action.value}
          case 'agentDesc':
            return {...state,agentDesc:action.value}
            case 'samplePrice':
             return {...state,price_sample:action.value}
             case 'media':
              return {...state,media:action.value}
     
  
    default:
      return state
      break;
  }
}

const getBgColor = (status)=>{
  switch (status) {
      // case 'pending':
      //     return 'rgb(255,243,207)'
          case true:
              return 'rgb(223,240,216)'
              case false:
                  return 'rgb(242,222,222)'
  
      default:
        return 'rgb(243,245,247)' 
      }
}
const getColor = (status)=>{
  switch (status) {
      // case 'pending':
      //     return 'rgb(255,243,207)'
          case true:
              return 'rgb(103,153,122)'
              case false:
                  return 'rgb(170,72,71)'
  
      default:
        return 'black' 

  }
}

function CustomModal({open,handleOpen,handleClose,product,fetch,img,imgs}) {



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

  const classes = useStyles();
  const [setToken,getToken] = useToken();
  const [displayImg, setDisplayImg] = React.useState({
    isHovred:false,
    link:''
  });

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

  const initProduct = {
    moq:product.moq,
    moqcp:product.moqcp,
    price_sample:product.price_sample,
    agentDesc:product.agent_description,
    media:product.media
  }

  const [emailModal, setemailModal] = React.useState(false);

  const [loading, setloading] = React.useState(false)
  const [productsInputs, dispatch] = React.useReducer(reducer, initProduct);
  const [status, setStatus] = React.useState('');

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
          setStatus(200)
          // <CustomSnackbar type='success' content='Product updated !' />
        })
        .catch(error =>{
          setloading(false);
          // <CustomSnackbar type='error' content='Ops, order update failed!' />

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


  console.log('IMAGES LISTTTT',imgs())

  const get_status = ()=>{
        switch (product.status) {
            case 'pending':
              return `${lang.pending} ⚠️ `;
            case 'processing':
              return `${lang.processing}🕓` ;
            case 'validated':
              return `${lang.validated} ✅`;
            case 'refused':
              return `${lang.refused}😱`;
            default: return '-'
        }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={{display:'flex',justifyContent:'center',alignItems:'center'}}
    >
    
          <Grid item md={10} >
            {
              status===200?
                <CustomSnackbar type='success' content='Product updated !' />
              :
              null
            }
           <Paper elevation={3} style={{display:'flex', padding:'20px',overflowY:'auto',height:'650px',background:'white'}}>
             <Grid item md={12} style={{display:'flex',flexDirection:'column'}}>
                
                {/* here display image while hovred */}
                {
                  displayImg.isHovred  && 
                <motion.div variants={img_display} initial='hidden' animate='display' style={{alignSelf:'center',marginTop:'150px',position:'absolute',zIndex:'999999999',justifyContent:'center'}}>
                  <Avatar  alt={product.name} src={displayImg.link}  variant="square" className={classes.hover} />
                </motion.div>
                }


             <span style={{color:getColor(product.price_control.is_accepted),fontSize:'14px',padding:'7px',background:getBgColor(product.price_control.is_accepted),borderRadius:'10px', marginTop:'10px',marginBottom:'10px',fontWeight:'bold',width:'300px',}}>
               {get_status()}
               
             </span>

               <section style={{background:'rgb(243,245,247)',borderRadius:'15px',padding:'10px',marginBottom:'20px',display:'flex',flexDirection:'row'}}>

                <div>
                  <Avatar  alt={product.name} src={img()?img():imgP}  variant="square" className={classes.large} />
                  <div style={{display:'flex',width:'160px',overflowX:'auto'}}>
                  {
                    imgs().map(img=>{
                      return <Avatar  style={{cursor:'pointer'}}onMouseEnter={()=>handleImageDisplay(img)} onMouseLeave={()=>removeImageDisplay()} alt={product.name} src={img?img:imgP}  variant="square" className={classes.small} />

                    })
                  }
                  </div>

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

                <CustomSpan label={`${lang.minim_q} :`} value={productsInputs.moq} input type='moq' handler={dispatch} disabled={product.type!=='standard'?false:true}  />

                <CustomSpan label={`${lang.minim_p_q} :`} value={productsInputs.moqcp} type='moqcp' input handler={dispatch} />

                <CustomSpan label={`${lang.sample} :`} value={productsInputs.price_sample} type='samplePrice' input handler={dispatch} />

                <CustomSpan label={`${lang.description} :`} value={product.description?product.description:''} textArea  disabled />

                <CustomSpan label={`${lang.video_upload} :`} value={''}  media type='media' handler={dispatch} />

                <CustomSpan label={`${lang.agent_desc} :`} value={product.agentDesc?product.agentDesc:''} textArea type='agentDesc' handler={dispatch} />
                {
                    loading?
                      <Loader />
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
