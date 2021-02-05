import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import auth from '../../Auth';
import CircularProgress from '@material-ui/core/CircularProgress';
import {ConnectedUser}  from '../../App'
import useToken from '../../Hooks/useToken';
import useGetUser from '../../Hooks/useGetUser';
import jwt from 'jsonwebtoken';
import logo from '../../Assets/img/Logistio logo.svg';
import Loader from '../../Components/Loader';
import CustomSnackbar from '../../Components/CustomSnackBar';
import axios from 'axios'
import {uri} from "../../Url_base";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`)
const initialState = {
  username:'',
    password:''
}


const reducer = (state,action)=>{
        switch (action.type) {
            case 'userName':
                return{...state,username:action.value};
            case 'password':
                return{...state,password:action.value}
        
            default:
                return state
        }
}

function Copyright() {


  return (
    <Typography variant="body2" color="textPrimary" align="center">
      {'Copyright © Logistio '}
      {/* <Link color="inherit" href="#">
        Logistio
      </Link>{' '} */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(5),
    width:200,
    height:50
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background:'black',
    color:'white',
    '&:hover':{
        background:'#373738',

    }

  },
  txtInput: {
    '& label.Mui-focused': {
      color: 'grey',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      
     
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  },
}));

export default function SignIn(props) {
  const [setToken,getToken] = useToken();
  const user_context = React.useContext(ConnectedUser);
  const classes = useStyles();
  const [userInfo, dispatch] = React.useReducer(reducer, initialState);
  let history = useHistory();
  const [loading, setloading] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const [forgotPass, setforgotPass] = React.useState(false);

  

  const AuthHandler = ()=>{
      setloading(true);
    auth.login(userInfo,setloading,(token,ch)=>{
        setToken(token);
        console.log('DECODED__token:::',jwt.decode(token))
        // history.push('/home');
        user_context[1]({userName:jwt.decode(token).username,role:jwt.decode(token).role});
        if(ch)
          history.push({pathname:'/home/profile',state:'new'});
        else
          history.push('/home');
    })

}

const _reset = ()=>{

      axios.post(`${uri.link}/password_reset`, {
          username:userInfo.username,
        })
        .then(function (res) {
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



React.useEffect(() => {
  if(auth.isAuthenticated())
      history.push('/home')
    

}, [])

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {
                        status===200?
                        <CustomSnackbar  content='An email has been sent!' type="success"/>
                        :
                        status==='error'?
                        <CustomSnackbar  content='Ops, password update failed!' type="error"/>
                        : null
                    }
                    
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{padding:'50px'}}>

        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={logo} variant='square' />
          <Typography component="h1" variant="h5" style={{fontWeight:'bolder',alignSelf:'flex-start'}}>
            {lang.signin}
          </Typography>
          {
              !forgotPass?
            
          <form className={classes.form} noValidate>
              
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  label={lang.userName}
                  name="userName"
                  autoComplete="userName"
                  autoFocus
                  className={classes.txtInput}
                  onChange={(e)=>{dispatch({type:'userName',value:e.target.value})}}
                />
                <TextField

                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={lang.password}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  className={classes.txtInput}
                  onChange={(e)=>{dispatch({type:'password',value:e.target.value})}}
                />
            
            {
              !loading && 
              <Button
                onClick={AuthHandler}
                fullWidth
                variant="contained"
                className={classes.submit}
              
            >
              {lang.login}
            </Button>
            }
            {
              loading && 
              <div style={{textAlign:'center'}}>
                <Loader />
            </div>
            }
            
            <Grid container>
              <Grid item xs>
                <Link onClick={()=>{setforgotPass(true)}} variant="body2" color='textSecondary'>
                {lang.forgotPass}
                </Link>
              </Grid>
              {/* <Grid item>
                <Link href="#" variant="body2" color='textSecondary'> 
                 {`${lang.forgot_pass}`}
                </Link>
              </Grid> */}
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
          :
          <form className={classes.form} noValidate>
              
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label={lang.userName}
            name="userName"
            autoComplete="userName"
            autoFocus
            className={classes.txtInput}
            onChange={(e)=>{dispatch({type:'userName',value:e.target.value})}}
          />
          {
              !loading && 
              <Button
                onClick={_reset}
                fullWidth
                variant="contained"
                className={classes.submit}
            >
              {lang.reset_password}
            </Button>
            
            }
            {
              loading && 
              <div style={{textAlign:'center'}}>
                <Loader />
            </div>
            }
            <IconButton aria-label="delete" className={classes.margin} onClick={()=>setforgotPass(false)}>
                <ArrowBackIcon fontSize="large" />
            </IconButton>
          </form>
}
        </div>
        <span style={{color:'#303030',float:'right',opacity:'50%'}}>v1.1.0</span>
      </Grid>
    </Grid>
  );
}