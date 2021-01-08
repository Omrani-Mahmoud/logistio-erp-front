import { Avatar, Button, Grid, Modal, Paper } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import UrlsTable from '../../Components/UrlsTable';
import CustomSpan from '../../Components/CustomSpan';
import VariantsTable from '../../Components/VariantsTable';
import AccessoriesTable from '../../Components/AccessoriesTable';
import EmailModal from '../../Components/EmailModal';

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`)

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
function CustomModal({open,handleOpen,handleClose,product}) {
  const classes = useStyles();

  const [emailModal, setemailModal] = React.useState(false)
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
           <Paper elevation={3} style={{display:'flex', padding:'20px',overflowY:'auto',height:'650px',background:'rgb(243,245,247)'}}>
             <div>
             <Avatar alt={product.name} src={product.img}  variant="square" className={classes.large} />
                
             </div>
             <Grid item md={12} style={{display:'flex',flexDirection:'column'}}>
                <Grid item md={12}>
                    <section style={{display:'flex',justifyContent:'space-between',flexDirection:'row',width:'58%'}}>
                      <CustomSpan label={`${lang.product_name} :`} value={product.name} />
                   
                      <CustomSpan label={`${lang.type} :`} value={product.type} />
                      <Button variant="contained" size='small' style={{background:'#4D5B6A',color:"white",fontWeight:'bold',fontSize:'12px'}} onClick={handleOpeneEmailModal} >{lang.send_mail}</Button>

                    </section>
                </Grid>

                <section style={{display:'flex',justifyContent:'space-between',flexDirection:'row',width:'40%'}}>
                  <CustomSpan label={`${lang.sku} :`} value={product.sku} /> 
                  <CustomSpan label={`${lang.category} :`} value={product.category} />
                </section>
     
                <CustomSpan label={`${lang.description} :`} value={product.description} textArea  disabled/>
                
                <CustomSpan label={`${lang.agent_desc} :`} value={product.agent_description} textArea />

              <section style={{padding:'10px'}}>
                <CustomSpan label={`${lang.urls_table} :`} />
                <UrlsTable urls_array={product.urls} />
              </section>

              <section style={{padding:'10px'}}>
                <CustomSpan label={`${lang.variants_table} :`} />
                <VariantsTable variants={product.variants} />
              </section>

              <section style={{padding:'10px'}}>
              
                <CustomSpan label={`${lang.accessories_table} :`}  />
                <AccessoriesTable accessories={product.accessories} />
              </section>
            </Grid>
           
           </Paper>
           <EmailModal open={emailModal} handleClose={handleCloseEmailModal} />
          </Grid>
   
  </Modal>
  )
}

export default CustomModal
