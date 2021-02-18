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

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`)


function CustomRow({row,fetch,productId}) {

  const svgVariants = {
   
    hover:{
      rotate:[0,-30,20,-20,10,-10,0],
      transition:{
        duration:1
      }
    }
}
    const [setToken,getToken] = useToken();
    const [quantity, setQuantity] = React.useState(row?.quantity?row.quantity:0);
    const [threshold, setThreshold] = React.useState(row?.threshold?row.threshold:0);

    const [_disabled, set_disabled] = React.useState(true)
    const [loading, setloading] = React.useState(false)
    const [edit, setEdit] = React.useState(false)

    const quantityHandler = (value)=>{
        setQuantity(value)
    }

    // const _isDisabled = ()=>{
    //     if(parseFloat(price)==parseFloat(row.price))
    //     set_disabled(true)
    //     else
    //     set_disabled(false)
    // }

    // React.useEffect(() => {
    //     _isDisabled()
    // }, [price]);

    const _persist = ()=>{
        setloading(true)
        axios.patch(`${uri.link}/storage/${row._id}`,
        {
            quantity:quantity,
            threshold:threshold
        },
        {
          headers:{'auth-token':`${getToken()}`}
        }).then( (response)=> {
              setloading(false);
              setEdit(false);
            })
            .catch(error =>{
              setloading(false);
              Swal.fire({
                title: 'Ops, an Error!',
                text: "An error appear while updating",
                icon: 'error',
                confirmButtonText: 'OK',
                backdrop: `
                    rgba(0,0,123,0.4)
                    url("/images/nyan-cat.gif")
                    left top
                    no-repeat
                  `
              })
            })
       
      }
    
  const _notify = ()=>{
    alert('notification')
  }

  const getImage_ = ()=>{
   let img=  row?.product?.media.map(file=>{
        if(file.type==='image')
        return file.link
        else
        return productPlaceHolder

    })
    return img
  }


  console.log('ZEBIIIIIIIIIII =======>',row)
    return (
        <TableRow key={row}>
                        <TableCell align='center' key={'ac1'} >
                        <Avatar alt="Travis Howard" src={getImage_()} variant='square' style={{height:'80px',width:'80px'}}/>

                        </TableCell>
                        <TableCell align='center'  key={'ac2'}>
                                {row?.product?.name?row.product.name:'-'}

                        </TableCell>
                        <TableCell align='center' key={'ac3'}>
                                {/* {row?.quantity?row.quantity:'-'} */}
                                <TextField value={quantity} onChange={(e)=>setQuantity(e.target.value)}  variant="outlined" size='small' style={{width:'100px'}} type='number' disabled={!edit}/>

                        </TableCell>
                        <TableCell align='center'  key={'ac4'}>
                            
                                <TextField value={threshold} onChange={(e)=>setThreshold(e.target.value)} variant="outlined" size='small' style={{width:'100px'}} type='number' disabled={!edit}/>

                        </TableCell>
                       
                    
                        <TableCell align='center' key={'ac6'}>
                        {
                                loading?
                                <CircularProgress  size={20} />

                                :
                                edit ?
                                <IconButton   onClick={_persist} size='small' >
                                  <SaveIcon  fontSize="small" />
                                </IconButton>
                                :
                                <IconButton  onClick={()=>setEdit(true)} size='small' >
                                  <EditIcon  fontSize="small" />
                              </IconButton>

                            }
                        </TableCell>
                        <TableCell align='center' key={'ac7'} >
                        {
                                loading?
                                <CircularProgress  size={20} />

                                :
                                // <Button variant="contained" size="small" disableElevation disabled={false} onClick={_persist}>notify</Button>
                                <motion.section  variants={row.quantity === row.threshold?svgVariants:null}  whileHover="hover" style={{cursor:'pointer',marginLeft:'auto',marginRight:'auto',width:'30%'}}>
                                    <IconButton onClick={_notify} size='small' disabled={row.quantity === row.threshold?false:true} >
                                      <NotificationsActiveIcon  fontSize="small" />
                                    </IconButton>
                                </motion.section>
                            }
                        </TableCell>
                      
                    </TableRow>
    )
}

export default CustomRow
