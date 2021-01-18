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
function OrderItem({product}) {


    console.log('PRODUC -->>> ',product)
    return (

        <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <section style={{width:'100%'}}>
                <Avatar alt="gun" src={product?.product.media[0]?.link}  variant='square'/>
                <Typography>{product.product.name}</Typography>
            </section>
            <div style={{marginLeft:'25px',width:'100%',display:'flex',alignItems:'flex-start',justifyContent:'space-between'}}>
                <section>
                    <span style={{color:'#303030',opacity:'65%'}}>SKU : </span><span style={{color:'#303030',opacity:'85%',fontWeight:'bold'}}>{product.product.sku}</span>
                </section>
            </div>

        </AccordionSummary>
        <AccordionDetails>

            <section >
                <span style={{color:'#303030',opacity:'65%',marginRight:'5px'}}>Quantity :</span>
                {product.quantity}
              
                {/* style={{backgroundColor:'#f0f0f2',width:'200px',display:'flex',flexDirection:'column',height:'160px',padding:'10px',marginTop:'10px',justifyContent:'space-around'}} */}
                {/* <Paper elevation={0}  style={{background:'red',width:'100%'}}  > */}
                        {/* here */}
                        <Grid item md={10} style={{background:'red',width:'100%'}}>
                            <Variants options={['aa','bb']} />
                        </Grid>
                {/* </Paper> */}
            </section>
           
        </AccordionDetails>

     
      </Accordion>
    )
}

export default OrderItem
