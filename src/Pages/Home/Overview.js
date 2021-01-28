import { Container, Grid, Paper } from '@material-ui/core'
import React from 'react'
import {ConnectedUser}  from '../../App'
import CustomCard from '../../Components/CustomCard'
import LocalMallIcon from '@material-ui/icons/LocalMall';
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled';
import SyncProblemIcon from '@material-ui/icons/SyncProblem';
import { Doughnut, Line } from 'react-chartjs-2';
import useMonth from '../../Hooks/useMonth'
import UpdateIcon from '@material-ui/icons/Update';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
function Overview() {
    const context = React.useContext(ConnectedUser);
    const data = {
        labels: ['Day one', 'Day two', 'Day three', 'Day four','Day one', 'Day two', 'Day three', 'Day four','Day one', 'Day two', 'Day three', 'Day four','Day one', 'Day two', 'Day three'],
        datasets: [
          {
            label: '# Orders this day',
            data: [12, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 3,12, 19, 3],
            fill: true,
            backgroundColor: 'rgba(36,38,76,0.3)',
            borderColor: 'rgb(36,38,76)',
          },
        ],
      };

      const data2 = {
        labels: ['Client one', 'Client two', 'Client three', 'Client four'],
        datasets: [
          {
            label: '# Client Orders',
            data: [8, 19, 53, 15],
            fill: false,
            backgroundColor: ['white','rgb(112,95,251)','rgb(77,201,184)','rgb(245,105,119)'],
            borderColor: ['white','rgb(112,95,251)','rgb(77,201,184)','rgb(245,105,119)'],
          },
        ],
      };

    //   const options = {
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true,
    //           },
    //         },
    //       ],
    //     },
    //   }


    console.log('MONTH IS ======>',useMonth())
      
    return (
            <Container maxWidth="lg" style={{display:'flex',flexDirection:'column',overflowY:'auto',height:'100%'}}>
                    <h3>Overview</h3>

                <Grid item md={12} style={{display:'flex',maxHeight:'153px'}}> 
                    <CustomCard type='Unfulfilled Orders' number={2408}>
                        <LocalMallIcon style={{fontSize:'40px',color:'white'}}/>
                    </CustomCard>
                    <CustomCard type='Refused Products' number={105}>
                        <SyncDisabledIcon style={{fontSize:'40px',color:'white'}}/>
                    </CustomCard>
                    <CustomCard type='Pending Products' number={301}>
                        <SyncProblemIcon style={{fontSize:'40px',color:'white'}}/>
                    </CustomCard>
                    <CustomCard type='Average order treatment time' number='3 Days'>
                        <UpdateIcon style={{fontSize:'40px',color:'white'}}/>
                    </CustomCard>
                </Grid>
                <div style={{display:'flex',marginTop:'35px',justifyContent:'space-around'}}>
                    <Grid item md={5}> 
                        <h3 style={{color:'rgb(36,38,76)'}}>Last 15 days Orders </h3>
                        <Paper elevation={3} style={{display:'flex',height:'285px',borderRadius:'10px',padding:'10px',background:'rgb(243,245,247)'}}>
                            <Line
                                // options={options}
                                redraw
                                data={data}
                            />
                        </Paper>
                    </Grid>

                    <Grid item md={5}>
 
                    <div style={{height:'20px',alignItems:'center',display:'flex',padding:'8px',width:'90%',justifyContent:'center',marginTop:'20px'}}>
                                <SupervisedUserCircleIcon  style={{marginRight:'10px',color:'rgb(36,38,76)',fontSize:'30px'}}/>
                                <span style={{fontSize:'20px',color:'#303030',color:'rgb(36,38,76)'}}><b>Top 4 Clients</b></span>
                            </div>
                        <Paper elevation={3} style={{display:'flex',height:'285px',borderRadius:'10px',padding:'10px',background:'rgb(243,245,247)',flexDirection:'column',marginTop:'18px'}}>
                           
                            <Grid item md={12} style={{marginTop:'10px'}}>
                                <Doughnut data={data2} />
                            </Grid>
                        </Paper>
                    </Grid>
                </div>
            </Container>
    )
}

export default Overview


// <div style={{background:'white',borderRadius:'5px',height:'20px',alignItems:'center',display:'flex',padding:'8px',width:'90%'}}>
//                                 <UpdateIcon style={{marginRight:'10px'}}/>
//                                 <span><b>Average order treatment time: </b> 2days</span>
//                             </div>