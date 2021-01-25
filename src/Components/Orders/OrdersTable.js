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
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import AttachmentsLink from '../AttachmentsLink';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CustomRow from './CustomRow';
import EmptyArrayHolder from '../EmptyArrayHolder'
import CustomModal from './CustomModal';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';

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
function OrdersTable({orders=[],fetch,handleDateChange,selectedDate}) {


    console.log('Orders------------->',orders)
    const classes = useStyles();
    const [searchInput, setsearchInput] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [fullfillment_mode, setfullfillment_mode] = React.useState('')

    console.log('MODE------------->',fullfillment_mode)

    const filtredData = orders.filter(row =>{
            if(fullfillment_mode==='' && searchInput.length>0 && status==='')
                return row?.shipping_infos[0]?.country.includes(searchInput)

            if(searchInput.length === 0 && fullfillment_mode!=='' && status==='' )
                return row.fulfillment_mode===fullfillment_mode
        
            if(searchInput.length === 0 && fullfillment_mode==='' && status!=='' )
                return row.status===status
            
            if(searchInput.length === 0 && fullfillment_mode!=='' && status!=='' )
                return row.status===status && row.fulfillment_mode===fullfillment_mode
            
            if(searchInput.length > 0 && fullfillment_mode!=='' && status==='' )
                return  row.fulfillment_mode===fullfillment_mode && row?.shipping_infos[0]?.country.includes(searchInput)
            
            if(searchInput.length > 0 && fullfillment_mode ==='' && status!=='' )
                return  row.status===fullfillment_mode && row?.shipping_infos[0]?.country.includes(searchInput)

            if(searchInput.length > 0 && fullfillment_mode!=='' && status!=='')
                return row.fulfillment_mode===fullfillment_mode && row?.shipping_infos[0]?.country.includes(searchInput) && row.status===status

            else
                return row
    })


    const handleChange = (e)=>{
        setfullfillment_mode(e.target.value)
    }
    const handleChangeStatus = (e)=>{
        setStatus(e.target.value)
    }
    return (
        <Grid item md={12} style={{marginTop:'5px',height:'485px',overflowY:'auto',marginBottom:'10px'}}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid style={{marginBottom:'10px'}}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
                            <TextField size='small' id="standard-basic" label='Country Name' style={{width:'300px',marginLeft:'5px',marginBottom:'20px'}} onChange={(e)=>setsearchInput(e.target.value)} />
                            <FormControl variant="outlined" size='small' style={{width:'250px',float:'right',marginTop:'7px'}}>
                                    <InputLabel id="demo-simple-select-outlined-label">Fullfillment Status</InputLabel>
                                            <Select
                                            
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={status}
                                            onChange={handleChangeStatus}
                                            label="Fullfillment Status">
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'unfulfilled'}>Unfulfilled</MenuItem>
                                                <MenuItem value={'fulfilled'}>Fulfilled</MenuItem>
                                            </Select>
                            </FormControl>
                            <FormControl variant="outlined" size='small' style={{width:'250px',float:'right',marginTop:'7px',marginRight:'20px'}}>
                                    <InputLabel id="demo-simple-select-outlined-label">Fullfillment Mode</InputLabel>
                                            <Select
                                            
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={fullfillment_mode}
                                            onChange={handleChange}
                                            label="Fullfillment mode">
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'fulfill_all'}>Fulfill All</MenuItem>
                                                <MenuItem value={'partially_fulfilled'}>partial fulfillment</MenuItem>
                                            </Select>
                            </FormControl>
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
                        {filtredData.map((row,index) => (
                                   <CustomRow row={row} fetch={fetch}/>
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
