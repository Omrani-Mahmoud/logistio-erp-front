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
import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField } from '@material-ui/core'
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
function OrdersTable({orders=[],fetch,handleDateChange,selectedDate,setmodalIsOpen}) {


    console.log('Orders------------->',orders)
    const classes = useStyles();
    const [searchInput, setsearchInput] = React.useState('');
    const [countryInput, setcountryInput] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [fullfillment_mode, setfullfillment_mode] = React.useState('');
    const [isReship, setisReship] = React.useState(false)

    console.log('MODE------------->',fullfillment_mode)

    let filtredData = orders.filter(row =>{
            if(fullfillment_mode==='' && searchInput.length>0 && status==='')
                return row?.order_id.includes(searchInput)

            if(fullfillment_mode==='' && searchInput.length=== 0 && countryInput.length>0 && status==='')
                return row?.shipping_infos[0].country.includes(countryInput)





            if(countryInput.length===0 && searchInput.length === 0 && fullfillment_mode!=='' && status==='' )
                return row.fulfillment_mode===fullfillment_mode
        
            if(countryInput.length===0 && searchInput.length === 0 && fullfillment_mode==='' && status!=='' )
                return row.status===status
            
            if( countryInput.length===0 && searchInput.length === 0 && fullfillment_mode!=='' && status!=='' )
                return row.status===status && row.fulfillment_mode===fullfillment_mode
            
            if(countryInput.length===0 && searchInput.length > 0 && fullfillment_mode!=='' && status==='' )
                return  row.fulfillment_mode===fullfillment_mode && row?.order_id.includes(searchInput)

            if(countryInput.length>0 && searchInput.length === 0 && fullfillment_mode!=='' && status==='' )
                return  row.fulfillment_mode===fullfillment_mode && row?.shipping_infos[0].country.includes(countryInput)
                



            
            if(countryInput.length===0 && searchInput.length > 0 && fullfillment_mode ==='' && status!=='' )
                return  row.status===fullfillment_mode && row?.order_id.includes(searchInput)
            if(countryInput.length>0 && searchInput.length ===0 && searchInput.length === 0 && fullfillment_mode ==='' && status!=='' )
                return  row.status===fullfillment_mode && row?.shipping_infos[0].country.includes(countryInput)



            if(countryInput.length===0 && searchInput.length > 0 && fullfillment_mode!=='' && status!=='')
                return row.fulfillment_mode===fullfillment_mode && row?.order_id.includes(searchInput) && row.status===status
            
                if(countryInput.length>0 && searchInput.length > 0 && fullfillment_mode!=='' && status!=='')
                return row.fulfillment_mode===fullfillment_mode && row?.order_id.includes(searchInput) && row.status===status && row?.shipping_infos[0].country.includes(countryInput)

            else
                return row
    })


    console.log('filtred data here ======>',filtredData)


    const handleChange = (e)=>{
        setfullfillment_mode(e.target.value)
    }
    const handleChangeStatus = (e)=>{
        setStatus(e.target.value)
    }

  const handleChangeIsReship = (event) => {
    setisReship(event.target.checked);
  };
    return (
        <Grid item md={12} style={{marginTop:'5px',height:'485px',overflowY:'auto',marginBottom:'10px'}}>
                <FormControlLabel
                    control={<Switch size="small" color='primary' checked={isReship} onChange={handleChangeIsReship}   name="checkedReship" />}
                    label="Re-ship Orders"
                    style={{padding:'15px'}}
                />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid style={{marginBottom:'10px'}}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label={lang.date}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
                            <TextField size='small' id="standard-basic" label={lang.order_id} style={{width:'180px',marginLeft:'5px',marginBottom:'20px'}} onChange={(e)=>setsearchInput(e.target.value)} />
                            <TextField size='small' id="standard-basic" label={lang.country} style={{width:'180px',marginLeft:'35px',marginBottom:'20px'}} onChange={(e)=>setcountryInput(e.target.value)} />
                            <section style={{ background:'white',borderRadius:'7px',padding:'10px',fontSize:'15px',display:'flex',flexDirection:'column',justifyContent:'space-around',marginBottom:'20px',marginTop:'20px'}}>
                            <h3 style={{color:'rgb(36,37,77)'}}>{lang.orders_per_shipping_line}:</h3>
                            <div style={{display:'flex', justifyContent:'space-around',marginBottom:'20px',marginTop:'5px'}}>
                                <span><b>4PX</b> (0)</span>
                                <span><b>CK1</b> (0)</span>
                                <span><b>YUNEXPRESS</b> (0)</span>
                                <span><b>YINTONGGUAN</b> (0)</span>
                                <span><b>GDWSE</b> (0)</span>
                            </div>
                            </section>




                            <FormControl variant="outlined" size='small' style={{width:'250px',float:'right',marginTop:'7px',marginBottom:'15px'}}>
                                    <InputLabel id="demo-simple-select-outlined-label">{lang.fullfillment_status}</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={status}
                                            onChange={handleChangeStatus}
                                            label="Fullfillment Status">
                                                <MenuItem value="">
                                                    <em>{lang.none}</em>
                                                </MenuItem>
                                                <MenuItem value={'unfulfilled'}>{lang.unfulfilled}</MenuItem>
                                                <MenuItem value={'fulfilled'}>{lang.fulfilled}</MenuItem>
                                            </Select>
                            </FormControl>
                            <FormControl variant="outlined" size='small' style={{width:'250px',float:'right',marginTop:'7px',marginRight:'20px'}}>
                                    <InputLabel id="demo-simple-select-outlined-label">{lang.fullfillment_mode}</InputLabel>
                                            <Select
                                            
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={fullfillment_mode}
                                            onChange={handleChange}
                                            label="Fullfillment mode">
                                                <MenuItem value="">
                                                    <em>{lang.none}</em>
                                                </MenuItem>
                                                <MenuItem value={'fulfill_all'}>{lang.fulfill_all}</MenuItem>
                                                <MenuItem value={'partially_fulfilled'}>{lang.partial_fulfill}</MenuItem>
                                            </Select>
                            </FormControl>
                {
                    orders.length>0?
                    <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table" h>
                    <TableHead >
                        <TableRow>
                            <TableCell align='left' className={classes.header} >#ID</TableCell>
                           
                            <TableCell align='center' className={classes.header} >{lang.client_name}</TableCell>
                            <TableCell align='center' className={classes.header} >{lang.country} </TableCell>
                            <TableCell align='center' className={classes.header} >{lang.status}</TableCell>
                            <TableCell align='center' className={classes.header} >{lang.fullfillment_mode}</TableCell>
                            <TableCell align='center' className={classes.header} >{lang.items_number}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtredData.map((row,index) => (
                                  
                                      row.reship_media?.length>0 && isReship &&  
                                            <CustomRow setmodalIsOpen={setmodalIsOpen} row={row} fetch={fetch} reship/>

                                    // row.reship_media?.length===0 && !isReship &&  
                                    //         <CustomRow row={row} fetch={fetch}/>
                        ))}
                        {filtredData.map((row,index) => (
                                row.reship_media?.length===0 || !row.reship_media && !isReship &&  
                                        <CustomRow setmodalIsOpen={setmodalIsOpen} row={row} fetch={fetch}/>
                    ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                :

                <EmptyArrayHolder text={lang.no_orders} />
                }
               
      </Grid>
    )
}

export default OrdersTable
