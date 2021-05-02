//  users table
// render each user inside a single row
// each single row represented by this component
//

import { TableCell, TableRow, Button } from '@material-ui/core'
import React from 'react'
import useToken from '../../Hooks/useToken';
import {uri} from "../../Url_base";
import axios from 'axios'
import CustomSnackbar from '../CustomSnackBar';
const lngc = window.localStorage.getItem("lang")
  ? window.localStorage.getItem("lang")
  : "EN";
const lang = require(`../../Language/${lngc}.json`);

function UserListRow({user}) {
    const [setToken,getToken] = useToken();
    const [status, setstatus] = React.useState('')
    const _disableAction = ()=>{
        setstatus('');
        axios.delete(`${uri.link}/users/${user.username}`, {
            headers: {
            'auth-token':`${getToken()}` 
            },
          }).then(res=>{
                    if(res.status===200){
                        setstatus(200)
                    }
                    else{
                        setstatus('error')
                    }
          }).catch(err=>{
                setstatus('error')
          })
    }
  
    return (
        <>
        {
            status!==200 &&
            <TableRow hover>
            <TableCell align='center' >{user.username?user.username:'-'}</TableCell>
            <TableCell align='center'  >{user.email?user.email:'-'}</TableCell>
            <TableCell align='center' >{user.status?user.status:'-'}</TableCell>
            <TableCell align='right' >
                <Button variant="outlined" color="primary" onClick={_disableAction}>
                        {lang.remove_account}
                </Button>
            </TableCell>
        
        </TableRow>
        }
        
            {
                status===200?
                <CustomSnackbar  content='User deleted!' type="success"/>
                :
                status==='error'?
                <CustomSnackbar  content='Ops,failed to delete user!' type="error"/>
                : null
            }

            </>
    )
}

export default UserListRow
