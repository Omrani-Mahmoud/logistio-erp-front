import { Avatar, Button, Grid, Modal, Paper } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import UrlsTable from '../../Components/UrlsTable';
import CustomSpan from '../../Components/CustomSpan';
import VariantsTable from '../../Components/VariantsTable';
import AccessoriesTable from '../../Components/AccessoriesTable';
import EmailModal from '../../Components/EmailModal';
import img from '../../Assets/img/productPlaceHolder.png'
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
        return {...state,MOQ:action.value}
        case 'moqcp':
          return {...state,MOQCP:action.value}
          case 'agentDesc':
            return {...state,agent_desc:action.value}
            case 'samplePrice':
             return {...state,samplePrice:action.value}
     
  
    default:
      return state
      break;
  }
}


function CustomModal({open,handleOpen,handleClose,product}) {
  const classes = useStyles();


  const initProduct = {
    MOQ:product.moq,
    MOQCP:product.moqcp,
    samplePrice:product.price_sample,
    agent_desc:product.agent_description,
  }

  const [emailModal, setemailModal] = React.useState(false);

  const [productsInputs, dispatch] = React.useReducer(reducer, initProduct);


  console.log('CHOSSED ::::: ',product)
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

                <CustomSpan label={`${lang.minim_q} :`} value={productsInputs.MOQ} input type='moq' handler={dispatch} disabled={product.type==='bolk'?false:true}  />

                <CustomSpan label={`${lang.minim_p_q} :`} value={productsInputs.MOQCP} type='moqcp' input handler={dispatch} />

                <CustomSpan label={`${lang.sample} :`} value={productsInputs.samplePrice} type='samplePrice' input handler={dispatch} />

                <CustomSpan label={`${lang.description} :`} value={product.description?product.description:''} textArea  disabled />
                
                <CustomSpan label={`${lang.agent_desc} :`} value={product.agent_desc?product.agent_desc:''} textArea type='agentDesc' handler={dispatch} />
                <Button variant='contained'  style={{background:'black',color:'white',fontWeight:'bold',zIndex:999999999,float:'right',width:'200px'}}>Update product</Button>

                </div>
                
                </section>
                <section style={{background:'rgb(243,245,247)',borderRadius:'15px',padding:'10px',marginBottom:'20px'}}>
                <CustomSpan label={`${lang.urls_table} :`} />
                <UrlsTable urls_array={product.urls?product.urls:[]} />
              </section>

              <section style={{background:'rgb(243,245,247)',borderRadius:'15px',padding:'10px',marginBottom:'20px'}}>
                <CustomSpan label={`${lang.variants_table} :`} />
                <VariantsTable variants={product.variants?product.variants:[]} />
              </section>

              <section style={{background:'rgb(243,245,247)',borderRadius:'15px',padding:'10px',marginBottom:'20px'}}>
              
                <CustomSpan label={`${lang.accessories_table} :`}  />
                <AccessoriesTable accessories={product.accessories?product.accessories:[]} />
              </section>
            </Grid>
           
           </Paper>
           <EmailModal open={emailModal} handleClose={handleCloseEmailModal} />
          </Grid>
   
  </Modal>
  )
}

export default CustomModal
