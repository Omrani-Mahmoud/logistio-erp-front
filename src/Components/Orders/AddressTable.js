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
function AddressTable({adrs=[]}) {
    const classes = useStyles();


    // const filtredData = stocks.filter(row =>{
    //     try {
    //         return row.product.name.includes(searchInput)

    //     } catch (error) {
    //         throw new Error('Error appeared while filtring data')
    //     }
    // })
    return (
        <Grid item md={12} style={{marginTop:'5px',height:'385px',overflowY:'auto',marginBottom:'10px',padding:'5px'}}>
                
                {
                    adrs.length>0?
                    <TableContainer component={Paper} style={{background:'rgb(243,245,247)'}}>
                    <Table className={classes.table} aria-label="simple table" h>
                    <TableHead >
                        <TableRow>
                            <TableCell align='left' className={classes.header} >Address</TableCell>
                            <TableCell align='center' className={classes.header} >Country</TableCell>
                            <TableCell align='center' className={classes.header} >City </TableCell>
                            <TableCell align='center' className={classes.header} >ZIP code</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {adrs.map((row,index) => (
                                   <TableRow>
                                        <TableCell align='left'  >{row.address}</TableCell>
                                        <TableCell align='center'  >{row.country}</TableCell>
                                        <TableCell align='center'  >{row.city} </TableCell>
                                        <TableCell align='center'  >{row.zip_code}</TableCell>
                                    </TableRow>
                               
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                :

                <EmptyArrayHolder text="No Address here " />
                }
               
      </Grid>
    )
}

export default AddressTable
