import { Container, Paper, TextField, Button, Grid, Avatar } from '@material-ui/core'
import React from 'react'
import {ConnectedUser}  from '../../App'
import {motion} from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles';
import CustomSnackbar from '../../Components/CustomSnackBar';
import img from '../../Assets/img/Logistio - logomark.png'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import  avatar from '../../Assets/img/avatar.png';
import axios from 'axios';
import {uri} from "../../Url_base";
import useToken from '../../Hooks/useToken';
import { useLocation } from "react-router-dom";

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`)

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
      padding:'15px',
      background:'white'

    },
  }));
  
const initPassword = {
    current:'',
    new:'',
    confirm:'',
    error:''
}
const reducer = (state,action)=>{
        switch (action.type) {
            case 'current':
                return {...state,current:action.value}
                case 'new':
                    return {...state,new:action.value}
                    case 'confirm':
                        return {...state,confirm:action.value}
                        case 'error':
                            return {...state,error:action.value}         
            default:
                return state
        }
}
function Profile() {
    const context = React.useContext(ConnectedUser);
    const [passwords, dispatch] = React.useReducer(reducer, initPassword)
    const [status, setStatus] = React.useState('');
    const [setToken,getToken] = useToken();
    const location = useLocation();
    console.log('CONETXT HERE',context)
    const styleInputPassword = {
        marginBottom:'10px',
        width:'450px',
        marginLeft:'35px',
        marginBottom:'25px'
    };
    const styleInput = {
        marginBottom:'10px',
    };

    const verify = ()=>{
        if(passwords.new.length>0 && passwords.confirm.length>0){
            if(passwords.new === passwords.confirm){
                dispatch({type:'error',value:false})
            }
            else{
                dispatch({type:'error',value:true})
    
            }
        }
        else{
            dispatch({type:'error',value:true})
        }
       
    }

    const _persist = ()=>{
        verify()
        if(passwords.error === false || passwords.error !== ''  ){
            axios.patch(`${uri.link}/users/${context[0].userName}`, {
                password:passwords.new
              },
              {
                headers:{'auth-token':`${getToken()}`}
              }).then(function (res) {
                if(res.status===200){
                    setStatus(200);
                    // setToken(res.data.token)
                }
                    else
                    setStatus('error')
              })
              .catch(function (error) {
                  setStatus('error')
              });
        }
    }

    const classes = useStyles();


    return (
        <Container maxWidth="lg" style={{display:'flex',flexDirection:'column',overflowY:'auto',height:'100%'}}>
            <h1 style={{color:'rgb(36,38,76)',paddingTop:'50px',fontWeight:'normal'}}>{lang.user_profile}</h1>
            <span style={{background:'#303030',borderRadius:'10px',width:'100%',padding:'10px',color:'white-smoke',fontWeight:'bold'}}>ℹ️ Please update your password now.</span>
            {
                passwords.error && 
                    <CustomSnackbar type='error' content="passwords doesn't match each others" />
            }
                <Paper elevation={0} style={{marginTop:'15px',background:'rgb(243,245,247)',borderRadius:'15px',padding:'30px',display:'flex',flexDirection:'row',height:'400px',justifyContent:'center',alignItems:'center'}}>
                    {
                        status===200?
                        <CustomSnackbar  content='Password updated!!' type="success"/>
                        :
                        status==='error'?
                        <CustomSnackbar  content='Ops, password update failed!' type="error"/>
                        : null
                    }
                    
                    <Grid item md={4} style={{display:'flex',flexDirection:'column',alignItems:'center',borderRadius:'10px',padding:'15px'}}>
                        {/* <TextField style={styleInput} id="username" label="Username"   variant='filled' disabled defaultValue={context[0].userName} />
                        <TextField style={styleInput} id="email" label="Email" disabled variant='filled' /> */}
                        <Avatar src={img} className={classes.large} variant='circle'/>
                            <section style={{display:'flex',flexDirection:'column',padding:'7px',justifyContent:'space-around',alignItems:'center',width:'100%'}}>
                                    <section style={{display:'flex',alignItems:'center',marginTop:'10px',color:'rgb(36,38,76)',fontWeight:'550',fontSize:'30px',textTransform:'capitalize'}}>{context[0].userName}</section>
                                    <section style={{display:'flex',alignItems:'center',marginTop:'5px',color:'#303030',opacity:'75%'}}>aa@gmail.com</section>
                            </section>
                    </Grid>
                    <Grid item md={8}>
                    <section style={{display:'flex',justifyContent:'flex-start',flexDirection:'column',alignItems:'flex-start'}}>
                        <TextField  size='medium' style={styleInputPassword} id="Current password" label={lang.current_password} variant='standard' onChange={(e)=>dispatch({type:'current',value:e.target.value})}/>
                        <TextField size='medium' style={styleInputPassword} id="New password" label={lang.new_password} variant='standard' onChange={(e)=>dispatch({type:'new',value:e.target.value})} />
                        <TextField size='medium' style={styleInputPassword} id="Confirm password" label={lang.confirm_password} variant='standard' onChange={(e)=>dispatch({type:'confirm',value:e.target.value})} />
                     <motion.Button
                    
                    whileHover={{background:'rgb(48,154,232)',transition:{duration:'0.5'} }}
                            variant="contained"
                            onClick={_persist}
                            style={{marginLeft:'35px',width:'450px',background:'rgb(65,84,179)',border:'0px',borderRadius:'5px',height:'40px',marginTop:'25px',color:'white',cursor:'pointer',fontWeight:'bold',fontSize:'15px'}}
                        >
                            {lang.save_password}
                    </motion.Button>
                    </section>
                   
                    </Grid>
                  
                </Paper>

        </Container>

    )
}

export default Profile
