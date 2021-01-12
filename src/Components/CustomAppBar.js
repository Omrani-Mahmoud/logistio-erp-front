import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar, Grid } from '@material-ui/core';
import  avatar from '../Assets/img/avatar.png';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import auth from '../Auth'
import { useHistory } from 'react-router';
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
  const history = useHistory();
  const handleMenuOpen = (event)=>{
        setisMenuOpen(event.currentTarget)
  }
  const handleMenuClose = ()=>{
    auth.logout()
        setisMenuOpen(null)
}

const logout_ = ()=>{
  auth.logout(history)
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
                <span style={{color:'#303030'}} onClick={handleMenuOpen}>{`${lang.hello}, ${user?.userName}!`}</span>
                
            </section>
            <Menu
      
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    id={'profile_menu'}
                    keepMounted
                    anchorEl={isMenuOpen}
                    open={Boolean(isMenuOpen)}
                    onClose={handleMenuClose}
                    style={{marginTop:'24px'}}
                    >
                    <MenuItem onClick={logout_}><ExitToAppIcon color="primary" fontSize='small' color='action' />{lang.logout}</MenuItem>
                    
                    </Menu>
        </div>
        

</Grid>
  );
}