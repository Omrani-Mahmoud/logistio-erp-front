// still in dev

import { Grid } from '@material-ui/core';
import React from 'react'

function Finance() {
    const [loading, setloading] = React.useState(false);
    const styleWhileLoading = {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        minHeight:'80vh'
      }
  
    return (
        <Grid item md={12} style={loading?styleWhileLoading:{marginTop:'10px'}}>

            hahahh fiannce
        </Grid>
    )
}

export default Finance
