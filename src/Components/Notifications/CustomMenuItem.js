import { Avatar, MenuItem } from '@material-ui/core'
import React from 'react'
import {uri} from '../../Url_base'
import axios from 'axios'
import EmailModal from '../EmailModal'
import useToken from '../../Hooks/useToken';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
function CustomMenuItem({is_read=false,notif,handleClose}) {
  const classes = useStyles();

    const [setToken,getToken] = useToken();
    const [emailModal, setemailModal] = React.useState(false);



    const handleCloseEmailModal = ()=>{
        setemailModal(false)
      }
    
      const handleOpeneEmailModal = ()=>{
        setemailModal(true)
      }


    const read__ = ()=>{
        handleOpeneEmailModal();
        handleClose();
        is_read === false &&
        axios({
            method: 'get',
            url: `${uri}/messages/${notif.msg_id}/r`,
            headers: {
                headers:{'auth-token':`${getToken()}`}
            }
          })
            .then(function (response) {

            });



    } 
    return (
        <>
        <MenuItem  onClick={read__} style={{width:'500px',height:'70px',color:is_read?null:'white',background: is_read?'#e6e6e6':'rgb(50,51,52)',marginBottom:'5px',borderRadius:'5px',marginLeft:'4px',marginRight:'4px',border:'1px solid #ccc'}} >
          
        <Avatar className={classes.large} variant='square' alt="product image" src={notif?.pic} style={{marginRight:'10px'}} />

        <section style={{display:'flex',flexDirection:'column'}}>
          {notif?.name}
          <b>SKU: {notif?.sku}</b>
          </section> 
          </MenuItem>

        <EmailModal sku={notif.sku} product_id={notif.prod_id} open={emailModal} handleClose={handleCloseEmailModal} />

        </>
    ) 
}

export default CustomMenuItem
