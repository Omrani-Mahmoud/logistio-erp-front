import { Container, TextField,Button, Paper, Grid, Avatar } from '@material-ui/core'
import React from 'react'
import {ConnectedUser}  from '../../App'
import Loader from '../../Components/Loader'
import axios from 'axios'
import {uri} from "../../Url_base";
import { useLocation,useParams } from 'react-router-dom'
import CustomSnackbar from '../../Components/CustomSnackBar'
import logo from '../../Assets/img/Logistio logo.svg';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    avatar: {
      margin: theme.spacing(1),
      marginBottom: theme.spacing(5),
      width:200,
      height:50
    },
  }));
function Test() {
    const classes = useStyles();
    const context = React.useContext(ConnectedUser)
    const [password, setpassword] = React.useState('');
    const [status, setStatus] = React.useState('');
    const location = useLocation();
    const {id} = useParams();
    console.log('LOCATION------>',id)


const _reset = ()=>{
    axios.post(`${uri.link}/password_reset/${id}`, {
        password:password,
      }
      , 
        {
            headers:{'auth-token':`${id}`}
        }).then(function (res) {
        if(res.status===200){
            setStatus(200);
            console.log('RESTE RESPONSE -------->',res.data)
        }
            else
            setStatus('error')
      })
      .catch(function (error) {
          setStatus('error')
      });
}

    return (
        <div  style={{background:'rgb(243,245,247)',width:'100%',display:'flex',justifyContent:'center',height:'100vh',alignItems:'center'}}>
               {
                        status===200?
                        <CustomSnackbar  content='Password reseted !' type="success"/>
                        :
                        status==='error'?
                        <CustomSnackbar  content='Ops, link is invalid or expired!' type="error"/>
                        : null
                    }
                        <Grid item md = {6}>
                            <Paper elevation={0} style={{display:'flex',flexDirection:'column',padding:'15px',justifyContent:'space-around',alignItems:'center',height:'50vh'}} >
                                <Avatar className={classes.avatar} src={logo} variant='square' />
                                <TextField id="outlined-basic" label="New Password" variant="outlined" onChange={(e)=>setpassword(e.target.value)} fullWidth/>
                                <Button variant="contained" color="primary" onClick={_reset} fullWidth>
                                    Change password
                                </Button>
                            </Paper>
                        </Grid>
        </div>
    )
}

export default Test
