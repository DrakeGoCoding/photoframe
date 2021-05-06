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
        position: 'fixed',
        left: '0',
        right: '0',
        width: 'auto',
        height: 'auto',
        padding: '10px 10px'

    },
    logoBTN: {
        maxWidth: '133px',
        width: '133px',
        height: '71px',
        backgroundImage: `url(${logo})`
    },
    btnAbout: {
        position: 'absolute',
        left: '200px',
        top: '15px',
        padding: '5px 10px',
        fontSize: '18px',
        textTransform: 'none',
        fontWeight: '400'
        //fontFamily: 'Open Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif'
    },
    btnLogin: {
        color: '#079de0',
        position: 'absolute',
        right: '1%',
        top: '15px',
        padding: '5px 20px',
        fontSize: '18px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#12a0d0',
            color: '#fefefe'
        }
    },
    btnAccount: {
        color: '#079de0',
        position: 'absolute',
        right: '120px',
        top: '15px',
        padding: '5px 8px',
        fontSize: '18px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#12a0d0',
            color: '#fefefe'
        }
    },
    btnLogOut: {
        color: '#079de0',
        position: 'absolute',
        right: '1%',
        top: '15px',
        padding: '5px 8px',
        fontSize: '18px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#12a0d0',
            color: '#fefefe'
        }
    }

}));


export default function Nav() {

    const [login, setLogin] = useState(false)

    const classes = useStyles();
    const theme = useTheme();
    //console.log(theme)

    const isMatch = useMediaQuery(theme.breakpoints.down('xs'));
    console.log(isMatch)
    return (
        <div className={classes.root}>
            <AppBar className={classes.bar} >
                <Toolbar>
                    <Button className={classes.logoBTN} />
                    {isMatch ? (
                        <DrawerComponent />
                    ) : (
                        <>
                            <Button className={classes.btnAbout}>
                                About
                            </Button>
                            {login ? (
                                <>
                                    <Button variant="outlined" className={classes.btnAccount}>
                                        ACCOUNT
                                </Button>
                                    <Button variant="outlined" className={classes.btnLogOut}>
                                        LOG OUT
                                </Button>
                                </>
                            ) : (
                                <Button variant="outlined" color="primary" className={classes.btnLogin}>
                                    Login
                                </Button>
                            )}
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}
