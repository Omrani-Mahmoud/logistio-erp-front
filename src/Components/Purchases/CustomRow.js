// purchase custom row
// its called inside CustomModal
// just the update call is here
// its what we need

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinkIcon from '@material-ui/icons/Link';
import { Link } from 'react-router-dom';
import { Button, Grid, TextField, CircularProgress, IconButton } from '@material-ui/core'
import AttachmentsLink from '../AttachmentsLink';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from 'axios'
import {uri} from '../../Url_base'
import useToken from '../../Hooks/useToken';
import Swal from 'sweetalert2'
import Avatar from '@material-ui/core/Avatar';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import {motion} from 'framer-motion';
import productPlaceHolder from '../../Assets/img/productPlaceHolder.png'
import StatusBadge from '../StatusBadge';
import CustomModal from './CustomModal';
import UpdateIcon from '@material-ui/icons/Update';
import CustomSnackbar from '../CustomSnackBar';
const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`)


function CustomRow({row}) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const [setToken,getToken] = useToken();

const handleClose = ()=>{
    setOpen(false)
}

const handleOpen = ()=>{
  setOpen(true)
}
    

const _update = ()=>{
    setStatus('');
    axios.patch(`${uri.link}/purchases/${row._id}`,
    {
      
    },
    {headers:{'auth-token':`${getToken()}`}}
    ).then( (res)=> {
            res.status===200?
            setStatus(200)
            :
            setStatus('error');
        })
        .catch(error =>{
            setStatus('error');
        })
   
  }
    return (
      <>

                    {
                        status===200?
                        <CustomSnackbar  content='Purchase updated!' type="success"/>
                        :
                        status==='error'?
                        <CustomSnackbar  content='Ops,update failed!' type="error"/>
                        : null

                    }
              <TableRow key={row} hover onClick={handleOpen} style={{cursor:'pointer'}}>
              <TableCell align='left' key={'p1'} >
                  {row.purchase_id?row.purchase_id:'-'}
              </TableCell>

              <TableCell align='center' key={'p2'} >
                  {new Date(row.updated_at).toLocaleString()}
              </TableCell>

              <TableCell align='center' key={'p3'} >
                  {row.product.sku}
              </TableCell>


              <TableCell align='center' key={'p5'} >
                  {`${row.client.first_name} ${row.client.last_name}` }
              </TableCell>

             
              <TableCell align='center' key={'p6'} >
                  <StatusBadge status={status!==200?row.status:'processing'} />
              </TableCell>

              {/* <TableCell align='center' key={'p6'} style={{pointerEvents:'none'}}>
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={_update}>
                        <UpdateIcon  />
                    </IconButton>
              </TableCell> */}
          </TableRow>
                      <CustomModal update={_update} status={status}  open={open} handleClose={handleClose} purchase={row}  />
</>
    )
}

export default CustomRow
