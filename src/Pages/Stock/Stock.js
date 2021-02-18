import { Button, CircularProgress, Container, InputLabel, Paper, TextField } from '@material-ui/core';
import React from 'react'
import StockTable from '../../Components/Stock/StockTable';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SaveIcon from '@material-ui/icons/Save';
import { motion } from "framer-motion"
import Autocomplete from '@material-ui/lab/Autocomplete';
import StockTableErrorHandler from '../../Error boundry/StockTableErrorHandler';
import axios from 'axios'
import {uri} from "../../Url_base";
import useToken from '../../Hooks/useToken';
import Swal from 'sweetalert2'
import Loader from '../../Components/Loader';
import VariantsArray from '../../Components/Stock/VariantsArray';

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`)
function Stock({stock,stockForm,dispatch,products,fetch,loadingStock,selected}) {
    const [setToken,getToken] = useToken();
    const [loading, setloading] = React.useState(false);

    const formStockVariant = {
        hidden:{
            opacity:0,
            scale:0,
        },
        visible:{
            opacity:1,
            scale:1,
        },

    }
    
    

    const [addButon, setaddButon] = React.useState(false)

    const handleAddBtn = ()=>{
        setaddButon(true)
    }

    const _persist = ()=>{
        // console.log('quantity:',quantity,'variant:',row)
        setloading(true)
        axios.post(`${uri.link}/storage/`,
        {
            product:stockForm.product_name,
            quantity:stockForm.quantity,
            threshold:stockForm.threshold
        },
        {
          headers:{'auth-token':`${getToken()}`}
        }).then( (response)=> {
              setloading(false);
              fetch(true);
              setaddButon(false)

            })
            .catch(error =>{
              setloading(false);
              Swal.fire({
                title: 'Ops, an Error!',
                text: "An error appear while updating",
                icon: 'error',
                confirmButtonText: 'OK',
                backdrop: `
                    rgba(0,0,123,0.4)
                    url("/images/nyan-cat.gif")
                    left top
                    no-repeat
                  `
              })
            })
       
      }

    return (
        <Container maxWidth="lg" style={{display:'flex',flexDirection:'column',overflowY:'auto',height:'86vh'}} >

            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{width:'160px',marginTop:'15px',display:addButon?'none':''}}
                startIcon={<AddCircleIcon />}
                onClick={handleAddBtn}
            >
       {lang.new_stock}
      </Button>
      <span style={{marginTop:'15px',padding:'10px',fontWeight:'bold',background:'#E9F4FD',borderRadius:'10px',fontSize:'13px',color:'rgb(43,84,116)'}}> ⚠️ {lang.storage_info}</span>

      {
          addButon  && 
      
            <motion.Paper variants={formStockVariant} initial='hidden' animate='visible'  elevation={3} style={{marginTop:'35px',marginBottom:'20px',background:'rgb(243,245,247',borderRadius:'15px',padding:'18px',flexDirection:'column',display:'flex',height:'400px'}} >
                   
                   <span style={{fontWeight:'bold',color:'#303030',opacity:'80%'}}>{lang.stock_form}</span>
                    <FormControl style={{width:'300px',marginBottom:'20px'}}>
                            {/* <InputLabel >Product Name</InputLabel>
                            <Select
                        
                            value={stockForm.product_name}
                            onChange={(e)=>{dispatch({type:'name',value:e.target.value})}}
                            >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select> */}
                             <Autocomplete
                                    id="combo-box-demo"
                                    options={products}
                                    getOptionLabel={(option) => option.sku}
                                    style={{ width: 300, marginTop:'10px' }}
                                    size='small'
                                    onChange={(e,v)=>{dispatch({type:'name',value:v?._id})}}
                                    renderInput={(params) => <TextField {...params} label={lang.product_sku} variant="standard"  />}
                                    
                                    />
                    </FormControl>

                    {/* <TextField label={lang.quantity}  type='number' style={{width:'300px', marginTop:'10px'}} onChange={(e)=>dispatch({type:'quantity',value:e.target.value})} />

                    <TextField label={lang.threshold}  type='number' style={{width:'300px', marginTop:'10px'}} onChange={(e)=>dispatch({type:'threshold',value:e.target.value})}/> */}
                        <VariantsArray variants={selected.variants} options={selected.options} productID={selected._id} />
                    {/* {
                        loading?
                       <Loader />
                        :
                        <motion.Button
                    
                    whileHover={{scale:1.1 }}
                            variant="contained"
                            
                            style={{marginTop:'15px'}}
                            startIcon={<SaveIcon />}
                            onClick={_persist}
                            style={{width:'300px',alignSelf:'center',background:'rgb(65,84,179)',border:'0px',borderRadius:'5px',height:'30px',marginTop:'15px',color:'white',cursor:'pointer',fontWeight:'bold'}}
                        >
                            {lang.save_it}
                    </motion.Button>
                    } */}
                    
            </motion.Paper>
            }
            <Paper elevation={3} style={{marginTop:'15px',height:'400px',marginBottom:'30px',background:'rgb(243,245,247',borderRadius:'15px',padding:'10px',display:'flex',flexDirection:'column',justifyContent:loadingStock?'center':null}}>

                {
                    loadingStock?
                    <Loader />
                    :
                    <StockTableErrorHandler>
                        <StockTable stocks={stock} />
                    </StockTableErrorHandler>
                }
                
            </Paper>
        </Container>

    )
}

export default Stock





// {
//     loading?
//          <Loader />
//      :
     
// }