// same as the old varinats rows
// but this one for edit and persist ( updat variant of the STOck)
//

import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import {uri} from "../../../Url_base";
import axios from 'axios'
import useToken from '../../../Hooks/useToken';
function CustomVariantRow({row,storageID}) {

    const [inputs, setinputs] = React.useState({quantity:row?.quantity?row.quantity:0,threshold:row?.threshold?row.threshold:0});

    const [edit, setEdit] = React.useState(false);
    const [status, setStatus] = React.useState('');
    const [setToken,getToken] = useToken();

    const handlerThreshold =(e)=>{
        setinputs({...inputs,threshold:e.target.value})
    };

    const handlerQuantity =(e)=>{
        setinputs({...inputs,quantity:e.target.value})
    };


    React.useEffect(() => {
        setinputs({quantity:row?.quantity?row.quantity:0,threshold:row?.threshold?row.threshold:0})
    }, [row])




    
    const _post = ()=>{
        setStatus('');
        axios.patch(`${uri.link}/storage/${storageID}`,
        {
            // productId:productID,
            variant:row._id,
            quantity:parseInt(inputs.quantity),
            threshold:parseInt(inputs.threshold)
        },
        {
          headers:{'auth-token':`${getToken()}`}
        }).then( (res)=> {
                res.status===200?
                setStatus(200)
                :
                setStatus('error');
                setEdit(false)
            })
            .catch(error =>{
                setStatus('error');
                setEdit(false)
            })
       
      }



    return (
        <TableRow>
        <TableCell align='center'>
            {row.option1?row.option1:'-'} 
        </TableCell>

        <TableCell align='center'>
            {row.option2?row.option2:'-'} 
        </TableCell>

        <TableCell align='center'>
            {row.option3?row.option3:'-'} 
        </TableCell>

        <TableCell align='center'>
        <TextField size='small' value={inputs.quantity} onChange={(e)=>handlerQuantity(e)} disabled={!edit}/>

        </TableCell>
        <TableCell align='center'>
        <TextField size='small' value={inputs.threshold} onChange={(e)=>handlerThreshold(e)} disabled={!edit} />
        </TableCell>
        <TableCell align='center'>
            {
                !edit?
                <IconButton color="primary" onClick={()=>setEdit(true)}>
        <EditIcon />
        </IconButton>
        :
        <IconButton color="primary" onClick={()=>_post()}>
        <SaveIcon />
        </IconButton>
            }
        
        </TableCell>
     </TableRow>
    )
}

export default CustomVariantRow
