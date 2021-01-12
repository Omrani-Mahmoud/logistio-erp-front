import React from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import LocalConvenienceStoreIcon from "@material-ui/icons/LocalConvenienceStore";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StoreIcon from "@material-ui/icons/Store";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import useRole from "../../Hooks/useRole";
import { Switch, Route, Link } from 'react-router-dom';
import '../../Assets/css/sideBarMenuItem.css';
import logo from '../../Assets/img/Logistio white logo.svg';
const lngc = window.localStorage.getItem("lang")
  ? window.localStorage.getItem("lang")
  : "EN";
const lang = require(`../../Language/${lngc}.json`);

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",

  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    
    
  },
  drawerPaper: {
    width: drawerWidth,
    background:"rgb(36,37,77)",
    borderRadius:'20px',
    height:'95vh',
    position:'relative',
  

    
    
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    
  },
}));
function SideMenu({sections}) {
  
  const classes = useStyles();

  console.log('SECTIONS SIDE BAR ::::',sections)
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div style={{display:'flex',height:'80px',justifyContent:'center',alignItems:'center'}}>
        <img src={logo}  style={{height:'50px',width:'auto'}}/>
      </div>
      <div className={classes.toolbar} />
    
      <List style={{ padding: "10px", }}>
        {useRole(sections,'product') && (
          <Link to='/home/products' style={{textDecoration:'none',color:'white'}} >
            <ListItem
              button
              key={lang.products}
              style={{ padding: "10px" }}
             
            >
              <ListItemIcon>
                <LocalOfferIcon  className='sideBarMenuIcon' />
              </ListItemIcon>
              <ListItemText  primary={lang.products} />
            </ListItem>
          </Link>
        )}

        {useRole(sections,'stock') && (
           <Link to='/home/stock' style={{textDecoration:'none',color:'white'}}>
              <ListItem button key={lang.stock}  style={{ padding: "10px" }}>
                <ListItemIcon>
                  <LocalConvenienceStoreIcon className='sideBarMenuIcon' />
                </ListItemIcon>
                <ListItemText primary={lang.stock} />
              </ListItem>
          </Link>
        )}
        {useRole(sections,'orders') && (
           <Link to='/home/orders' style={{textDecoration:'none',color:'white'}}>
              <ListItem button key={lang.orders}  style={{ padding: "10px" }}>
                <ListItemIcon>
                  <ShoppingCartIcon  className='sideBarMenuIcon'/>
                </ListItemIcon>
                <ListItemText primary={lang.orders} />
              </ListItem>
          </Link>
        )}
        {useRole(sections,'purchases') && (
           <Link to='/home/purchases' style={{textDecoration:'none',color:'white'}}>
              <ListItem
                button
                key={lang.purchases}
                style={{ padding: "10px" }}
              >
                <ListItemIcon>
                  <StoreIcon className='sideBarMenuIcon' />
                </ListItemIcon >
                <ListItemText primary={lang.purchases} />
              </ListItem>
            </Link>
        )}
        {useRole(sections,'user') && (
           <Link to='/home/users' style={{textDecoration:'none',color:'white'}}>
              <ListItem
                button
                key={lang.newUsers}
                style={{ padding: "10px" }}
              >
                <ListItemIcon>
                  <SupervisorAccountIcon  className='sideBarMenuIcon' />
                </ListItemIcon>
                <ListItemText primary={lang.newUsers} />
              </ListItem>
          </Link>
        )}
      </List>

    </Drawer>
  );
}

export default SideMenu;
