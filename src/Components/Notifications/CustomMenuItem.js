import { MenuItem } from '@material-ui/core'
import React from 'react'
import {uri} from '../../Url_base'
import axios from 'axios'
import EmailModal from '../EmailModal'
import useToken from '../../Hooks/useToken';

function CustomMenuItem({is_read=false,notif,handleClose}) {

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
        <MenuItem  onClick={read__} style={{width:'200px',background: is_read?null:'#e3e3e3',marginBottom:'5px',borderRadius:'5px',marginLeft:'4px',marginRight:'4px'}} >{notif?.name}</MenuItem>

        <EmailModal sku={notif.sku} product_id={notif.prod_id} open={emailModal} handleClose={handleCloseEmailModal} />

        </>
    ) 
}

export default CustomMenuItem
