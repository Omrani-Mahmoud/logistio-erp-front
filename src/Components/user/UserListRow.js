import { TableCell, TableRow, Button } from '@material-ui/core'
import React from 'react'

const lngc = window.localStorage.getItem("lang")
  ? window.localStorage.getItem("lang")
  : "EN";
const lang = require(`../../Language/${lngc}.json`);

function UserListRow({user}) {

    const _disableAction = ()=>{
        alert('disable here')
        console.log('USER ',user)
    }
  
    return (
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
    )
}

export default UserListRow
