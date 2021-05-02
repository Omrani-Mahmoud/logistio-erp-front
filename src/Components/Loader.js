// custom loader

import React from 'react'
import {motion} from 'framer-motion'
import  '../Assets/css/loader.css'
function Loader({size=10,color='rgb(15,12,64)',text='Cracking Gemstone...'}) {

    const loaderStyle = {
        width: `${size}px`,
        height: `${size}px`,
        margin: '33px auto',
        borderRadius:' 50%',
       
        background: color,
      }
    
    const loaderVariants={
        animationOne:{
            x:[-20,20],
            y:[0,-30],
            boxShadow: ['4px 5px 5px #595953','0px 0px 0px #595953'],
            transition:{
                x:{
                    yoyo:Infinity,
                    duration:0.5
                },
                y:{
                    yoyo:Infinity,
                    duration:0.25,
                    ease:'easeOut'
                },
                boxShadow:{
                    yoyo:Infinity,
                    duration:0.5,
                }
            }
        }
    }
    return (

            <>
            <h4 style={{textAlign:'center',marginBottom:'-2px',fontWeight:'normal',color:'rgb(15,12,64)'}}>{text}</h4>
            <motion.div style={loaderStyle} variants={loaderVariants} animate='animationOne' >
            </motion.div>
            </>
        
    )
}

export default Loader
