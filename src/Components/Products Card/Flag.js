import React from 'react'

function Flag({status}) {

    const getColor = ()=>{
        switch (status) {
            // case 'pending':
            //     return 'rgb(255,243,207)'
                case 'validated':
                    return 'rgb(57,169,189)'
                    case 'pending':
                        return 'rgb(250,192,62)'
                        case 'processing':
                            return '#717786'
                            case 'refused':
                            return 'black'
        
            default:
                return null 
        }
    }
    return (
        <span style={{textTransform:'capitalize',width:'50%',textAlign:'center',float:'right',alignSelf:'flex-end',background:getColor(),padding:'3px',marginTop:'-10px',marginRight:'-5px',borderTopRightRadius:'15px',fontSize:'13px',borderBottomLeftRadius:'15px',color:'white',fontWeight:'bold'}}>
            {status}
        </span>
    )
}

export default Flag
