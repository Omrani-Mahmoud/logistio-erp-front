// Orders component
// render the OrdersTable
// OrdersTbale accept modal handler and orders data
// each order got a specifique modal
// each modal got an single order as props 



import { Container, Paper } from '@material-ui/core'
import React from 'react'
import OrdersTable from '../../Components/Orders/OrdersTable'
import CustomSnackBar from '../../Components/CustomSnackBar'
import Loader from '../../Components/Loader'
function Orders({orders,fetch,loading,handleDateChange,selectedDate,setmodalIsOpen}) {

    return (
        <Container maxWidth="lg" style={{display:'flex',flexDirection:'column',overflowY:'auto',height:'100%'}} >

            <Paper elevation={3} style={{marginTop:'15px',height:'77vh',marginBottom:'30px',background:'rgb(243,245,247',borderRadius:'15px',padding:'10px',display:'flex',flexDirection:'column',justifyContent:loading?'center':null}}>
                {
                    loading?
                    <Loader />
                    :
                    <OrdersTable setmodalIsOpen={setmodalIsOpen} orders={orders} fetch={fetch} handleDateChange={handleDateChange} selectedDate={selectedDate} />
                }
            </Paper>
        </Container>
    )
}

export default Orders
