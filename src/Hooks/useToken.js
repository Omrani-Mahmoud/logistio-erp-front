import React from 'react'


function useToken() {
    const token = window.localStorage.getItem('erpT')
    const setToken = (givenToken)=>{
            window.localStorage.setItem('erpT',givenToken)
        return 
    }
    const getToken = ()=>{
        return token
    }
    return [setToken,getToken]  
}

export default useToken