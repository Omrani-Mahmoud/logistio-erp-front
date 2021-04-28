import React from 'react'
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button, CircularProgress, Grid, Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ChatRow from '../Pages/Products/ChatRow';
import axios from 'axios'
import {uri} from "../Url_base";
import useToken from '../Hooks/useToken';

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../Language/${lngc}.json`)

function EmailModal({product_id,open,handleClose,sku=''}) {
    const [loading, setloading] = React.useState(false);
    const [msgInput, setmsgInput] = React.useState('');
    const [setToken,getToken] = useToken();

    const [msgs, setmsgs] = React.useState([]);


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
        axios.post(`${uri.link}/messages`, {
            product: product_id,
            body: msgInput,
            agentMsg:1,
            uid:0
          },
          {
            headers:{'auth-token':`${getToken()}`}
          })
          .then(function (response) {
            console.log(response);
            setmsgs([...msgs,{agentMsg:1,body:msgInput}]);
            setmsgInput('');
          })
          .catch(function (error) {
            console.log(error);
          });

        // setmsgs([...msgs,{agentMsg:1,body:msgInput}]);
        // setmsgInput('');
        // setloading(true);
        // setloading(false);
        // handleClose();
        
    }


    const _get_msgs = (mounted)=>{


        setloading(true);
        axios.get(`${uri.link}/messages/${product_id}`,{
            headers:{'auth-token':`${getToken()}`}
        })
           .then(function (response) {
             setloading(false)
               if(mounted){
                console.log('MSGS --->',response)
                setmsgs(response.data.data)
                // // console.log('PRODUCTS ::: :',response);
                //     setproducts(response.data)
               }
           })
           .catch(function (error) {
               // handle error
               setloading(false)
               console.log(error);
           });
    }

    React.useEffect(() => {
        if(open){
        _get_msgs(true);
    }
    }, [open])




    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{display:'flex',justifyContent:'center',alignItems:'center'}}
        >
         <Grid item md={8}  >
         <Paper elevation={3} style={{display:'flex', padding:'20px',background:'rgb(243,245,247)',flexDirection:'column',padding:'25px'}}>
             <h3>{lang.chat_room}</h3>
             {
               sku.length>0 && 
               <span style={{fontWeight:'bold',fontSize:'13px'}}>SKU:{sku}</span>
             }
             <section style={{display:'flex',flexDirection:'column',padding:'10px',overflowY:'auto',height:'350px'}}>
                
               {
                   msgs.length>0?
                   msgs.map(msg=>{
                       return <ChatRow text={msg.body} user={msg.agentMsg}/>
                   })
                   :
                   <span style={{padding:'10px',color:'white',background:'#2196f3',fontWeight:'500',borderRadius:'5px'}}>No Messages yet ... !</span>
               } 
                             

             </section>
             <Grid item md={8} xs={12} style={{padding:'10px'}}>
                              <TextareaAutosize value={msgInput} onChange={(e)=>setmsgInput(e.target.value)} aria-label="minimum height" rowsMin={5} placeholder={lang.your_text_here} style={{width:'100%'}}/>
             </Grid>
            
             {
                 msgInput.length>0?
                
                <Button variant="contained"  style={{marginTop:'17px',background:'#000246',color:'white'}} onClick={send_}>
                {lang.send}
               </Button>
               : null
             }
            
             </Paper>
            
         </Grid>
        </Modal>
    )
}

export default EmailModal
