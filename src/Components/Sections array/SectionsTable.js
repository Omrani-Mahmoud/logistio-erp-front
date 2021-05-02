
// for future uses
// it will be each user will got a sections access
// y need to edit it here
// its aleady existe
//check sectionTableContainer
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import {motion} from 'framer-motion';

const lngc = window.localStorage.getItem("lang")
  ? window.localStorage.getItem("lang")
  : "EN";
const lang = require(`../../Language/${lngc}.json`);

function SectionsTable({choosedSection,handleChoosedSectionChange,rows,dispatcher}) {

  const contentVariant = {
    hidden:{
        scale:0,
    },
    visible:{
        scale:1,
        transition:{
            type:'tween',
            duration:0.3,  
        }
    },   
}
    const headerStyle={
            fontWeight:'bold'
    }
    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }


      const classes = useStyles();

    return (
      <motion.div variants={contentVariant} initial='hidden' animate='visible' >
      <FormControl className={classes.formControl} size='small' style={{width:'30%',marginBottom:'30px'}}>
        <InputLabel id="demo-simple-select-label">{lang.section}</InputLabel>
        <Select
          labelId="demo-simple-select-section"
          id="demo-simple-select"
          value={choosedSection}
          onChange={handleChoosedSectionChange}
        >
          <MenuItem value={'products'}>Products</MenuItem>
          <MenuItem value={'stock'}>Stock</MenuItem>
          <MenuItem value={'orders'}>Orders</MenuItem>
          <MenuItem value={'purchases'}>Purchases</MenuItem>
        </Select>
      </FormControl>


        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={headerStyle}>Access</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
            
              <TableCell align="left">
              <FormControlLabel
                control={<Checkbox checked={row.isChecked} onChange={()=>dispatcher(row.id,'')} name="checkedA" color="primary" />}
                label={row.description}
              />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </motion.div>
    )
}

export default SectionsTable
