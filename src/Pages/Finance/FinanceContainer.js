// still in dev


import React from 'react'
import {motion} from 'framer-motion'
import Finance from './Finance';

function FinanceContainer() {
    
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
    const [open, setOpen] = React.useState(false);
      const handleOpenModal = () => {
        setOpen(true);
      };
    
      const handleCloseModal = () => {
        setOpen(false);
      };
    
        return (
          <motion.div variants={contentVariant} initial='hidden' animate='visible'>
              <Finance />
          </motion.div>
        )
}

export default FinanceContainer
