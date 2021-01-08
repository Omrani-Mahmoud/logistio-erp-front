import React from 'react'
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button, CircularProgress, Grid, Paper } from '@material-ui/core';


const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../Language/${lngc}.json`)

function EmailModal({open,handleClose}) {
    const [loading, setloading] = React.useState(false)
    const spanMargin = {
        marginBottom:'10px',
        fontWeight:'bold',
        color:'#303030',
        opacity:'80%'
    }

    const inputMargin = {
        marginBottom:'20px'
    }

    const send_ =()=>{
        console.log('send email here')
        setloading(true);
        setloading(false);
        handleClose();
    }

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{display:'flex',justifyContent:'center',alignItems:'center'}}
        >
         <Grid item md={8}  >
         <Paper elevation={3} style={{display:'flex', padding:'20px',overflowY:'auto',height:'350px',background:'rgb(243,245,247)',flexDirection:'column',padding:'25px'}}>
             <h3>{lang.mailing}</h3>
             <section style={{display:'flex',flexDirection:'column'}}>
                
                <TextField style={inputMargin} size='small' id="outlined-basic" label={lang.email_subject} variant="outlined" />
             </section>

             <section style={{display:'flex',flexDirection:'column'}}>
                <span style={spanMargin}>{`${lang.email_text}`}</span>
                <TextareaAutosize aria-label="minimum height" rowsMin={10} placeholder={lang.your_text_here}  style={{width:'90%'}}/>
             </section>
             {
                 loading?
                 <CircularProgress style={{alignSelf:'center',marginTop:'15px'}} size={30}/>
                :
                <Button variant="contained"  style={{marginTop:'17px',background:'#000246',color:'white'}} onClick={send_}>
                {lang.send_mail}
               </Button>
             }
            
             </Paper>
            
         </Grid>
        </Modal>
    )
}

export default EmailModal
