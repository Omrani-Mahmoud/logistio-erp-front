import React from 'react'
import useGetUser from './useGetUser'
import axios from 'axios'

function useRole(sections,section='') {


    if(typeof sections == 'string'){
        if(sections==='all')
            return true
    }
    if(sections.includes(section)){
        return true
    }
    else
    return null
}

export default useRole
