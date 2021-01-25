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

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`)


function CustomRow({row}) {
  const [open, setOpen] = React.useState(false);

const handleClose = ()=>{
    setOpen(false)
}

const handleOpen = ()=>{
  setOpen(true)
}
    

console.log('ROWWW CUSTOM -> ',row)

    
    
  

    return (
      <>
              <TableRow key={row} hover onClick={handleOpen} style={{cursor:'pointer'}}>
              <TableCell align='left' key={'p1'} >
                  {row._id}
              </TableCell>

              <TableCell align='center' key={'p2'} >
                  {new Date(row.date).toDateString()}
              </TableCell>

              <TableCell align='center' key={'p3'} >
                  {row.sku}
              </TableCell>

              <TableCell align='center' key={'p4'} >
                  {row.quantity}
              </TableCell>

              <TableCell align='center' key={'p5'} >
                  {`${row.client.first_name} ${row.client.last_name}` }
              </TableCell>

             
              <TableCell align='center' key={'p6'} >
                  <StatusBadge status={row.status} />
              </TableCell>
          </TableRow>
                      <CustomModal  open={open} handleClose={handleClose} purchase={row}  />
</>
    )
}

export default CustomRow
