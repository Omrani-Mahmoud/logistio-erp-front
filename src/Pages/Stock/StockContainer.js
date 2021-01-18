import React from 'react'
import Stock from './Stock'
import axios from 'axios'
import {uri} from "../../Url_base";
import useToken from '../../Hooks/useToken';
import {motion} from 'framer-motion'
const initStockValue = {
    product_name:'',
    quantity:0,
    threshold:0
}

const reducer = (state,action)=>{
    switch (action.type) {
        case 'name':
            return { ...state,product_name:action.value }

        case 'quantity':
            return {...state,quantity:action.value}
        
        case 'threshold':
            return {...state,threshold:action.value}
    }
}
function StockContainer() {
    
    const contentVariant = {
        hidden:{
            scale:0,
        },
        visible:{
            scale:1,
            transition:{
                type:'tween',
                duration:0.4,  
            }
        },   
    }

    const [setToken,getToken] = useToken();
    const [stock, setstock] = React.useState([]);
    const [bulkProducts, setBulkProducts] = React.useState([]);

    const [stockForm, dispatch] =React.useReducer(reducer, initStockValue)


const getStock = (mounted)=>{
    axios.get(`${uri.link}/storage/`,{
        headers:{'auth-token':`${getToken()}`}
    })
       .then(function (response) {
           if(mounted){
                setstock(response.data)
           }
       })
       .catch(function (error) {
           // handle error
           console.log(error);
       });
}

const getBulkProducts = (mounted)=>{
    axios.get(`${uri.link}/products/by_type/bulk`,{
        headers:{'auth-token':`${getToken()}`}
    })
       .then(function (response) {
           if(mounted){
                setBulkProducts(response.data)
           }
       })
       .catch(function (error) {
           // handle error
           console.log(error);
       });
}


    React.useEffect(() => {
        console.log('HERE FETCH STOCK')
        let mounted = true;
            getStock(mounted)
       return ()=>{
           mounted=false
       }
    }, [])
    React.useEffect(() => {
        let mounted = true;
        getBulkProducts(mounted)
       return ()=>{
           mounted=false
       }
    }, [])


    console.log('STOCK',stock)

    return (
        
        <motion.div variants={contentVariant} initial='hidden' animate='visible'>
            <Stock stock={stock} stockForm={stockForm} dispatch={dispatch} products={bulkProducts} fetch={getStock}  />
        </motion.div>
    )
}

export default StockContainer
