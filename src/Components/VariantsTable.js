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

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../Language/${lngc}.json`)

const useStyles = makeStyles({
    table: {
      minWidth: 350,
    },
    header:{
        fontWeight:'bold'
    }
  });
function VariantsTable({variants}) {
    const classes = useStyles();

    console.log('VARIANTS :::',variants)
    return (
        <Grid item md={10} style={{marginTop:'5px',height:'183px',overflowY:'auto'}}>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell align='center' className={classes.header} >{`${lang.option} 1`}</TableCell>
                        <TableCell align='center' className={classes.header} >{`${lang.option} 2`}</TableCell>
                        <TableCell align='center' className={classes.header} >{`${lang.option} 3`}</TableCell>
                        <TableCell align='center' className={classes.header} >{lang.quantity}</TableCell>
                        <TableCell align='center' className={classes.header} >{lang.price}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {variants.map((row,index) => (
                    <TableRow key={index}>
                        <TableCell align='center' >
                                {row?.option1?row.option1:'-'}
                        </TableCell>
                        <TableCell align='center'>
                                {row?.option2?row.option2:'-'}
                        </TableCell>
                        <TableCell align='center'>
                                {row?.option3?row.option3:'-'}
                        </TableCell>
                        <TableCell align='center'>
                                {row?.quantity?row?.quantity:'-'}
                        </TableCell>
                        <TableCell align='center'>
                            <TextField id="price_text" label={lang.price} variant="outlined" defaultValue={row?.price?row.price:0}  size='small'/>
                             
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
      </Grid>
    )
}

export default VariantsTable
