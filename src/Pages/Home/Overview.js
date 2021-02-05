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
import '../../Assets/css/Overview.css';
import axios from 'axios'
import useToken from '../../Hooks/useToken';
import {uri} from "../../Url_base";

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../../Language/${lngc}.json`);

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
    const [setToken,getToken] = useToken();
    const [productsStats, setproductsStats] = useState({});
    const [toggleDate, setToggleDate] = useState(false);
    const [currentFocus, setCurrentFocus] = useState([]);
    const [chosedDate, setChosedDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }]);
      const [activeBtn, setActiveBtn] = useState(window.localStorage.getItem("activeBtn") ? JSON.parse(window.localStorage.getItem("activeBtn")) : {
        today: 1, last7days: 0, last30day: 0, last60day: 0, month: 0, other: 0
      });
    useOutsideAlerter(wrapperRef, setToggleDate);

    const mnths = [{ num: 0, add: 2 },
    { num: 1, add: 0 },
    { num: 2, add: 2 },
    { num: 3, add: 1 },
    { num: 4, add: 2 },
    { num: 5, add: 1 },
    { num: 6, add: 2 },
    { num: 7, add: 2 },
    { num: 8, add: 1 },
    { num: 9, add: 2 },
    { num: 10, add: 1 },
    { num: 11, add: 2 }
    ]

  const getToAddOnMonths = (int) => {
    let res = 0;
    mnths.map(x => {
      if (x.num === int)
        res = x.add;
    })
    return res
  }
     // Handl the choice of the user , date buttons : today , last 7 days , ect ...
  const buttonHandler = (startDate, endDate) => {
    setChosedDate([{
      startDate: startDate,
      endDate: endDate,
      key: 'selection'
    }]);
    setToggleDate(false)
    window.localStorage.setItem("start", startDate);
    window.localStorage.setItem("end", endDate);
  };
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

  


    const _fetchProducts = (mounted)=>{
        // setLoading(true);
        console.log('REFETCH HERE ------>')
        axios.get(`${uri.link}/stats/overall`,{
            headers:{'auth-token':`${getToken()}`}
        })
           .then(function (response) {
            //    setLoading(false)
               if(mounted){
                    console.log('DASHBOARD DATA',response.data)
                    // setOrders(response.data)
                    setproductsStats(response.data)
               }
           })
           .catch(function (error) {
               // handle error
            //    setLoading(false)
               console.log(error);
           });
    }

    
    React.useEffect(() => {
        let mounted = true;
        _fetchProducts(mounted)
       return ()=>{
           mounted=false
       }
    }, [])


      useEffect(() => {
          if(currentFocus[1]===0)
            setToggleDate(false)
      }, [currentFocus])
      

      console.log('CHOSED',chosedDate)
    return (
            <Container maxWidth="lg" style={{display:'flex',flexDirection:'column',overflowY:'auto',height:'100%'}}>
                    <h3>Overview</h3>

                <Grid item md={12} style={{display:'flex',maxHeight:'153px'}}> 
                    <CustomCard type={lang.unfill_orders} number={2408}>
                        <LocalMallIcon style={{fontSize:'40px',color:'rgb(36,38,76)'}}/>
                    </CustomCard>
                    <CustomCard type={lang.refused_products} number={productsStats.refused_prods}>
                        <SyncDisabledIcon style={{fontSize:'40px',color:'rgb(36,38,76)'}}/>
                    </CustomCard>
                    <CustomCard type={lang.pending_products} number={productsStats.pending_prods}>
                        <SyncProblemIcon style={{fontSize:'40px',color:'rgb(36,38,76)'}}/>
                    </CustomCard>
                    <CustomCard type={lang.order_time} number='3 Days'>
                        <UpdateIcon style={{fontSize:'40px',color:'rgb(36,38,76)'}}/>
                    </CustomCard>
                </Grid>
                <div ref={wrapperRef} style={{marginTop:'50px',width:'220px'}}>
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
                    <div className="calendarDiv">
                    <div className="btnCalendarContainer">
                      <Button

                        className={activeBtn.today ? "dateBtns activeBtnDate" : "dateBtns"}
                        onClick={() => {
                          buttonHandler(new Date(new Date()),

                            new Date(new Date()));
                          ;
                          setActiveBtn({ today: 1, last7days: 0, last30day: 0, last60day: 0, month: 0, other: 0 })
                          window.localStorage.setItem("activeBtn", JSON.stringify({ today: 1, last7days: 0, last30day: 0, last60day: 0, month: 0, other: 0 }));
                        }}
                      >
                        Today
      </Button>

                      <Button

                        className={activeBtn.last7days ? "dateBtns activeBtnDate" : "dateBtns"}
                        onClick={() => {
                          buttonHandler(
                            new Date(new Date(
                              new Date().getTime() - 6 * 24 * 60 * 60 * 1000
                            )),
                            new Date(new Date())
                          );
                          setActiveBtn({ today: 0, last7days: 1, last30day: 0, last60day: 0, month: 0, other: 0 })
                          window.localStorage.setItem("activeBtn", JSON.stringify({ today: 0, last7days: 1, last30day: 0, last60day: 0, month: 0, other: 0 }));

                        }}
                      >
                        Last 7 Days
      </Button>

                      <Button

                        className={activeBtn.last30day ? "dateBtns activeBtnDate" : "dateBtns"}
                        onClick={() => {
                          buttonHandler(
                            new Date(new Date(
                              new Date().getTime() - 29 * 24 * 60 * 60 * 1000
                            )),
                            new Date(new Date())
                          );
                          setActiveBtn({ today: 0, last7days: 0, last30day: 1, last60day: 0, month: 0, other: 0 })
                          window.localStorage.setItem("activeBtn", JSON.stringify({ today: 0, last7days: 0, last30day: 1, last60day: 0, month: 0, other: 0 }));

                        }}
                      >
                        Last 30 Days
      </Button>

                      <Button

                        className={activeBtn.last60day ? "dateBtns activeBtnDate" : "dateBtns"}
                        onClick={() => {
                          buttonHandler(
                            new Date(new Date(
                              new Date().getTime() - 59 * 24 * 60 * 60 * 1000
                            )),
                            new Date(new Date())
                          );
                          setActiveBtn({ today: 0, last7days: 0, last30day: 0, last60day: 1, month: 0, other: 0 })
                          window.localStorage.setItem("activeBtn", JSON.stringify({ today: 0, last7days: 0, last30day: 0, last60day: 1, month: 0, other: 0 }));

                        }}
                      >
                        Last 60 Days
      </Button>

                      <Button

                        className={activeBtn.month ? "dateBtns activeBtnDate" : "dateBtns"}
                        onClick={() => {
                          buttonHandler(
                            new Date(new Date(
                              new Date().getFullYear(),
                              new Date().getMonth(),
                              getToAddOnMonths(new Date().getMonth())
                            )),

                            new Date(new Date())
                          );
                          setActiveBtn({ today: 0, last7days: 0, last30day: 0, last60day: 0, month: 1, other: 0 })
                          window.localStorage.setItem("activeBtn", JSON.stringify({ today: 0, last7days: 0, last30day: 0, last60day: 0, month: 1, other: 0 }));

                        }}
                      >
                        This month
      </Button>
                    </div>
                    </div>    
                </div>
                </div>)}
                </div>
               
                <div style={{display:'flex',marginTop:'25px',justifyContent:'space-around'}}>
                    <Grid item md={6} style={{padding:'10px'}}> 
                        {/* <h3 style={{color:'rgb(36,38,76)'}}>Last 15 days Orders </h3> */}
                        <Paper elevation={3} style={{display:'flex',height:'340px',borderRadius:'10px',background:'rgb(243,245,247)',flexDirection:'column',padding:'10px 10px 30px 10px'}}>
                            <section style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center',height:'30px',marginBottom:'10px'}}>
                                <h3 style={{color:'rgb(36,38,76)'}}>Last 15 days Orders </h3>
                                <section style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <div style={{background:'rgb(36,38,76)',width:'7px',height:'7px',borderRadius:'100%',marginRight:'5px'}}></div>
                                    <span style={{fontSize:'13px',color:'rgb(36,38,76)'}}>{lang.orders_this_day}</span>
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
 
                        <Paper elevation={3} style={{display:'flex',height:'340px',borderRadius:'10px',background:'rgb(243,245,247)',flexDirection:'column',padding:'10px 10px 30px 10px'}}>
                           
                    <div style={{height:'20px',alignItems:'center',display:'flex',padding:'8px',width:'90%',justifyContent:'flex-start'}}>
                                <SupervisedUserCircleIcon  style={{marginRight:'10px',color:'rgb(36,38,76)',fontSize:'30px'}}/>
                                <span style={{fontSize:'20px',color:'#303030',color:'rgb(36,38,76)'}}><b>{lang.top_clients}</b></span>
                            </div>
                            <Grid item md={12} style={{marginTop:'10px',display:'flex'}}>
                                <secion style={{width:'75%',justifyContent:'center',alignItems:'center',display:'flex'}}>
                                    <Doughnut data={data2} options={optionsPie}/>
                                </secion>
                                <section style={{width:'25%',justifyContent:'center',alignItems:'flex-start',display:'flex',flexDirection:'column'}}>
                                    <li  style={{color:'#16193B',fontSize:'25px',listStylePosition:'inside'}}><span style={{fontSize:'15px',color:'rgb(36,38,76)'}}>{lang.client1}</span></li>
                                    <li  style={{color:'#35478C',fontSize:'25px'}}><span style={{fontSize:'15px',color:'rgb(36,38,76)'}}>{lang.client2}</span></li>
                                    <li  style={{color:'#4E7AC7',fontSize:'25px'}}><span style={{fontSize:'15px',color:'rgb(36,38,76)'}}>{lang.client3}</span></li>
                                    <li  style={{color:'#7FB2F0',fontSize:'25px'}}><span style={{fontSize:'15px',color:'rgb(36,38,76)'}}>{lang.client4}</span></li>
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