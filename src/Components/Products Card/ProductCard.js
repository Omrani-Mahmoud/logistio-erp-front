import { Grid } from '@material-ui/core'
import React from 'react'
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomModal from '../../Pages/Products/CustomModal';
import { motion } from "framer-motion"
import axios from 'axios'
import {uri} from '../../Url_base'
import Swal from 'sweetalert2'
import useToken from '../../Hooks/useToken';
import Flag from './Flag';
import productPlaceHolder from '../../Assets/img/productPlaceHolder.png'
const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`)

const useStyles = makeStyles((theme)=>({
    table: {
      minWidth: 650,
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
      },
  }));

function ProductCard({rows,filter,row,products,fetch}) {


    const cardVariant = {
        display:{scale:1},
        hidden:{scale:0},
        exit:{
            scale:0
        }
    }
    const [setToken,getToken] = useToken();

 
        Object.keys(row).map(key=>{
             if(typeof row[key] == 'undefined'){
                throw new Error(' SOME OBJECT KEYS ARE NULL  OR UNDEFINED')
                }
        })
    
    const classes = useStyles();
    const [mouseIn, setMouseIn] = React.useState(false)
    const style={
        filter: !mouseIn?'drop-shadow(-10px 5px 3px rgba(36, 35, 35,0.3))':'drop-shadow(0 0 0.75rem rgba(36, 35, 35,0.3)',
        marginBottom:'7px',
        transition: '1s'
    }


    const [open, setOpen] = React.useState(false);

        const handleOpenModal = () => {
            _updateStatus();
            setOpen(true);
        };

        const handleCloseModal = () => {
            setOpen(false);
        };


        const _updateStatus = ()=>{
            if(row.status==='pending' && row.price_control.is_accepted===1){
            axios.patch(`${uri.link}/products/${row._id}`,{
                status:'processing'
            },{
              headers:{'auth-token':`${getToken()}`}
            }).then( (response)=> {
                //   setloading(false);
                   fetch();
                })
                .catch(error =>{
                //   setloading(false);
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
        }

        const getImage_ = ()=>{
            let img=  row?.media.map(file=>{
                 if(file.type==='image')
                 return file.link
                 else
                 return productPlaceHolder
         
             })
             return img[0]
           };
           const getImages_ = ()=>{
               let res = [];
                 row?.media.map(file=>{
                 if(file.type==='image')
                 res.push(file.link)
                 else
                 res.push(productPlaceHolder)
             })
             return res
           }
    return (
     <>
       <motion.Grid variants={cardVariant} animate='display' initial='hidden'  item sm={12} style={{
            marginRight:'10px',
            marginTop:'10px',
            background:'rgb(243,245,247)',
            padding:'6px',
            borderRadius:'15px',
            height:'245px',
            width:'250px', // add to the sacle animation stay fix ( remoed md props )
            display:'flex',
            justifyContent:'space-around',
            cursor:'pointer',

       flexDirection:'column'}}  onMouseEnter={()=>setMouseIn(true)} onMouseLeave={()=>setMouseIn(false)} onClick={handleOpenModal} >
            <Flag  status={row.status}/>
            <section style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <Avatar style={style} alt={'haha'} src={getImage_()}  variant="square" className={classes.large} />
                <span style={{color:'#303030',fontWeight:'bold',textTransform:'capitalize',textAlign:'center'}}>{row.name}</span>
                <span  style={{color:'#303030',opacity:'50%',textOverflow:'ellipsis',overflow:'hidden',display:'block',width:'70%',textAlign:'center'}}>{row.sku}</span>
                {/* <span  style={{color:row.price_control.is_accepted?'rgb(57,202,73)':'rgb(253,106,98)',borderRadius:'5px',textOverflow:'ellipsis',overflow:'hidden',display:'block',width:'70%',textAlign:'center',background:'white'}}>{row.price_control.is_accepted?lang.accepted:lang.refused}</span> */}

            </section>
            <section style={{paddingLeft:'5px',paddingRight:'5px'}}>
                <span style={{textTransform:'capitalize',color:'#303030',fontWeight:'bold'}}>{row.type_shopping}</span>
                <span style={{textTransform:'capitalize',float:'right',color:'#303030',fontWeight:'bold'}}>{row.category.name}</span>

                </section>

       </motion.Grid>
                       <CustomModal fetch={fetch} open={open}  handleClose={handleCloseModal}  product={row} img={getImage_} imgs={getImages_} />
</>
    )
}

export default ProductCard
