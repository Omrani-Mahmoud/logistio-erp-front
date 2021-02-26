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
import CustomModal from './CustomModal';

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`)


function CustomRow({row,fetch,productId,reship,setmodalIsOpen}) {
  const [open, setOpen] = React.useState(false);

const handleClose = ()=>{
    setOpen(false);
    setmodalIsOpen(false);
}

const handleOpen = ()=>{
  setOpen(true);
  setmodalIsOpen(true);
}
    

console.log('ROWWW CUSTOM -> ',row)

    
    
  

    return (
      <>
              <TableRow key={row} hover onClick={handleOpen} style={{cursor:'pointer'}}>
              <TableCell align='center' key={'ac1'} >
                  {row.order_id?row.order_id:'-'}
              </TableCell>
              
              <TableCell align='center' key={'ac1'} >
                  {`${row.shipping_infos[0].first_name} ${row.shipping_infos[0].last_name}` }
              </TableCell>
              <TableCell align='center' key={'ac1'} >
                  {`${row.shipping_infos[0].country} / ${row.shipping_infos[0].city}`}
              </TableCell>
              <TableCell align='center' key={'ac1'} >
                  {row.status}
              </TableCell>
              <TableCell align='center' key={'ac1'} >
                  {row.fulfillment_mode}
              </TableCell>
              <TableCell align='center' key={'ac1'} >
                  {row.order_items.length}
              </TableCell>
          </TableRow>
                      <CustomModal reship={reship} open={open} handleClose={handleClose} order={row} fetch={fetch} />
</>
    )
}

export default CustomRow
