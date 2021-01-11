import React from 'react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { TextField } from '@material-ui/core';

function CustomSpan({label,value,textArea,disabled,input,type,handler=null}) {



    const lableSpan = {
        color:'#303030',
        fontWeight:'bold',
        marginRight:'5px'

      }
    
      const valueSpan = {
        color:'#303030',
        marginLeft:'10px',

        opacity:'85%',
      }
    return (
        <section style={{display:'flex',flexDirection:'row',padding:'10px',alignItems:'center'}}>
            <span style={lableSpan} >{label}</span>
            { textArea ?
              <TextareaAutosize  disabled={disabled} aria-label="empty textarea" placeholder="Empty" defaultValue={value} rowsMin={4} onChange={(e)=>{handler({type:type,value:e.target.value})}} />
               :
               input?
               <TextField id="outlined-basic" label="" variant="outlined"  size='small' defaultValue={value} onChange={(e)=>{handler({type:type,value:e.target.value})}} disabled={disabled} />
               :
              <span style={valueSpan} >{value}</span>
            }
        </section>
    )
}

export default CustomSpan