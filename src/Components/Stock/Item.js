// this represent a single Stock item 
// this  an according item
// read material UI

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Avatar, Grid } from '@material-ui/core';
import VariantsArray from './toUpdate/VariantsArray';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
function Item({row}) {


    console.log('ROOOW ',row)
    const classes = useStyles();

    return (
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <section style={{width:'100%'}}>
                <Avatar alt="gun" src={row?.product?.media[0]?.link}  variant='square'/>
                <Typography>{row.product.name}</Typography>
            </section>        </AccordionSummary>
        <AccordionDetails>
                        <Grid item md={10} style={{width:'100%'}}>
                            <VariantsArray options={row.product.options} variants={row.variants} storageID={row?._id}  />
                        </Grid>
        </AccordionDetails>
      </Accordion>
    )
}

export default Item
