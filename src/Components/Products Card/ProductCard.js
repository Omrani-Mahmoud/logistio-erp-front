import { Grid } from '@material-ui/core'
import React from 'react'
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomModal from '../../Pages/Products/CustomModal';

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`)

const useStyles = makeStyles((theme)=>({
    table: {
      minWidth: 650,
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
      },
  }));

function ProductCard({rows,filter,row,products}) {
    const classes = useStyles();
    const [mouseIn, setMouseIn] = React.useState(false)
    const style={
        filter: !mouseIn?'drop-shadow(-10px 5px 3px rgba(36, 35, 35,0.3))':'drop-shadow(0 0 0.75rem rgba(36, 35, 35,0.3)',
        marginBottom:'7px',
        transition: '1s'
    }

    console.log('PRODUCTS:::::',products)

    const [open, setOpen] = React.useState(false);

        const handleOpenModal = () => {
            setOpen(true);
        };

        const handleCloseModal = () => {
            setOpen(false);
        };
    return (
        <>
       <Grid item sm={12} md={3} style={{
           marginRight:'10px',
       marginTop:'10px',
       background:'rgb(243,245,247)',
       padding:'6px',
       borderRadius:'15px',
       height:'250px',
       display:'flex',
       justifyContent:'space-around',
  
       flexDirection:'column'}}  onMouseEnter={()=>setMouseIn(true)} onMouseLeave={()=>setMouseIn(false)} onClick={handleOpenModal} >
            <span style={{width:'55%',textAlign:'center',float:'right',alignSelf:'flex-end',background:'rgb(36,38,76)',padding:'3px',marginTop:'-10px',marginRight:'-5px',borderTopRightRadius:'15px',fontSize:'13px',borderBottomLeftRadius:'15px',color:'white',fontWeight:'bold'}}>
                Qtt: 11345555
            </span>
            <section style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <Avatar style={style} alt={'haha'} src={'https://cdn.shopify.com/s/files/1/0223/3399/products/spiritual-rick-blanket-blanket-collectiontitle-429989_900x.jpg?v=1574386219'}  variant="square" className={classes.large} />
                <span style={{color:'#303030',fontWeight:'bold',textTransform:'capitalize',textAlign:'center'}}>{row.name}</span>
                <span  style={{color:'#303030',opacity:'50%',textOverflow:'ellipsis',overflow:'hidden',display:'block',width:'70%',textAlign:'center'}}>{row.sku}</span>
              
            </section>
            <section style={{paddingLeft:'5px',paddingRight:'5px'}}>
                <span style={{textTransform:'capitalize',color:'#303030',fontWeight:'bold'}}>{row.type_shopping}</span>
                <span style={{textTransform:'capitalize',float:'right',color:'#303030',fontWeight:'bold'}}>{row.category.name}</span>

                </section>

       </Grid>
                       <CustomModal open={open}  handleClose={handleCloseModal}  product={row} />
                       </>

    )
}

export default ProductCard
