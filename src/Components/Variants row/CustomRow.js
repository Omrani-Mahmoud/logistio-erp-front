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
import Button from '@material-ui/core/Button';

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
                            <TextField id="price_text" label={lang.price} variant="outlined" defaultValue={price}  size='small' onChange={(e)=>{priceHandler(e.target.value)}} />
                             
                        </TableCell>

                        <TableCell align='center'>
                            <Button variant="contained" size="small" disableElevation disabled={_disabled} onClick={_persist}>{lang.save}</Button>
                    
                        </TableCell>
                    </TableRow>
    )
}

export default CustomRow
