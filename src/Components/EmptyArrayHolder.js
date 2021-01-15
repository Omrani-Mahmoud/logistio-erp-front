import React from 'react'

function EmptyArrayHolder({text}) {
    return (
        <div style={{display:'flex',flex:'',justifyContent:'center',alignItems:'center'}}>
            <h1 style={{fontWeight:'bolder',fontSize:'23',color:'#bdbdbd',opacity:'70%'}}>
                {text}🤭
            </h1>
        </div>
    )
}

export default EmptyArrayHolder
