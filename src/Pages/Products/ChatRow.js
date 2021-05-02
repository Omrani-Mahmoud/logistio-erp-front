// chat row represent each msg froù the back

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import agentPlaceholder  from '../../Assets/img/Logistio - logomark.png'
import clientPlaceholder  from '../../Assets/img/client.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    }
  }));
function ChatRow({text,user}) {
    const classes = useStyles();

    return (
        <Grid item md={8} xs={12} style={{background:user?'#ebf3fa':'white',display:'flex',padding:'10px'}}>
            <Avatar alt="Remy Sharp" src={user?agentPlaceholder:clientPlaceholder} className={classes.small} />
            <p style={{marginLeft:'10px'}}>{text}</p>
        </Grid>
    )
}

export default ChatRow
