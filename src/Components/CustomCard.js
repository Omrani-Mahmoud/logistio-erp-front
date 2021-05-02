
// overview cards
// display statistics
// avg order time , orders ect
import { Divider, Grid, Paper } from '@material-ui/core'
import React from 'react'
import LocalMallIcon from '@material-ui/icons/LocalMall';
import {motion} from 'framer-motion'
const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../Language/${lngc}.json`);
function CustomCard({number,type,children}) {

    const contentVariant = {
        hidden:{
            scale:0,
        },
        visible:{
            scale:1,
            transition:{
                type:'tween',
                duration:0.4,  
            }
        },   
    }
    return (
        <Grid item md = {3} style={{borderRadius:'10px',marginLeft:'15px',height:'130px'}}>
            <Paper elevation={3} style={{display:'flex',height:'130px',borderRadius:'10px',padding:'10px',background:'rgb(243,245,247)'}}>
                <section style={{width:'75%',display:'flex',flexDirection:'column',justifyContent:'center',height:'100%',alignItems:'center',marginTop:'5px'}}>
                        <span style={{paddingLeft:'10px',fontWeight:'bold',fontSize:'25px',color:'#303030'}}>{type===lang.order_time? number?`${Math.round(number/24)}Day`:'-':number}</span>
                        <span style={{paddingLeft:'10px',fontSize:'13px',color:'#303030',opacity:'60%'}}><b>{type}</b></span>
                </section>
                
                <section style={{width:'25%',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',height:'100%',marginBottom:'5px'}}>
                    <div style={{background:'white',width:'60px',height:'60px',borderRadius:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        {/* <LocalMallIcon style={{fontSize:'40px',color:'white'}}/> */}
                        {children}
                    </div>
                </section>
                {/* <Divider variant="middle" />
                */}
                
            </Paper>
        </Grid>
           
    )
}

export default CustomCard
