import React from 'react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

function CustomSpan({label,value,textArea,disabled}) {

    const lableSpan = {
        color:'#303030',
        fontWeight:'bold',

      }
    
      const valueSpan = {
        color:'#303030',
        marginLeft:'10px',

        opacity:'85%',
      }
    return (
        <section style={{display:'flex',flexDirection:'row',padding:'10px'}}>
            <span style={lableSpan} >{label}</span>
            { textArea ?
              <TextareaAutosize  disabled={disabled} aria-label="empty textarea" placeholder="Empty" defaultValue={value} rowsMin={4} />
               :
              <span style={valueSpan} >{value}</span>
            }
        </section>
    )
}

export default CustomSpan
