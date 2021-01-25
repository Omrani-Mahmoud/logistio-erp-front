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
function StockTable({stocks=[],fetch}) {


    console.log('STOCKS------------->',stocks)
    const classes = useStyles();
    const [searchInput, setsearchInput] = React.useState('')
    const filtredData = stocks.filter(row =>{
        try {
            return row.product.name.includes(searchInput)

        } catch (error) {
            throw new Error('Error appeared while filtring data')
        }
    })


    console.log('STOCK TABLE -----> ',stocks)
    return (
        <Grid item md={12} style={{marginTop:'5px',height:'385px',overflowY:'auto',marginBottom:'10px'}}>
                            <TextField id="standard-basic"  label={lang.search_by_name} style={{width:'300px',marginLeft:'5px',marginBottom:'20px'}} onChange={(e)=>setsearchInput(e.target.value)} />
                
                {
                    filtredData.length>0?
                    <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            <TableCell align='left' className={classes.header} >{lang.product_img}</TableCell>
                            <TableCell align='center' className={classes.header} >{lang.product_name}</TableCell>
                            <TableCell align='center' className={classes.header} >{lang.quantity}</TableCell>
                            <TableCell align='center' className={classes.header} >{lang.threshold}</TableCell>
                            <TableCell align='center' className={classes.header} >{lang.edit}</TableCell>
                            <TableCell align='center' className={classes.header} >{lang.notify}</TableCell>
    
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtredData.map((row,index) => (
                            <CustomRow row={row} key={row}  fetch={fetch} />
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                :

                <EmptyArrayHolder text={lang.no_products} />
                }
               
      </Grid>
    )
}

export default StockTable
