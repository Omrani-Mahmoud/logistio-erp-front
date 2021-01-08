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
import AttachmentsLink from './AttachmentsLink';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

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
function AccessoriesTable({accessories=[]}) {
    const classes = useStyles();
    return (
        <Grid item md={12} style={{marginTop:'5px',height:'183px',overflowY:'auto',marginBottom:'10px'}}>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell align='center' className={classes.header} >{lang.name}</TableCell>
                        <TableCell align='center' className={classes.header} >{lang.description}</TableCell>
                        <TableCell align='center' className={classes.header} >{lang.quantity}</TableCell>
                        <TableCell align='left' className={classes.header} >{lang.attachments}</TableCell>
                        <TableCell align='left' className={classes.header} >{lang.price}</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {accessories.map((row,index) => (
                    <TableRow key={index}>
                        <TableCell align='center'  >
                                {row?.name?row.name:'-'}
                        </TableCell>
                        <TableCell align='center' >
                                
                                <TextareaAutosize defaultValue={row?.description?row.description:'-'} placeholder="Description" />
                        </TableCell>
                        <TableCell align='center'>
                                {row?.quantity?row.quantity:'-'}
                        </TableCell>
                        <TableCell align='center' style={{display:'flex',width:'160px',flexWrap:'wrap'}}>
                                {row?.attachments?row.attachments.map(elem =>{
                                    return <AttachmentsLink link={elem} />
                                })
                                :
                                '-'
                                
                            
                            }
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

export default AccessoriesTable
