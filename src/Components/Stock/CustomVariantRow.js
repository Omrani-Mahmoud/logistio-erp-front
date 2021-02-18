import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import useToken from '../../Hooks/useToken';
import {uri} from "../../Url_base";
import axios from 'axios'
import CustomSnackbar from '../CustomSnackBar';

function CustomVariantRow({row,productID}) {

    const [inputs, setinputs] = React.useState({quantity:0,threshold:0});
    const [setToken,getToken] = useToken();
    const [status, setStatus] = React.useState('');

    const handlerThreshold =(e)=>{
        setinputs({...inputs,threshold:e.target.value})
    }

    const handlerQuantity =(e)=>{
        setinputs({...inputs,quantity:e.target.value})
    }


    const _post = ()=>{
        setStatus('');
        console.log('Variant ID =================>',row._id);
        console.log('Variant ID =================>',productID
        )

        axios.post(`${uri.link}/storage/`,
        {
            product:productID,
            variant:row._id,
            quantity:parseInt(inputs.quantity),
            threshold:parseInt(inputs.threshold),
            option1:row.option1?row.option1:null,
            option2:row.option2?row.option2:null,
            option3:row.option3?row.option3:null
        },
        {
          headers:{'auth-token':`${getToken()}`}
        }).then( (res)=> {
                res.status===200?
                setStatus(200)
                :
                setStatus('error')

            })
            .catch(error =>{
                setStatus('error')
            })
       
      }
   


    console.log('SADD======>',row)
    return (
        <>
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
        <TextField size='small' value={inputs.quantity} onChange={(e)=>handlerQuantity(e)}/>

        </TableCell>
        <TableCell align='center'>
        <TextField size='small' value={inputs.threshold} onChange={(e)=>handlerThreshold(e)} />
        </TableCell>
        <TableCell align='center'>
        <IconButton color="primary" onClick={()=>_post()}>
        <AddBoxIcon />
        </IconButton>
        </TableCell>
     </TableRow>
                    {
                        status===200?
                        <CustomSnackbar  content='Added!' type="success"/>
                        :
                        status==='error'?
                        <CustomSnackbar  content='Ops, failed to add Stock!' type="error"/>
                        : null
                    }
     </>
    )
}

export default CustomVariantRow
