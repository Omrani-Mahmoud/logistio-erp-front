// return month names

import React from 'react'

function useMonth() {
    const months = [
        {
            key:0,
            name: "January"
        },
        {
            key:1,
            name: "February"
        },
        {
            key:2,
            name: "March"
        },
        {
            key:3,
            name: "April"
        },
        {
            key:4,
            name: "May"
        },
        {
            key:5,
            name: "June"
        },
        {
            key:6,
            name: "July"
        },
        {
            key:7,
            name: "August"
        },
        {
            key:8,
            name: "September"
        },
        {
            key:9,
            name: "October"
        },
        {
            key:10,
            name: "November"
        },
        {
            key:11,
            name: "December"
        }
    ]
    const get_month = ()=>{
        let  currentMonth = new Date().getMonth();
       return  months.filter(elem=> {
            return elem.key===currentMonth
        })[0].name

    }

    return  get_month()
}

export default useMonth
