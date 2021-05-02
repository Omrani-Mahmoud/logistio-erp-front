
// products container
// fetch the products here
// the modal handlers is here too

import React from 'react'
import Products from './Products'
import {motion} from 'framer-motion'

function ProductsContainer() {
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
          <Products open={open} handleCloseModal={handleCloseModal} handleOpenModal={handleOpenModal} />
      </motion.div>
    )
}

export default ProductsContainer
