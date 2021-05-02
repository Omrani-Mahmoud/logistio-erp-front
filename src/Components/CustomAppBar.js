// thiis the app bar menu ( the top bar )

// language switcher handler is also here

//menus too is here



import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar, Badge, Grid } from '@material-ui/core';
import  avatar from '../Assets/img/avatar.png';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { motion } from "framer-motion"
import Divider from '@material-ui/core/Divider';

import auth from '../Auth'
import { useHistory } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CustomMenu from './Notifications/CustomMenu';

import {Notifications,ConnectedUser}  from '../App'


const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../Language/${lngc}.json`);

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      marginRight:"7px"
    },
  }));

export default function CustomAppBar({user}) {


  const classes = useStyles();
  const [isMenuOpen, setisMenuOpen] = React.useState(null)
  const [isNotifOpen, setisNotifOpen] = React.useState(null)
  const notifications_context = React.useContext(Notifications)
  const user_context = React.useContext(ConnectedUser);
  const [sections, setsections] = React.useState([])

  const history = useHistory();







  const handleMenuOpen = (event)=>{
        setisMenuOpen(event.currentTarget)
  }
  const handleMenuClose = ()=>{
    // auth.logout()
        setisMenuOpen(null)
}




const handleOpenNotif = (event)=>{
  setisNotifOpen(event.currentTarget)
}
const handleNotifClose = ()=>{
// auth.logout()
  setisNotifOpen(null)
}



const logout_ = ()=>{
  auth.logout()
}

const _profile = ()=>{
  handleMenuClose()
  history.push('/home/profile')
}

const [isEnglish, setIsEnglish] = React.useState(window.localStorage.getItem('lang')=='CH'?false:true);

const handleChange = (event) => {
  isEnglish?
  window.localStorage.setItem('lang','CH')
  :
  window.localStorage.setItem('lang','EN')
  // setIsEnglish(!isEnglish)
  window.location.reload()
};

React.useEffect(() => {
          
  setsections(user_context[0]?.role?.sections)
   
 }, [user_context[0]])

 

 console.log('context ehre =====< ',user_context)

 const _check  = (array,value)=>{
  let valid = false;
  array && array.map(obj =>{
    console.log('OBJ',obj)
      if(obj.name===value){
        valid = true
      }

  })
  return valid
}


  return (
    <Grid item lg={12} style={{background:'rgb(243,245,247)',borderRadius:'10px'}}>
     
        <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:"flex-end",marginBottom:'0px',paddingBottom:'5px',}}>
        <FormControlLabel
      
        control={
          <Switch
            checked={isEnglish}
            onChange={handleChange}
            name="en"
            color="primary"
          />
        }
        label={lang.language}
      />
            <section style={{display:'flex',width:'250px',alignItems:'center',padding:'3px',cursor:'pointer',marginLeft:'20px'}} >
                <Avatar alt="avatar" src={avatar} className={classes.large}/>
                <span style={{color:'#303030',display:'flex',alignItems:'center'}} onClick={handleMenuOpen}>{`${lang.hello}, ${user?.userName}`}<ExpandMoreIcon /></span>
                
              {
                _check(sections,'product') && 
             
              <Badge badgeContent={notifications_context[0].length} color="secondary">
                <NotificationsIcon style={{marginLeft:'20px'}} color='primary' onClick={handleOpenNotif}/>
              </Badge>
               }
            </section>

            <Menu
      
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    id={'profile_menu'}
                    keepMounted
                    anchorEl={isMenuOpen}
                    open={Boolean(isMenuOpen)}
                    onClose={handleMenuClose}
                    style={{marginTop:'24px',textAlign:'center'}}
                    >
                    <MenuItem style={{width:'150px',textAlign:'center',fontSize:'13px',paddingLeft:'38%',color:'#303030',opacity:'55%'}} onClick={_profile}>Profile</MenuItem>
                    <Divider variant="middle" />
                    <MenuItem style={{width:'150px',textAlign:'center',fontSize:'13px',paddingLeft:'38%',color:'#303030',opacity:'55%'}} onClick={logout_}>{lang.logout}</MenuItem>
                    
                    </Menu>

                    <CustomMenu  anchorEl={isNotifOpen} handleOpen={handleOpenNotif} handleClose={handleNotifClose}  />
        </div>
        
   
</Grid>
  );
}