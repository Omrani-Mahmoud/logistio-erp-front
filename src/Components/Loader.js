import React from 'react'
import {motion} from 'framer-motion'
import  '../Assets/css/loader.css'
function Loader({size=10,color='black'}) {

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
            transition:{
                x:{
                    yoyo:Infinity,
                    duration:0.5
                },
                y:{
                    yoyo:Infinity,
                    duration:0.25,
                    ease:'easeOut'
                }
            }
        }
    }
    return (

        <motion.div style={loaderStyle} variants={loaderVariants} animate='animationOne' >
            
        </motion.div>
    )
}

export default Loader
