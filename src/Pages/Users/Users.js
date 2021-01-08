import { Container, Grid, Paper, TextField,Switch, FormControlLabel, FormHelperText, Checkbox, Button } from '@material-ui/core'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import React from 'react'
import SectionsTableContainer from '../../Components/Sections array/SectionsTableContainer';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: 250,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const lngc = window.localStorage.getItem("lang")
  ? window.localStorage.getItem("lang")
  : "EN";
const lang = require(`../../Language/${lngc}.json`);


function Users({toggled,handleToggled,handleDropDownRoleChange,roles,selectedRole,isNewRole,userDispatcher,user}) {
    const textFStyle = {
        marginBottom:'7px'
    }
    const classes = useStyles();


  

    return (
        <Container maxWidth="lg" style={{display:'flex',flexDirection:'column'}} >
             
            <Paper elevation={3} style={{marginTop:'35px',marginBottom:'30px'}}>
                <Grid item md={12} style={{ padding:'10px'}}>
                    <span style={{color:'#303030',fontWeight:'bold',opacity:'60%'}}>{lang.addUser} </span>
                    <Grid item md={8} style={{display:'flex',flexDirection:'column',padding:'15px'}}>
                        <TextField  style={textFStyle} id="standard-basic1" label={lang.userName} onChange={(e)=>userDispatcher({type:'username',value:e.target.value})} />
                        <TextField   id="standard-basic2" label={lang.email}  onChange={(e)=>userDispatcher({type:'email',value:e.target.value})} />
                        <section style={{marginTop:'20px',marginLeft:'10px',display:'flex',alignItems:'center'}}>
                            <InfoIcon fontSize='small' color="disabled" />
                            <span style={{color:'#303030',opacity:'40%',fontWeight:'bold',fontSize:'12px',marginLeft:'5px'}}>{lang.passwordGenerationHint}</span>
                        </section>
                    </Grid>

                </Grid>
            </Paper>
            
          <FormControlLabel style={{color:'#303030'}}
        control={
            <Switch
            checked={toggled}
            onChange={handleToggled}
            name="toggle"
            color="primary"
      />
        }
        label={lang.subRole}
      />
            
            <Paper elevation={3} style={{marginTop:'10px'}}>
            {

                toggled?
                 <Grid item md={12} style={{ padding:'10px'}}>
                    <span style={{color:'#303030',fontWeight:'bold',opacity:'60%'}}>{lang.allowedSections} </span>
                    <Grid item md={12} style={{display:'flex',flexDirection:'column',padding:'15px'}}>
                     
                      <SectionsTableContainer />
  
                      
                    </Grid>

                </Grid>
                :
                <Grid item md={12} style={{ padding:'10px'}}>
                  {/* {
                    newRole?
                    <h3>new here</h3>
                    :
                    <>
                    <span style={{color:'#303030',fontWeight:'bold',opacity:'60%'}}>{lang.roleSelect} </span>
                    <Grid item md={8} style={{display:'flex',flexDirection:'column',padding:'15px'}}>
                        <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">{lang.roles}</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedRole}
                                onChange={handleDropDownRoleChange}
                                >
                                <MenuItem value={10}>Role1</MenuItem>
                                <MenuItem value={20}>Role2</MenuItem>
                                <MenuItem value={30}>Role3</MenuItem>
                                </Select>
                                <FormHelperText>{lang.roleSelectHint}</FormHelperText>

                        </FormControl>
                    </Grid>
                    </>
                  } */}
                  <Grid item md={8} style={{display:'flex',flexDirection:'column',padding:'15px'}}>
                     <TextField size='small' style={textFStyle} id="standard-basic1" label={lang.roleName} onChange={(e)=>userDispatcher({type:'name',value:e.target.value})} />
                     <section>
                              <FormControlLabel key={1}
                                  control={
                                    <Checkbox
                                      checked={user?.role?.products}
                                      onChange={(e)=>userDispatcher({type:'products',value:e.target.checked})}
                                      name="checkedp"
                                      color="primary"
                                    />
                                  }
                                  label={lang.productsSection}
                                />

                                <FormControlLabel key={2}
                                  control={
                                    <Checkbox
                                      checked={user?.role?.stock}
                                      onChange={(e)=>userDispatcher({type:'stock',value:e.target.checked})}
                                      name="checkeds"
                                      color="primary"
                                    />
                                  }
                                  label={lang.stockSection}
                                />

                                <FormControlLabel key={3}
                                  control={
                                    <Checkbox
                                      checked={user?.role?.orders}
                                      onChange={(e)=>userDispatcher({type:'orders',value:e.target.checked})}
                                      name="checkedo"
                                      color="primary"
                                    />
                                  }
                                  label={lang.ordersSection}
                                />

                                <FormControlLabel key={4}
                                  control={
                                    <Checkbox
                                      checked={user?.role?.purchases}
                                      onChange={(e)=>userDispatcher({type:'purchases',value:e.target.checked})}
                                      name="checkedp"
                                      color="primary"
                                    />
                                  }
                                  label={lang.purchasesSection}
                                />
                    </section>
                  </Grid>
                    
               </Grid>
            }
                
            </Paper>
            <Button variant="contained" color="primary" disableElevation style={{width:'50%',alignSelf:'center',margin:'15px',background:'#000246'}}>
              {lang.saveUser}
            </Button>
        </Container>

    )
}

export default Users
