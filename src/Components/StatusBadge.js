// badge status here
// custom component
import React from 'react'

function StatusBadge({status='-',align='left',marginBottom='0px'}) {

    const _getColor = ()=>{
        switch (status.toLowerCase()) {
            case 'pending':
                return 'rgb(250,192,62)'
                case 'processing':
                    return '#717786'
                    case 'validated':
                        return 'rgb(57,169,189)'
            default:
                return null
        }
    }
    return (
       <span style={{background:_getColor(),padding:'4px',borderRadius:'5px',color:status!=='-'?'white':'black',fontWeight:'bold',fontSize:'12px',textAlign:align,marginBottom:marginBottom}}>{status?status:'-'}</span>
    )
}

export default StatusBadge
