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
const lang = require(`../../Language/${lngc}.json`)

const useStyles = makeStyles({
    table: {
      minWidth: 350,
    },
    header:{
        fontWeight:'bold'
    }
  });
function Variants({variants=[],options=[]}) {
    const classes = useStyles();



    console.log('OPTIONS::::::',options.reverse())

    console.log('VARIANTS::::::',variants)
    return (
        // <Grid item md={10} style={{marginTop:'5px',height:'183px',overflowY:'auto'}}>
                <TableContainer component={Paper} style={{background:'rgb(243,245,247)',width:'100%'}}>
                <Table aria-label="simple table">
                <TableHead >
                    <TableRow>
                    <TableCell align='left' className={classes.header} >#ID</TableCell>
                        
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


                    </TableRow>
                </TableHead>
                <TableBody>
                        {
                            variants.map(row=>{
                               return   <TableRow>
                                            <TableCell>
                                                {row?.vid?row?.vid:'-'} 
                                            </TableCell>

                                            <TableCell align='center'>
                                                {row.option1?row.option1:'-'} 
                                            </TableCell>

                                            <TableCell align='center'>
                                                {row.option2?row.option2:'-'} 
                                            </TableCell>

                                            <TableCell align='center'>
                                                {row.option3?row.option3:'-'} 
                                            </TableCell>

                                            <TableCell align='center'>
                                                {row.quantity?row.quantity:'-'} 
                                            </TableCell>
                                         </TableRow>
                            })
                        }
                </TableBody>
                </Table>
            </TableContainer>
    //   </Grid>
    )
}

export default Variants
