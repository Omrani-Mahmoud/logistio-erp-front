import React from 'react'
import { Container, Paper } from '@material-ui/core'
import Loader from '../../Components/Loader'
import PurchasesTable from '../../Components/Purchases/PurchasesTable'

function Purchases({data,loading,selectedDate,handleDateChange}) {
    return (
        <Container maxWidth="lg" style={{display:'flex',flexDirection:'column',overflowY:'auto',height:'100%'}} >

        <Paper elevation={3} style={{marginTop:'15px',height:'77vh',marginBottom:'30px',background:'rgb(243,245,247',borderRadius:'15px',padding:'10px',display:'flex',flexDirection:'column',justifyContent:loading?'center':null}}>
            {
                loading?
                <Loader />
                :
                <PurchasesTable  purchases={data}  />

}
        </Paper>
    </Container>
    )
}

export default Purchases
