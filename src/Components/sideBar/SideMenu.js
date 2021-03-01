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
import { Switch, Route, Link, useLocation } from "react-router-dom";
import "../../Assets/css/sideBarMenuItem.css";
import logo from "../../Assets/img/Logistio white logo.svg";
import { motion } from "framer-motion";
import DashboardIcon from '@material-ui/icons/Dashboard';
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
    background: "rgb(36,37,77)",
    borderRadius: "20px",
    height: "95vh",
    position: "relative",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const init_activeRoute = {
  home: false,
  products: false,
  stock: false,
  users: false,
  orders: false,
  purchases: false,
  finance:false
};

const activeRouteReducer = (state, action) => {
  switch (action.type) {
    case "home":
      return {
        home: true,
        products: false,
        stock: false,
        users: false,
        orders: false,
        purchases: false,
        finance:false
      };
    case "products":
      return {
        home: false,
        products: true,
        stock: false,
        users: false,
        orders: false,
        purchases: false,
        finance:false
      };
    case "stock":
      return {
        home: false,
        products: false,
        stock: true,
        users: false,
        orders: false,
        purchases: false,
        finance:false
      };
    case "users":
      return {
        home: false,
        products: false,
        stock: false,
        users: true,
        orders: false,
        purchases: false,
        finance:false
      };
    case "orders":
      return {
        home: false,
        products: false,
        stock: false,
        users: false,
        orders: true,
        purchases: false,
        finance:false
      };
    case "purchases":
      return {
        home: false,
        products: false,
        stock: false,
        users: false,
        orders: false,
        purchases: true,
        finance:false
      };
      case "finance":
        return {
          home: false,
          products: false,
          stock: false,
          users: false,
          orders: false,
          purchases: false,
          finance:true
        };
    default:
      return state;
  }
};
function SideMenu({ sections }) {
  const classes = useStyles();

  const [activeRoute, dispatch] = React.useReducer(
    activeRouteReducer,
    init_activeRoute
  );

  let location = useLocation();
  const activeStyle = { borderRight: "5px white solid" };
  const notActiveStyle = { borderRight: "0px" };

  const _isActiveRoute = (path) => {
    dispatch({ type: path });
  };

  console.log("active========", activeRoute);
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div
        style={{
          display: "flex",
          height: "80px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={logo} style={{ height: "50px", width: "auto" }} />
      </div>
      <div className={classes.toolbar} />

      <List style={{ padding: "10px" }}>

     
          <motion.section
            style={activeRoute.home ? activeStyle : notActiveStyle}
            whileHover={{ scale: 1.05, originX: 0 }}
          >
            <Link
              to="/home/"
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => _isActiveRoute("home")}
            >
              <ListItem button key={lang.products} style={{ padding: "10px" }}>
                <ListItemIcon>
                  <DashboardIcon className="sideBarMenuIcon" />
                </ListItemIcon>
                <ListItemText primary={lang.home} />
              </ListItem>
            </Link>
          </motion.section>
     

        {useRole(sections, "product") && (
          <motion.section
            style={activeRoute.products ? activeStyle : notActiveStyle}
            whileHover={{ scale: 1.05, originX: 0 }}
          >
            <Link
              to="/home/products"
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => _isActiveRoute("products")}
            >
              <ListItem button key={lang.products} style={{ padding: "10px" }}>
                <ListItemIcon>
                  <LocalOfferIcon className="sideBarMenuIcon" />
                </ListItemIcon>
                <ListItemText primary={lang.products} />
              </ListItem>
            </Link>
          </motion.section>
        )}

        {useRole(sections, "stock") && (
          <motion.section
            style={activeRoute.stock ? activeStyle : notActiveStyle}
            whileHover={{ scale: 1.05, originX: 0 }}
          >
            <Link
              to="/home/stock"
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => _isActiveRoute("stock")}
            >
              <ListItem button key={lang.stock} style={{ padding: "10px" }}>
                <ListItemIcon>
                  <LocalConvenienceStoreIcon className="sideBarMenuIcon" />
                </ListItemIcon>
                <ListItemText primary={lang.stock} />
              </ListItem>
            </Link>
          </motion.section>
        )}
        {useRole(sections, "orders") && (
          <motion.section
            style={activeRoute.orders ? activeStyle : notActiveStyle}
            whileHover={{ scale: 1.05, originX: 0 }}
          >
            <Link
              to="/home/orders"
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => _isActiveRoute("orders")}
            >
              <ListItem button key={lang.orders} style={{ padding: "10px" }}>
                <ListItemIcon>
                  <ShoppingCartIcon className="sideBarMenuIcon" />
                </ListItemIcon>
                <ListItemText primary={lang.orders} />
              </ListItem>
            </Link>
          </motion.section>
        )}
        {useRole(sections, "purchases") && (
          <motion.section
            style={activeRoute.purchases ? activeStyle : notActiveStyle}
            whileHover={{ scale: 1.05, originX: 0 }}
          >
            <Link
              to="/home/purchases"
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => _isActiveRoute("purchases")}
            >
              <ListItem button key={lang.purchases} style={{ padding: "10px" }}>
                <ListItemIcon>
                  <StoreIcon className="sideBarMenuIcon" />
                </ListItemIcon>
                <ListItemText primary={lang.purchases} />
              </ListItem>
            </Link>
          </motion.section>
        )}

        {!useRole(sections, "finance") && (
          <motion.section
            style={activeRoute.finance ? activeStyle : notActiveStyle}
            whileHover={{ scale: 1.05, originX: 0 }}
          >
            <Link
              to="/home/finance"
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => _isActiveRoute("finance")}
            >
              <ListItem button key={lang.finance} style={{ padding: "10px" }}>
                <ListItemIcon>
                  <MonetizationOnIcon className="sideBarMenuIcon" />
                </ListItemIcon>
                <ListItemText primary={lang.finance} />
              </ListItem>
            </Link>
          </motion.section>
        )}

        {useRole(sections, "user") && (
          <motion.section
            style={activeRoute.users ? activeStyle : notActiveStyle}
            whileHover={{ scale: 1.05, originX: 0 }}
          >
            <Link
              to="/home/users"
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => _isActiveRoute("users")}
            >
              <ListItem button key={lang.newUsers} style={{ padding: "10px" }}>
                <ListItemIcon>
                  <SupervisorAccountIcon className="sideBarMenuIcon" />
                </ListItemIcon>
                <ListItemText primary={lang.newUsers} />
              </ListItem>
            </Link>
          </motion.section>
        )}
      </List>
      <span
        style={{
          position: "absolute",
          bottom: 0,
          padding: "20px",
          color: "white",
        }}
      >
        © MartechLabs
      </span>
    </Drawer>
  );
}

export default SideMenu;
