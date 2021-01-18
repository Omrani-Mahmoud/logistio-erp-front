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
import { Grid, TextField } from '@material-ui/core'
import AttachmentsLink from '../AttachmentsLink';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CustomRow from './CustomRow';
import EmptyArrayHolder from '../EmptyArrayHolder'
import CustomModal from './CustomModal';
const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`)

const useStyles = makeStyles({
    table: {
      minWidth: 350,
    },
    header:{
        fontWeight:'bold'
    }
  });
function OrdersTable({orders=[],fetch}) {


    console.log('Orders------------->',orders)
    const classes = useStyles();
    const [searchInput, setsearchInput] = React.useState('')

    // const filtredData = stocks.filter(row =>{
    //     try {
    //         return row.product.name.includes(searchInput)

    //     } catch (error) {
    //         throw new Error('Error appeared while filtring data')
    //     }
    // })
    return (
        <Grid item md={12} style={{marginTop:'5px',height:'385px',overflowY:'auto',marginBottom:'10px'}}>
                            <TextField id="standard-basic" label='Filter here' style={{width:'300px',marginLeft:'5px',marginBottom:'20px'}} onChange={(e)=>setsearchInput(e.target.value)} />
                
                {
                    orders.length>0?
                    <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table" h>
                    <TableHead >
                        <TableRow>
                            <TableCell align='left' className={classes.header} >{lang.shipping_adr}</TableCell>
                            <TableCell align='center' className={classes.header} >{lang.client_name}</TableCell>
                            <TableCell align='center' className={classes.header} >{lang.country} </TableCell>
                            <TableCell align='center' className={classes.header} >{lang.status}</TableCell>
                            <TableCell align='center' className={classes.header} >{lang.fullfillment_mode}</TableCell>
                            <TableCell align='center' className={classes.header} >{lang.items_number}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((row,index) => (
                                   <CustomRow row={row} />
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                :

                <EmptyArrayHolder text="No orders here " />
                }
               
      </Grid>
    )
}

export default OrdersTable
