import React from 'react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button, TextField } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';

const lngc = window.localStorage.getItem('lang')?window.localStorage.getItem('lang'):'EN';
const lang = require(`../Language/${lngc}.json`);
function CustomSpan({label,value,textArea,disabled,input,type,handler=null,media,upload}) {



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

      const handleImageInputs  =(e)=>{
        const imgs = [];
        for (let index = 0; index < e.target.files.length; index++) {
          imgs.push(e.target.files[index])
        }

        // console.log(imgs)
        handler({type:type,value:imgs})
      }
    return (
        <section style={{display:'flex',flexDirection:'row',padding:'10px',alignItems:'center'}}>
            <span style={lableSpan} >{label}</span>
            { textArea ?
              <TextareaAutosize  disabled={disabled} aria-label="empty textarea" placeholder="Empty" defaultValue={value} rowsMin={4} onChange={(e)=>{handler({type:type,value:e.target.value})}} />
               :
               input?
               <TextField id="outlined-basic"  label="" variant="outlined"  size='small' defaultValue={value} onChange={(e)=>{handler({type:type,value:e.target.value})}} disabled={disabled} />
               :
               media?
                (<>
               <input id="outlined-basic" type='file'  label="" variant="outlined" multiple  size='small' defaultValue={value} onChange={(e)=>{handleImageInputs(e)}}/>
               {/* <input id="outlined-basic" type='file'  label="" variant="outlined" multiple  size='small' defaultValue={value} onChange={(e)=>{console.log(e.target.files[1])}}/> */}

              {/* onChange={(e)=>{handler({type:type,value:e.target.value})} */}
              
                {/* <Button style={{marginLeft:'30px'}} onClick={upload} variant="outlined" color="primary" size='small'>
                      {lang.upload_items}
                    </Button> */}
                </>)
               :
              <span style={valueSpan} >{value}</span>
            }
        </section>
    )
}

export default CustomSpan
