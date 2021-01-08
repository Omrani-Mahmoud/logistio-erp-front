import React from 'react'


function useToken() {
    const token = window.localStorage.getItem('erpT')
    const setToken = (givenToken)=>{
        return  window.localStorage.setItem('erpT',givenToken)
        
    }
    const getToken = ()=>{
        return token
    }
    return [setToken,getToken]  
}

export default useToken