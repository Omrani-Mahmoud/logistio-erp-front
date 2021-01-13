import { Avatar, Grid } from '@material-ui/core'
import React, { Component } from 'react'
 import erroImg from '../Assets/img/error.gif'
 import { makeStyles } from '@material-ui/core/styles';
 import { motion } from "framer-motion"

export default class ProductCardErrorHandler extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            hasError:false
        }
    }
    
    static getDerivedStateFromError(error){
        return {
            hasError:true
        }
    }
    render() {
       if(this.state.hasError){
           return <motion.Grid animate={{scale:1}} initial={{scale:0}} style={{height:'258px',width:'230px',display:'flex',flexDirection:'column-reverse',justifyContent:'center',alignItems:'center',border:'2px solid rgb(243,245,247)',borderRadius:'15px',marginTop:'10px',}}>
                        <span style={{fontWeight:'bold',color:'#303030'}}>An errror in this product</span>
                        <Avatar alt={'haha'} src={erroImg}  variant='circle'  style={{width:'200px',height:'200px'}} />

                    </motion.Grid>
       }
       
           return this.props.children
       
    }
}
