import { Divider, Grid, Paper } from '@material-ui/core'
import React from 'react'
import LocalMallIcon from '@material-ui/icons/LocalMall';
function CustomCard({number,type,children}) {
    return (
        <Grid item md = {3} style={{borderRadius:'10px',marginLeft:'15px',height:'153px'}}>
            <Paper elevation={3} style={{display:'flex',height:'153px',borderRadius:'10px',padding:'10px',background:'rgb(243,245,247)',flexDirection:'column'}}>
            <section style={{width:'100%',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',height:'60%',marginBottom:'5px'}}>
                    <div style={{background:'rgb(36,38,76)',width:'60px',height:'60px',borderRadius:'10px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        {/* <LocalMallIcon style={{fontSize:'40px',color:'white'}}/> */}
                        {children}
                    </div>
                </section>
                <Divider variant="middle" />
                <section style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'space-around',height:'40%',alignItems:'center',marginTop:'5px'}}>
                        <span style={{paddingLeft:'10px',fontWeight:'bold',fontSize:'25px',color:'#303030'}}>{number}</span>
                        <span style={{paddingLeft:'10px',fontSize:'13px',color:'#303030',opacity:'60%'}}><b>{type}</b></span>
                </section>
                
            </Paper>
        </Grid>
           
    )
}

export default CustomCard
