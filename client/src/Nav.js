import React, { useState } from 'react'
import './css/Nav.css'
import DrawerComponent from './DrawerComponent'
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useMediaQuery, Button, Toolbar, AppBar } from '@material-ui/core';
import logo from './assets/logo.png'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    bar: {
        background: '#fff',
        left: '0',
        right: '0',
        width: '100%',
        height:'auto',
        padding: '10px 0 1% 0'

    },
    
    btnAbout: {
        left: '2.2rem',
        width: '4rem',
        textTransform: 'none',
        fontFamily: 'sans-serif',
    },
    btnLogin: {
        color: '#079de0',
        position: 'absolute',
        right: '2rem',
        width: '5.9rem',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#12a0d0',
            color: '#fefefe'
        }
    },
    btnAccount: {
        color: '#079de0',
        position: 'absolute',
        right: '10rem',
        width: '5.9rem',
        fontSize:'small',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#12a0d0',
            color: '#fefefe'
        }
    },
    btnLogOut: {
        color: '#079de0',
        position: 'absolute',
        right: '2rem',
        width: '5.9rem',
        fontSize:'small',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#12a0d0',
            color: '#fefefe'
        }
    }

}));

export default function Nav() {

    const [login, setLogin] = useState(true)

    const classes = useStyles();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <div className={classes.root}>
            <AppBar className={classes.bar} >
                <Toolbar >
                    <img className={classes.logoBTN} onClick={()=> console.log("heelo")} alt="Logo" src={logo} style={{height: 'auto', width: '11%'}} />
                    {isMatch ? (<><DrawerComponent /></>) 
                    : (
                        <>
                            <Button className={classes.btnAbout}>About</Button>
                            {login ? (
                                <>
                                <Button variant="outlined" className={classes.btnAccount}>ACCOUNT</Button>
                                <Button variant="outlined" className={classes.btnLogOut}> LOG OUT</Button>
                                </>) 
                            : (
                                <Button variant="outlined" color="primary" className={classes.btnLogin}>LOGIN</Button>
                            )}
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}
