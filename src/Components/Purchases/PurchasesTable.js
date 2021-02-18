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
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CustomRow from './CustomRow';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import EmptyArrayHolder from '../EmptyArrayHolder';


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
function PurchasesTable({purchases=[],fetch,selectedDate,handleDateChange}) {
    const classes = useStyles();
    return (
        <Grid item md={12} style={{marginTop:'5px',height:'183px',overflowY:'auto',marginBottom:'10px'}}>
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
        {
          purchases.length>0?
        
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell align='left' className={classes.header} >#ID</TableCell>
                        <TableCell align='center' className={classes.header} >{lang.submission_date}</TableCell>
                        <TableCell align='center' className={classes.header} >{lang.sku}</TableCell>
                        <TableCell align='center' className={classes.header} >{lang.client}</TableCell>
                        <TableCell align='center' className={classes.header} >{lang.status}</TableCell>
                        <TableCell align='center' className={classes.header} ></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {purchases.map((row,index) => (
                        <CustomRow row={row} key={row} />
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            :
            <EmptyArrayHolder text={lang.no_purchases} />
     
                    }
      </Grid>
    )
}

export default PurchasesTable
