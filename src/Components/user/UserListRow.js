import { TableCell, TableRow, Button } from '@material-ui/core'
import React from 'react'

function UserListRow({user}) {

    const _disableAction = ()=>{
        alert('disable here')
    }
    const _activeAction = ()=>{
        alert('active here')

    }
    return (
        <TableRow hover>
            <TableCell align='center' >{user.username?user.username:'-'}</TableCell>
            <TableCell align='center'  >{user.email?user.email:'-'}</TableCell>
            <TableCell align='center' >{user.status?user.status:'-'}</TableCell>
            <TableCell align='right' >
                <Button variant="outlined" color="primary" onClick={user.status?_activeAction:_disableAction}>
                        {user.status?'Activate account':'Disable account'}
                </Button>
            </TableCell>
            
        </TableRow>
    )
}

export default UserListRow
