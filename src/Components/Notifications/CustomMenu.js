// top bar custom menu ( notifications)
// the menu items based on the context inside the app.js
// socket response 


import React from 'react'
import Menu from '@material-ui/core/Menu';
import CustomMenuItem from './CustomMenuItem';


import {ConnectedUser,Notifications}  from '../../App'

function CustomMenu({anchorEl,handleOpen,handleClose}) {


    const notifications_context = React.useContext(Notifications)

    const fake = [
        {
            name:'test 1',
            product_id:'123',
            is_read:false,
            sku:'3RFFT'

        },
        {
            name:'test 2',
            product_id:'123',
            is_read:false,
            sku:'3RFFT'

        },
        {
            name:'test 3',
            product_id:'123',
            is_read:false,
            sku:'3RFFT'
        }
    ]
    return (
        <Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}

>
{notifications_context[0].length>0 ?
    notifications_context[0].map(notif=>{
        return <CustomMenuItem is_read={notif.is_read} handleClose={handleClose} notif={notif} />
    })
    :
    <span style={{padding:'10px',width:"200px",fontSize:'12px',fontWeight:'bold'}}>No notifications! </span>
}
</Menu>
    )
}

export default CustomMenu
