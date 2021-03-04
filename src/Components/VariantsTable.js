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
import CustomRow from './Variants row/CustomRow';

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
function VariantsTable({variants,options,productId,fetch}) {
    const classes = useStyles();

 

    console.log('Variants =======>',variants)
    return (
        <Grid item md={10} style={{marginTop:'5px',height:'183px',overflowY:'auto'}}>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        {
                            options.map(elem=>{
                                if(elem.type==='option1')
                                return   <TableCell align='center' className={classes.header} >{elem.name}</TableCell>

                            })
                        }
                        {
                            options.map(elem=>{
                                if(elem.type==='option2')
                                return   <TableCell align='center' className={classes.header} >{elem.name}</TableCell>

                            })
                        }
                        {
                            options.map(elem=>{
                                if(elem.type==='option3')
                                return   <TableCell align='center' className={classes.header} >{elem.name}</TableCell>

                            })
                        }
                        {
                            options.length==1?
                            <>
                            <TableCell align='center' className={classes.header} >{'-'}</TableCell>
                            <TableCell align='center' className={classes.header} >{'-'}</TableCell>
                            </>
                            :
                            options.length==2?
                            <TableCell align='center' className={classes.header} >{'-'}</TableCell>
                            :
                            options.length==0?
                            <>
                            <TableCell align='center' className={classes.header} >{'-'}</TableCell>
                            <TableCell align='center' className={classes.header} >{'-'}</TableCell>
                            <TableCell align='center' className={classes.header} >{'-'}</TableCell>
                            </>
                            :
                            null
                        }
             
                        <TableCell align='center' className={classes.header} >{lang.quantity}</TableCell>
                        <TableCell align='center' className={classes.header} >{lang.price}</TableCell>

                        <TableCell align='center' className={classes.header} >Height</TableCell>
                        <TableCell align='center' className={classes.header} >Width</TableCell>
                        <TableCell align='center' className={classes.header} >Length</TableCell>
                        <TableCell align='center' className={classes.header} >volume</TableCell>
                        <TableCell align='center' className={classes.header} ></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {variants.map((row,index) => (
                        <CustomRow row={row} key={index} productId={productId} fetch={fetch} />
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
      </Grid>
    )
}

export default VariantsTable
