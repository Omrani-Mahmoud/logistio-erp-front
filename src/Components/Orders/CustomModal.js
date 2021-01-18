import React from 'react'
import Modal from '@material-ui/core/Modal';
import { Grid, Paper } from '@material-ui/core';
import { Language, Rowing } from '@material-ui/icons';
import AddressTable from './AddressTable';
import OrderItem from './OrderItem';

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`)
function CustomModal({open,handleClose,order}) {

    const spanColorbg = {
        background:'white',
        height:'30px',
        borderRadius:'8px',
        width:'100%',
        display:'flex',
        alignItems:'center',
        padding:'5px'

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
                        <Grid item md={4}><span style={spanColorbg}><b>Fullfilment Mode </b> : {order.fulfillment_mode}</span></Grid>
                        <Grid item md={4}><span style={spanColorbg}><b>Fullfilment Status </b> : {order.status}</span></Grid>
                    </Grid>
                    <Grid item md={12} style={{display:'flex',background:'white',borderRadius:'8px',flexDirection:'column',padding:'10px',maxHeight:'400px'}}>
                            <span style={{color:'#303030',opacity:'60%',fontWeight:'bold',fontSize:'18px',marginBottom:'10px'}}>Client information</span>
                            <span style={{marginLeft:'7px',marginBottom:'7px'}}><b>Email</b> : {order.client.email} </span>
                            <span style={{marginLeft:'7px',marginBottom:'7px'}}><b>First name</b> : {order.client.first_name} </span>
                            <span style={{marginLeft:'7px',marginBottom:'7px'}}><b>Last name</b> : {order.client.last_name} </span>

                            <span style={{color:'#303030',opacity:'60%',fontWeight:'bold',fontSize:'15px',marginBottom:'10px',marginTop:'15px'}}>Shpping information</span>

                                <AddressTable adrs={order.shipping_adress} />

                    </Grid>
                    <Grid item md={12} style={{display:'flex',background:'white',borderRadius:'8px',flexDirection:'column',padding:'10px',minHeight:'400px',marginTop:'20px'}}>
                            <span style={{color:'#303030',opacity:'60%',fontWeight:'bold',fontSize:'18px',marginBottom:'10px'}}>Order Items</span>
                            {
                                order.order_items.map(row=>{
                                        return   <OrderItem product={row} />

                                })
                            }

                    </Grid>
                </Paper>
            </Grid>
      </Modal>
    )
}

export default CustomModal
