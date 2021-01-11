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
import { Button, Grid, TextField } from '@material-ui/core'
import AttachmentsLink from '../AttachmentsLink';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`)


function CustomRow({row}) {

    const [price, setPrice] = React.useState(row?.price?row.price:0);
    const [_disabled, set_disabled] = React.useState(true)

    const priceHandler = (value)=>{
        setPrice(value)
    }

    const _isDisabled = ()=>{
        if(parseFloat(price)==parseFloat(row.price))
        set_disabled(true)
        else
        set_disabled(false)
    }

    React.useEffect(() => {
        _isDisabled()
    }, [price]);

    const _persist = ()=>{
        console.log('price:',price,'variant:',row)
    }

    return (
        <TableRow key={row}>
                        <TableCell align='center' key={'ac1'} >
                                {row?.name?row.name:'-'}
                        </TableCell>
                        <TableCell align='center'  key={'ac2'}>
                                
                                <TextareaAutosize defaultValue={row?.description?row.description:'-'} disabled placeholder="Description" />
                        </TableCell>
                        <TableCell align='center' key={'ac3'}>
                                {row?.quantity?row.quantity:'-'}
                        </TableCell>
                        <TableCell align='center' style={{display:'flex',width:'160px',flexWrap:'wrap'}} key={'ac4'}>
                                {row?.attachments?row.attachments.map(elem =>{
                                    return <AttachmentsLink link={elem} key={elem} />
                                })
                                :
                                '-'
                                
                            
                            }
                        </TableCell>
                        <TableCell align='center' key={'ac5'}>
                            <TextField id="price_text" label={lang.price} variant="outlined" defaultValue={price}  size='small' onChange={(e)=>{priceHandler(e.target.value)}}/>
                        </TableCell>
                    
                        <TableCell align='center' key={'ac6'}>
                            <Button variant="contained" size="small" disableElevation disabled={_disabled} onClick={_persist}>{lang.save}</Button>
                        </TableCell>

                      
                    </TableRow>
    )
}

export default CustomRow
