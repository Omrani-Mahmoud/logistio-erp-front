// this component render the uri of each products passed to the modal 


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
import { Grid, Tooltip } from '@material-ui/core'

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
function UrlsTable({urls_array}) {
    const classes = useStyles();

    return (
        <Grid item md={6} style={{marginTop:'5px',height:'183px',overflowY:'auto'}}>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead >
                    <TableRow>
                    <TableCell className={classes.header} >{lang.link}</TableCell>
                    <TableCell className={classes.header} >{lang.action}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {urls_array.map((row,index) => (
                    <TableRow key={row}>
                        <TableCell>
                                {`${lang.link} ${index}`}
                        </TableCell>
                        <TableCell>
                        {/* <Tooltip title={lang.url_link_descr}> */}
                             <span style={{display:'flex',alignItems:'center',fontWeight:'BOLD'}}> URL :  
                              <Tooltip title={lang.url_link_descr}> 
                             <a target='_blank' href={row}> 
                             <LinkIcon color="primary" style={{marginLeft:'8px',marginTop:'3px'}} />
                             </a>
                             </Tooltip>
                             </span>
                        {/* </Tooltip> */}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
      </Grid>
    )
}

export default UrlsTable
