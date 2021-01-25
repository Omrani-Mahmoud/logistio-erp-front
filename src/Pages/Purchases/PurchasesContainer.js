import React from 'react'
import axios from 'axios'
import {uri} from '../../Url_base'
import useToken from '../../Hooks/useToken'
import Purchases from './Purchases'
import {motion} from 'framer-motion'
function PurchasesContainer() {
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
    const [purchases, setPurchases] = React.useState([])
     const [loading, setLoading] = React.useState(false)
     const [setToken,getToken] = useToken();

     const [selectedDate, setSelectedDate] = React.useState(new Date());
    
     const handleDateChange = (date) => {
         setSelectedDate(date);
       };
    const _fetch = (mounted)=>{
        setLoading(true);
        console.log('REFETCH HERE ------>')
        axios.get(`${uri.link}/purchases/`,{
            headers:{'auth-token':`${getToken()}`}
        })
           .then(function (response) {
               setLoading(false)
               if(mounted){
                    console.log('PURCHASES DATA',response.data)
                    setPurchases(response.data)
               }
           })
           .catch(function (error) {
               // handle error
               setLoading(false)
               console.log(error);
           });
    }


    const fake = [
        {
            _id:'PP1',
            date:'12/3/1200',
            sku:'p1_r',
            quantity:40,
            client:{first_name:'mahmoud',last_name:'omrani'},
            status:'Pending'
        },
        {
            _id:'PP1',
            date:'12/3/1200',
            sku:'p1_r',
            quantity:40,
            client:{first_name:'mahmoud',last_name:'omrani'},
            status:'Pending'
        },
        {
            _id:'PP1',
            date:'12/3/1200',
            sku:'p1_r',
            quantity:40,
            client:{first_name:'mahmoud',last_name:'omrani'},
            status:'Pending'
        },
        {
            _id:'PP1',
            date:'12/3/1200',
            sku:'p1_r',
            quantity:40,
            client:{first_name:'mahmoud',last_name:'omrani'},
            status:'Pending'
        }
    ]

    // React.useEffect(() => {
    //     console.log('HERE FETCH PURCHASES')
    //     let mounted = true;
    //         _fetch(mounted)
    //    return ()=>{
    //        mounted=false
    //    }
    // }, [])

    return (
        <motion.div variants={contentVariant} initial='hidden' animate='visible'>
            <Purchases data = {fake} loading={loading} handleDateChange={handleDateChange} selectedDate={selectedDate}/>
        </motion.div>
    )
}

export default PurchasesContainer
