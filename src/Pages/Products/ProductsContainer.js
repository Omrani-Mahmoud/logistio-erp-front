import React from 'react'
import Products from './Products'

function ProductsContainer() {

const [open, setOpen] = React.useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

    return (
        <Products open={open} handleCloseModal={handleCloseModal} handleOpenModal={handleOpenModal} />
    )
}

export default ProductsContainer
