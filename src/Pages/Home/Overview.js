import { Button, Container, Grid, Paper } from '@material-ui/core'
import React,{useEffect,useState,useRef} from 'react'
import {ConnectedUser}  from '../../App'
import CustomCard from '../../Components/CustomCard'
import LocalMallIcon from '@material-ui/icons/LocalMall';
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled';
import SyncProblemIcon from '@material-ui/icons/SyncProblem';
import { Doughnut, Line } from 'react-chartjs-2';
import useMonth from '../../Hooks/useMonth'
import UpdateIcon from '@material-ui/icons/Update';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


function useOutsideAlerter(ref, toggleDate) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          toggleDate(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

function Overview() {
    const wrapperRef = useRef(null);
    const [toggleDate, setToggleDate] = useState(false);
    const [currentFocus, setCurrentFocus] = useState([]);
    const [chosedDate, setChosedDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }]);
    useOutsideAlerter(wrapperRef, setToggleDate);

    const context = React.useContext(ConnectedUser);
    const data = {
        labels: ['13/02', '14/02', '15/02', '16/02','17/02', '18/02', '19/02', '20/02','21/02', '22/02', '23/02', '24/02','25/02', '26/02', '27/02'],
        datasets: [
          {
            label: '# Orders this day',
            data: [12, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 3,12, 19, 3],
            fill: false,
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
            backgroundColor: ['#16193B','#35478C','#4E7AC7','#7FB2F0'],
            borderColor: ['#16193B','#35478C','#4E7AC7','#7FB2F0'],
          },
        ],
      };
      var optionsLine = {
        responsive:true,
        // legend: {
        //     labels: {
        //        fontSize:12,
        //        fontColor:'rgb(36,38,76)'
        //     }
        // },
        legend:false,        

        
        scales: {
           
            yAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }   
            }]
        }
    }
    var optionsPie = {
        responsive:true,
        legend:false,        
    }

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

    const [state, setState] = React.useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ])

    console.log('MONTH IS ======>',useMonth())
      
    return (
            <Container maxWidth="lg" style={{display:'flex',flexDirection:'column',overflowY:'auto',height:'100%'}}>
                    <h3>Overview</h3>

                <Grid item md={12} style={{display:'flex',maxHeight:'153px'}}> 
                    <CustomCard type='Unfulfilled Orders' number={2408}>
                        <LocalMallIcon style={{fontSize:'40px',color:'rgb(36,38,76)'}}/>
                    </CustomCard>
                    <CustomCard type='Refused Products' number={105}>
                        <SyncDisabledIcon style={{fontSize:'40px',color:'rgb(36,38,76)'}}/>
                    </CustomCard>
                    <CustomCard type='Pending Products' number={301}>
                        <SyncProblemIcon style={{fontSize:'40px',color:'rgb(36,38,76)'}}/>
                    </CustomCard>
                    <CustomCard type='Order treatment time' number='3 Days'>
                        <UpdateIcon style={{fontSize:'40px',color:'rgb(36,38,76)'}}/>
                    </CustomCard>
                </Grid>
                <div ref={wrapperRef} style={{marginTop:'50px'}}>
            <Button style={{background:'#35478C',color:'white'}} variant='contained' onClick={() => setToggleDate(!toggleDate)} >

              {chosedDate[0] !== null
                ? [
                  chosedDate[0].startDate.toLocaleString("en", {
                    month: "short",
                  }),
                  " ",
                  chosedDate[0].startDate.getDate(),
                  " ",
                  chosedDate[0].startDate.getFullYear(),
                  "  -  ",
                  chosedDate[0].endDate && chosedDate[0].endDate.toLocaleString("en", {
                    month: "short",
                  }),
                  " ",
                  chosedDate[0].endDate && chosedDate[0].endDate.getDate(),
                  " ",
                  chosedDate[0].endDate && chosedDate[0].endDate.getFullYear(),
                ]
                : null}
            </Button>
                {toggleDate && ( 
                <div style={{ position: "absolute" }}>
                <div className="calenderDivStyle">
                    <div className="btnsCalendar">
                        <DateRange
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={false}
                            onRangeFocusChange={item => { setCurrentFocus(item) }}
                            onChange={item => { setChosedDate([item.selection]); }}
                            moveRangeOnFirstSelection={false}
                            ranges={chosedDate}
                            dragSelectionEnabled={true}
                            rangeColors={["#35478C"]}
                        />
                    </div>
                </div>
                </div>)}
                </div>
               
                <div style={{display:'flex',marginTop:'25px',justifyContent:'space-around'}}>
                    <Grid item md={6} style={{padding:'10px'}}> 
                        {/* <h3 style={{color:'rgb(36,38,76)'}}>Last 15 days Orders </h3> */}
                        <Paper elevation={3} style={{display:'flex',height:'300px',borderRadius:'10px',background:'rgb(243,245,247)',flexDirection:'column',padding:'10px 10px 30px 10px'}}>
                            <section style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center',height:'30px',marginBottom:'10px'}}>
                                <h3 style={{color:'rgb(36,38,76)'}}>Last 15 days Orders </h3>
                                <section style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <div style={{background:'rgb(36,38,76)',width:'7px',height:'7px',borderRadius:'100%',marginRight:'5px'}}></div>
                                    <span style={{fontSize:'13px',color:'rgb(36,38,76)'}}>Orders this day</span>
                                </section>
                            </section>
                            <Line
                                options={optionsLine}
                                redraw
                                data={data}
                            />
                        </Paper>
                    </Grid>

                    <Grid item md={6} style={{padding:'10px'}}>
 
                        <Paper elevation={3} style={{display:'flex',height:'300px',borderRadius:'10px',background:'rgb(243,245,247)',flexDirection:'column',padding:'10px 10px 30px 10px'}}>
                           
                    <div style={{height:'20px',alignItems:'center',display:'flex',padding:'8px',width:'90%',justifyContent:'flex-start'}}>
                                <SupervisedUserCircleIcon  style={{marginRight:'10px',color:'rgb(36,38,76)',fontSize:'30px'}}/>
                                <span style={{fontSize:'20px',color:'#303030',color:'rgb(36,38,76)'}}><b>Top 4 Clients</b></span>
                            </div>
                            <Grid item md={12} style={{marginTop:'10px',display:'flex'}}>
                                <secion style={{width:'75%',justifyContent:'center',alignItems:'center',display:'flex'}}>
                                    <Doughnut data={data2} options={optionsPie}/>
                                </secion>
                                <section style={{width:'25%',justifyContent:'center',alignItems:'flex-start',display:'flex',flexDirection:'column'}}>
                                    <li  style={{color:'#16193B',fontSize:'25px',listStylePosition:'inside'}}><span style={{fontSize:'15px',color:'rgb(36,38,76)'}}>Client one</span></li>
                                    <li  style={{color:'#35478C',fontSize:'25px'}}><span style={{fontSize:'15px',color:'rgb(36,38,76)'}}>Client two</span></li>
                                    <li  style={{color:'#4E7AC7',fontSize:'25px'}}><span style={{fontSize:'15px',color:'rgb(36,38,76)'}}>Client three</span></li>
                                    <li  style={{color:'#7FB2F0',fontSize:'25px'}}><span style={{fontSize:'15px',color:'rgb(36,38,76)'}}>Client four</span></li>
                                </section>
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