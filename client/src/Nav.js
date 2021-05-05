import React, { useState } from 'react'
import './css/Nav.css'
import DrawerComponent from './DrawerComponent'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    useMediaQuery,
    Button,
    Toolbar,
    AppBar
} from '@material-ui/core';
//import MenuIcon from '@material-ui/icons/Menu';
import logo from './assets/logo.png'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    bar: {
        background: '#0276aa',
        position: 'static',
        width: 'auto',
        height: 'auto',
        padding: '10px 10px'

    },
    logo: {
        maxWidth: '120px',
        width: '80%',
        height: '80%'
    },
    btnAbout: {
        color: 'inherit',
        position: 'absolute',
        left: '180px',
        top: '15px',
        padding: '5px 5px',
        fontSize: '15px'
    },
    btnLogin: {
        color: 'inherit',
        position: 'absolute',
        right: '1%',
        top: '15px',
        padding: '5px 5px',
        fontSize: '15px'
    },
    btnAccount: {
        color: 'inherit',
        position: 'absolute',
        right: '100px',
        top: '15px',
        padding: '5px 5px',
        fontSize: '15px'
    },
    btnLogOut: {
        color: 'inherit',
        position: 'absolute',
        right: '1%',
        top: '15px',
        padding: '5px 5px',
        fontSize: '15px'
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
                    <img src={logo} alt="Kitty Katty!" className={classes.logo} />
                    {isMatch ? (
                        <DrawerComponent />
                    ) : (
                        <>
                            <Button className={classes.btnAbout}>
                                Contact
                            </Button>
                            {login ? (
                                <>
                                <Button color="inherit" className={classes.btnAccount}>
                                    ACCOUNT
                                </Button>
                                <Button color="inherit" className={classes.btnLogOut}>
                                    LOG OUT
                                </Button>
                                </>
                            ) : (
                                <Button color="inherit" className={classes.btnLogin}>
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
