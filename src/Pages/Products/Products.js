import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Avatar, Grid } from '@material-ui/core';
import CustomModal from './CustomModal';
import axios from 'axios';
import {uri} from "../../Url_base";
import useToken from '../../Hooks/useToken';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import ProductsTable from './ProductsTable';
import ProductCard from '../../Components/Products Card/ProductCard';
import EmptyArrayHolder from '../../Components/EmptyArrayHolder';

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`)

const useStyles = makeStyles((theme)=>({
    table: {
      minWidth: 650,
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
  }));


  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }


function Products({open,handleCloseModal,handleOpenModal}) {
    const classes = useStyles();
    const [setToken,getToken] = useToken();
  const [value, setValue] = React.useState(0);
  const [products, setproducts] = React.useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log('VALUE::::',newValue)
  };
    React.useEffect(() => {
        console.log('HERE FETCH PRODS')
        let mounted = true;

    axios.get(`${uri.link}/products/`,{
        headers:{'auth-token':`${getToken()}`}
    })
       .then(function (response) {
           if(mounted){
            console.log('PRODUCTS --->',response)
    
            // console.log('PRODUCTS ::: :',response);
                setproducts(response.data)
           }
       })
       .catch(function (error) {
           // handle error
           console.log(error);
       });
       return ()=>{
           mounted=false
       }
    }, [])

    const rows = [
        {
            id:1,
            img:'https://www.imgworlds.com/wp-content/uploads/2015/11/4-PARKRULES-HEADER.jpg',
            name:'runner',
            sku:'run',
            variants:[1,2],
            type:'bolk',
            category:'test',
            description:'bla bla bla',
            agent_description:'bla bla bla aaaaa',
            urls:['https://www.youtube.com/','link2'],
            moq:10,
            moqcp:14,
            variants:[
                {
                    option1: "Pink",
                    option2: "S",
                    option3: "",
                    quantity: "33",
                    price: "34.4"
        
                }
                ,
                {
                    option1: "Red",
                    option2: "XL",
                    option3: "",
                    quantity: "25",
                    price: "24.4"
        
                }
            ],
            accessories:[
                {
                    name:'acc1acc1acc1acc1',
                    attachments:[
                        'https://logistiomedia.nyc3.digitaloceanspaces.com/logistiomedia/f7c3b8a85d96ed35a3fcec51caa9d07d.png',
                        'https://logistiomedia.nyc3.digitaloceanspaces.com/logistiomedia/packaging1.ai',
                        'test.eps',
                        'test.psd',
                        'test.ai',
                        'test.eps',
                    ],
                    quantity:12,
                    description:'testacc1acc1acc1acc1acc1acc1acc1acc1acc1acc1acc1acc1acc1acc1acc1acc1acc1',
                    price:33.4
                }
            ]
        },
        {
            id:2,
            img:'https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg',
            name:'telkiwelki',
            sku:'om_tel',
            variants:[1,2],
            type:'bolk',
            category:'test',
            description:'bla bla bla',
            agent_description:'bla bla bla agent',
            urls:['link1','link2'],
            moq:10,
            moqcp:14,
            variants:[
                {
                    option1: "Pink",
                    option2: "S",
                    option3: "",
                    quantity: "33",
                    price: "34.4"
        
                }
                ,
                {
                    option1: "Red",
                    option2: "XL",
                    option3: "",
                    quantity: "25",
                    price: "24.4"
        
                }
            ],
            accessories:[
                {
                    name:'acc1',
                    attachments:[
                        'aa',
                        'bb',
                        'cc'
                    ],
                    quantity:12,
                    description:'test',
                    price:33.4
                }
            ]
        }
    ]

    const variants = [
       
    ]

console.log('PRODUCTS --->',products)
    return (
        <Grid item md={12} style={{marginTop:'10px'}}>
                {/* <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>{lang.product_img}</TableCell>
                    <TableCell >{lang.product_name}</TableCell>
                    <TableCell >{lang.sku}</TableCell>
                    <TableCell >{lang.variants_number}</TableCell>
                    <TableCell >{lang.type}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                    <TableRow key={row.name} hover onClick={handleOpenModal}>
                        <TableCell component="th" scope="row">
                            <Avatar alt={row.name} src={row.img}  variant="square" className={classes.large} />

                        
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell >{row.sku}</TableCell>
                        <TableCell >{row.variants.length}</TableCell>
                        <TableCell >{row.type}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <CustomModal open={open}  handleClose={handleCloseModal}  product={rows[0]} /> */}

<AppBar position="relative" color="white" style={{borderRadius:'10px'}} >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label={lang.allProducts} {...a11yProps(0)} />
          <Tab label={lang.bolk} {...a11yProps(1)} />
          <Tab label={lang.drop_shipping} {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
            <Grid item md={12} style={{display:'flex',flexWrap:'wrap',height:'75vh',overflowY:'auto',justifyContent:products.length>0?'start':'center'}}>
              {
                products.length>0?
               products.map(row=>{
                  return <ProductCard row={row} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} open={open} filter='all' products={products} />

                })
                : 
                <EmptyArrayHolder text={lang.no_products}/>
              }
              {/* <ProductCard row={rows[0]} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} open={open} filter='all' /> */}
                {/* <ProductsTable rows={rows}  handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} open={open} filter='all'/> */}
            </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
            <Grid item md={12} style={{background:'rgb(243,245,247)',padding:'15px',borderRadius:'15px'}}>
                <ProductsTable rows={rows}  handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} open={open} filter='bolk'/>
            </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
            <Grid item md={12} style={{background:'rgb(243,245,247)',padding:'15px',borderRadius:'15px'}}>
                <ProductsTable rows={rows}  handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} open={open} filter='drop_ship'/>
            </Grid>
      </TabPanel>

      <TabPanel value={value} index={3}>
            <Grid item md={12} style={{background:'rgb(243,245,247)',padding:'15px',borderRadius:'15px'}}>
                <ProductsTable rows={rows}  handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} open={open} filter='all'/>
            </Grid>
      </TabPanel>
      </Grid>
    )
}

export default Products
