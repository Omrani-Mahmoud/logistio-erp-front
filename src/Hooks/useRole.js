// check the roles of the connected user


import React from 'react'
import useGetUser from './useGetUser'
import axios from 'axios'

function useRole(sections,section='') {


    if(typeof sections == 'string'){
        if(sections==='all')
            return true
    }
    if(sections?.length>0){
        let valid = false;
         sections.map(elem=>{
             console.log('elem',elem.name)
             console.log('sec',section)
            if(elem.name===section)
                valid = true
            
    })
    return valid
}
    else
    return null
}

export default useRole
