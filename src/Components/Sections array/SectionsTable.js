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


const lngc = window.localStorage.getItem("lang")
  ? window.localStorage.getItem("lang")
  : "EN";
const lang = require(`../../Language/${lngc}.json`);

function SectionsTable({choosedSection,handleChoosedSectionChange}) {

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


    const rows = [
        createData('action or whatever', 'checkbox here', 'checkbox here','checkbox here', 'checkbox here'),
        createData('action or whatever', 'checkbox here', 'checkbox here','checkbox here', 'checkbox here'),
        createData('action or whatever', 'checkbox here', 'checkbox here','checkbox here', 'checkbox here'),
        createData('action or whatever', 'checkbox here', 'checkbox here','checkbox here', 'checkbox here'),
        createData('action or whatever', 'checkbox here', 'checkbox here','checkbox here', 'checkbox here'),

      ];
      const classes = useStyles();

    return (
      <>
      <FormControl className={classes.formControl} size='small' style={{width:'30%',marginBottom:'30px'}}>
        <InputLabel id="demo-simple-select-label">{lang.section}</InputLabel>
        <Select
          labelId="demo-simple-select-section"
          id="demo-simple-select"
          value={choosedSection}
          onChange={handleChoosedSectionChange}
        >
          <MenuItem value={10}>section1</MenuItem>
          <MenuItem value={20}>section3</MenuItem>
          <MenuItem value={30}>section4</MenuItem>
        </Select>
      </FormControl>


        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={headerStyle}>{lang.entity}</TableCell>
            <TableCell style={headerStyle} >{lang.create}</TableCell>
            <TableCell style={headerStyle}>{lang.read}</TableCell>
            <TableCell style={headerStyle} >{lang.update}</TableCell>
            <TableCell style={headerStyle} >{lang.delete}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
    )
}

export default SectionsTable
