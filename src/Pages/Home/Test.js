import React from 'react'
import {ConnectedUser}  from '../../App'
import Loader from '../../Components/Loader'
function Test() {
    const context = React.useContext(ConnectedUser)
    console.log('name',context[0].name)

    return (
        <div>
            <h1>{context[0].userName}</h1>
           
        </div>
    )
}

export default Test
