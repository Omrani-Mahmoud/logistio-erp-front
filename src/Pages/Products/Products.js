import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Avatar, FormControlLabel, Grid, Select, Switch } from '@material-ui/core';
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
import ProductCardErrorHandler from '../../Error boundry/ProductCardErrorHandler';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { AnimatePresence } from 'framer-motion';
import Loader from '../../Components/Loader';
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
  const [searchValue, setsearchValue] = React.useState('');
  const [selectValue, setselectValue] = React.useState('');
  const [isAccepted, setIsAccepted] = React.useState(0);
  const [loading, setloading] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setsearchValue('')
  };
    React.useEffect(() => {
        console.log('HERE FETCH PRODS')
        setloading(true);
        let mounted = true;

    axios.get(`${uri.link}/products/`,{
        headers:{'auth-token':`${getToken()}`}
    })
       .then(function (response) {
         setloading(false)
           if(mounted){
            console.log('PRODUCTS --->',response)
    
            // console.log('PRODUCTS ::: :',response);
                setproducts(response.data)
           }
       })
       .catch(function (error) {
           // handle error
           setloading(false)
           console.log(error);
       });
       return ()=>{
           mounted=false
       }
    }, [])


    const fetch_products = ()=>{
      axios.get(`${uri.link}/products/`,{
        headers:{'auth-token':`${getToken()}`}
    })
       .then(function (response) {
           
            console.log('PRODUCTS --->',response)
    
            // console.log('PRODUCTS ::: :',response);
                setproducts(response.data)
         
       })
       .catch(function (error) {
           // handle error
           console.log(error);
       });
    }

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
          accessories: [],
          category: {desc: "Category has x description", _id: "5ffdd4a5026f4d989b26237c", name: "Category x"},
          description: "Descriptioooon !",
          media: [],
          moq: null,
          name: null,
          options: [],
          price_sample: 105.6,
          sku: "sku3",
          type: "standard",
          type_shopping: "ds",
          urls: ["https://ih1.redbubble.net/image.1241782962.6329/throwpillow,small,750x1000-bg,f8f8f8.jpg"],
          variants: [],
          _id: "5ffdd4a5026f4d989b26237b",
        }
    ]

    const variants = [
       
    ]



    const filter_ = (value) => {
      let data = [];
      let res = [];

      data = products.filter((elem) => {
        return elem.type_shopping == value;
      });

      if (searchValue.length > 0) {
        data = data.filter((elem) => {
          return elem.sku.includes(searchValue);
        });
      }
      if (selectValue.length > 0) {
        console.log('VALUE HERE ',selectValue)
        data = data.filter((elem) => {
          return elem.status == selectValue;
        });
      }
      res=data
      return res;
    };

    const filter_all = () => {
      let data = [];
      if (searchValue.length > 0) {
        data = products.filter((elem) => {
          return elem.sku.includes(searchValue);
        });
      } else {
        return products;
      }
      console.log("RESSS ::: :: ALLL ", data);
      return data;
    };

    const filter_by_status_all = ()=>{
       return  filter_all().filter(elem=>{
          if(selectValue.length>0){
            return (elem.status===selectValue ) //&& elem.price_control.is_accepted===isAccepted
          }
          else{
            return elem
          }
        })
    }

    const filter_by_status = (value)=>{
      return  filter_(value).filter(elem=>{
         if(selectValue.length>0){
           return (elem.status===selectValue ) //&& elem.price_control.is_accepted===isAccepted
         }
         else{
           return elem
         }
       })
   }

    const handleChangeSelect = (e) => {
      setselectValue(e.target.value);
    };

    const styleWhileLoading = {
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      minHeight:'80vh'
    }
    return (
        <Grid item md={12} style={loading?styleWhileLoading:{marginTop:'10px'}}>
          {
            loading && 
              <Loader />
          }
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
{
  !loading && 
<>
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
          
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
            <section style={{display:'flex',justifyContent:'space-between'}}>
                <FormControl style={{margin:'10px'}}>
                                  <InputLabel htmlFor="input-with-icon-adornment" >{lang.search_by_sku}</InputLabel>
                                  <Input
                                  onChange={(e)=>setsearchValue(e.target.value)}
                                  id="input-with-icon-adornment"
                                  startAdornment={
                                      <InputAdornment position="start">
                                      <SearchIcon />
                                      </InputAdornment>
                                  }
                          />
                          </FormControl>
                          <FormControl variant="standard" style={{width:'200px'}}>
                                <InputLabel htmlFor="filled-age-native-simple">{lang.status}</InputLabel>
                                <Select
                                  native
                                  value={selectValue}
                                  onChange={handleChangeSelect}
                                >
                                  <option aria-label="None" value="" />
                                  <option value={'pending'}>{lang.pending}</option>
                                  <option value={'processing'}>{lang.processing}</option>
                                  <option value={'validated'}>{lang.validated}</option>
                                  <option value={'refused'}>{lang.refused}</option>
                                 
                                </Select>
                            </FormControl>
              </section>
              {/* <FormControlLabel
                    control={
                      <Switch
                        checked={isAccepted}
                        onChange={(e)=>setIsAccepted(e.target.checked?1:0)}
                        color="primary"
                      />
                    }
                    label={lang.accepted_product}
                /> */}
            <Grid item md={12} style={{display:'flex',flexWrap:'wrap',height:'63vh',overflowY:'auto',justifyContent:filter_by_status_all().length>0?'start':'center'}}>
              {
                products.length>0?

              //   products.filter((elem)=>{
              //     if(filter==='all') 
              //     return elem
              //     else
              //     return elem.type===filter
              // })
              filter_by_status_all().length>0?
              filter_by_status_all().map(row=>{
                // if(row.price_control.is_accepted===isAccepted)
                  return(
                    <ProductCardErrorHandler>
                        <ProductCard fetch={fetch_products} row={row} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} open={open} filter='all' products={products} />
                    </ProductCardErrorHandler>)
                    //  else
                    //  return               <div style={{width:'100%',height:'200px'}}><EmptyArrayHolder text={lang.no_accepted_products}/></div>
                })
                : 
                <EmptyArrayHolder text={lang.no_products}/>
                :
                <EmptyArrayHolder text={lang.no_products}/>

              }
              {/* <ProductCard row={rows[0]} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} open={open} filter='all' /> */}
                {/* <ProductsTable rows={rows}  handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} open={open} filter='all'/> */}
            </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
      <section style={{display:'flex',justifyContent:'space-between'}}>
                <FormControl style={{margin:'10px'}}>
                                  <InputLabel htmlFor="input-with-icon-adornment" >{lang.search_by_sku}</InputLabel>
                                  <Input
                                  onChange={(e)=>setsearchValue(e.target.value)}
                                  id="input-with-icon-adornment"
                                  startAdornment={
                                      <InputAdornment position="start">
                                      <SearchIcon />
                                      </InputAdornment>
                                  }
                          />
                          </FormControl>
                          <FormControl variant="standard" style={{width:'200px'}}>
                                <InputLabel htmlFor="filled-age-native-simple">{lang.status}</InputLabel>
                                <Select
                                  native
                                  value={selectValue}
                                  onChange={handleChangeSelect}
                                >
                                  <option aria-label="None" value="" />

                                  <option value={'pending'}>{lang.pending}</option>
                                  <option value={'processing'}>{lang.processing}</option>
                                  <option value={'validated'}>{lang.validated}</option>
                                  <option value={'refused'}>{lang.refused}</option>
                                 
                                </Select>
                            </FormControl>
              </section>
              {/* <FormControlLabel
                    control={
                      <Switch
                        checked={isAccepted}
                        onChange={(e)=>setIsAccepted(e.target.checked?1:0)}
                        color="primary"
                      />
                    }
                    label={lang.accepted_product}
                /> */}
          <Grid item md={12} style={{display:'flex',flexWrap:'wrap',height:'63vh',overflowY:'auto',justifyContent:filter_by_status('bulk').length>0?'start':'center'}}>
                {/* <ProductsTable rows={rows}  handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} open={open} filter='bolk'/> */}
                {
                products.length>0?
                  
                filter_by_status('bulk').length>0?

                filter_by_status('bulk').map(row=>{

                  // if(row.price_control.is_accepted===isAccepted)
                return(
                        <ProductCardErrorHandler>
                            <ProductCard fetch={fetch_products} row={row} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} open={open}  products={products} />
                        </ProductCardErrorHandler>

                  )
                  // else
                  // return               <div style={{width:'100%',height:'200px'}}><EmptyArrayHolder text={lang.no_accepted_products}/></div>

              })
              :
              <EmptyArrayHolder text={lang.no_products}/>
              :
              <EmptyArrayHolder text={lang.no_products}/>


                }
            </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
      <section style={{display:'flex',justifyContent:'space-between'}}>
                <FormControl style={{margin:'10px'}}>
                                  <InputLabel htmlFor="input-with-icon-adornment" >{lang.search_by_sku}</InputLabel>
                                  <Input
                                  onChange={(e)=>setsearchValue(e.target.value)}
                                  id="input-with-icon-adornment"
                                  startAdornment={
                                      <InputAdornment position="start">
                                      <SearchIcon />
                                      </InputAdornment>
                                  }
                          />
                          </FormControl>
                          <FormControl variant="standard" style={{width:'200px'}}>
                                <InputLabel htmlFor="filled-age-native-simple">{lang.status}</InputLabel>
                                <Select
                                  native
                                  value={selectValue}
                                  onChange={handleChangeSelect}
                                >
                                  <option aria-label="None" value="" />

                                  <option value={'pending'}>{lang.pending}</option>
                                  <option value={'processing'}>{lang.processing}</option>
                                  <option value={'validated'}>{lang.validated}</option>
                                  <option value={'refused'}>{lang.refused}</option>
                                 
                                </Select>
                            </FormControl>
              </section>
              {/* <FormControlLabel
                    control={
                      <Switch
                        checked={isAccepted}
                        onChange={(e)=>setIsAccepted(e.target.checked?1:0)}
                        color="primary"
                      />
                    }
                    label={lang.accepted_product}
                /> */}
                <Grid item md={12} style={{display:'flex',flexWrap:'wrap',height:'63vh',overflowY:'auto',justifyContent:filter_by_status('ds').length>0?'start':'center'}}>
                {/* <ProductsTable rows={rows}  handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} open={open} filter='drop_ship'/> */}
                {
                products.length>0?
                  
                filter_by_status('ds').length>0?

                filter_by_status('ds').map(row=>{
                  // if(row.price_control.is_accepted===isAccepted)
                return(
                        <ProductCardErrorHandler>
                            <ProductCard fetch={fetch_products} row={row} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} open={open}  products={products} />
                        </ProductCardErrorHandler>
                  )
                  // else
                  // return               <div style={{width:'100%',height:'200px'}}><EmptyArrayHolder text={lang.no_accepted_products}/></div>
              })
              :
              <EmptyArrayHolder text={lang.no_products}/>
              :
              <EmptyArrayHolder text={lang.no_products}/>


                }
            </Grid>
      </TabPanel>

      <TabPanel value={value} index={3}>
            <Grid item md={12} style={{background:'rgb(243,245,247)',padding:'15px',borderRadius:'15px'}}>
                <ProductsTable rows={rows}  handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} open={open} filter='all'/>
            </Grid>
      </TabPanel>
      </>
    }
      </Grid>
    )
}

export default Products
