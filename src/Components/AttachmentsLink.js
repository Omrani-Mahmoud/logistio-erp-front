import React from 'react'
import psd from '../Assets/img/psdIcon.png';
import ai from '../Assets/img/aiIcon.png'
import jpeg from '../Assets/img/jpegIcon.png'
import jpg from '../Assets/img/jpgIcon.png'
import pdf from '../Assets/img/pdfIcon.png'
import eps from '../Assets/img/epsIcon.png'
import png from '../Assets/img/pngIcon.png'

import { Avatar } from '@material-ui/core';


function AttachmentsLink({link}) {

    const getExt = ()=>{
        let splited = link.split('.');
           switch (splited[splited.length-1]) {
               case 'psd':
                   return psd
                   case 'ai':
                        return ai
                        case 'jpeg':
                            return jpeg
                            case 'jpg':
                                return jpg
                                case 'pdf':
                                    return pdf
                                    case 'eps':
                                        return eps
                                        case 'png':
                                            return png
           
               default:
                  return null
           }
    }
  const openTab = ()=>{
    window.open(link,'_blank');
  }
    return (
        <Avatar alt={link} src={getExt()} variant='square'  style={{padding:'5px',cursor:'pointer'}} onClick={openTab}/>
    )
}

export default AttachmentsLink
