// old display methode ( simple array instead teh cards)
// display products data 
// just a simple duisplay but every row got a a handlfer to open the modal
import React from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Avatar, Grid } from '@material-ui/core';
import CustomModal from './CustomModal';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import EmptyArrayHolder from '../../Components/EmptyArrayHolder';

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`)

const useStyles = makeStyles((theme)=>({
    table: {
      minWidth: 650,
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
  }));
function ProductsTable({rows,open,handleOpenModal,handleCloseModal,filter,handleDateChange,currentDate}) {
    const classes = useStyles();
    const [searchValue, setsearchValue] = React.useState('');




    
    let data = [];
         data= rows.filter((elem)=>{
            if(filter==='all') 
            return elem
            else
            return elem.type===filter
        })
    
        const filter_ =(value)=>{
            let filtred = data;
            
            if(searchValue?.length>0){
                filtred = data.filter(elem=>{
                    return elem.sku.includes(searchValue)
            })}
            else {
                filtred = data        
            }
            return filtred
        }
    return (
        <>
        {
            data.length>0?
            <>
          
                    <FormControl style={{margin:'10px'}}>
                        <InputLabel htmlFor="input-with-icon-adornment" >{lang.search_by_sku}</InputLabel>
                        <Input
                        onChange={(e)=>setsearchValue(e.target.value)}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                        }/>
                    </FormControl>
               
        <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>{lang.product_img}</TableCell>
                    <TableCell >{lang.product_name}</TableCell>
                    <TableCell >{lang.sku}</TableCell>
                    <TableCell >{lang.variants_number}</TableCell>
                    <TableCell >{lang.type}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filter_().map((row) => (
                    <TableRow key={row.name} hover onClick={handleOpenModal}>
                        <TableCell component="th" scope="row">
                            <Avatar alt={row.name} src={row.img}  variant="square" className={classes.large} />

                        
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell >{row.sku}</TableCell>
                        <TableCell >{row.variants.length}</TableCell>
                        <TableCell >{row.type}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <CustomModal open={open}  handleClose={handleCloseModal}  product={rows[0]} />
            </>
            :
            <EmptyArrayHolder text={lang.no_products} />
        }
         
            </>
    )
}

export default ProductsTable
