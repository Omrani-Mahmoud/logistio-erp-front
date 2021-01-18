import { Container, Paper } from '@material-ui/core'
import React from 'react'
import OrdersTable from '../../Components/Orders/OrdersTable'

function Orders({orders,fetch}) {
    return (
        <Container maxWidth="lg" style={{display:'flex',flexDirection:'column',overflowY:'auto',height:'100%'}} >

            <Paper elevation={3} style={{marginTop:'15px',height:'65vh',marginBottom:'30px',background:'rgb(243,245,247',borderRadius:'15px',padding:'10px',display:'flex',flexDirection:'column'}}>

                   <OrdersTable orders={orders} />
            </Paper>
        </Container>
    )
}

export default Orders
