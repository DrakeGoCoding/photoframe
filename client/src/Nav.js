import React, { useState } from 'react'
import './css/Nav.css'
import DrawerComponent from './DrawerComponent'
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

import { useMediaQuery, Button, Toolbar, AppBar, ListItemText, Menu, MenuItem } from '@material-ui/core';
import logo from './assets/logo.png'
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu 
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({}))(MenuItem);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    bar: {
        background: '#ffffff',
        left: '0',
        right: '0',
        width: '100%',
        height: 'auto',
        padding: '10px 0 1% 0'
    },

    btnAccount: {
        color: '#079de0',
        position: 'absolute',
        right: '2rem',
        width: 'auto',
        textTransform: 'uppercase',
        '&:hover': {
            backgroundColor: '#12a0d0',
            color: '#fefefe'
        },
        [theme.breakpoints.down('sm')]:{
            fontSize: 'small'
        }
    },

    btnNUT: {
        marginLeft: '1em',
        textTransform: 'uppercase',
        [theme.breakpoints.down('sm')]:{
            fontSize: 'small'
        }
     },

     nested: {
        paddingLeft: '10px'
     }

}));

export default function Nav() {

    const [login, setLogin] = useState(true)

    const classes = useStyles();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('xs'));

    const [open, setOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElAC, setAnchorElAC] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const handleClickAccount = (event) => {
        setAnchorElAC(event.currentTarget);
    };

    const handleCloseAccount = () => {
        setAnchorElAC(null);
    };


    return (
        <div className={classes.root}>
            <AppBar className={classes.bar} >
                <Toolbar >
                    <img alt="Logo" src={logo} style={{ height: 'auto', width: '11%', marginRight: '3em' }} />
                    {isMatch ? (<><DrawerComponent /></>)
                        : (
                            <div>
                                <Button className={classes.btnNUT} size="large" color="primary" onClick={handleClick} >more
                                {open ? <ExpandLess /> : <ExpandMore />}
                                </Button>
                                <StyledMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClick={handleClose} onClose={handleClose}>
                                    <StyledMenuItem>
                                        <ListItemText primary="Contact" />
                                    </StyledMenuItem>
                                    <StyledMenuItem>
                                        <ListItemText primary="Guide" />
                                    </StyledMenuItem>
                                    <StyledMenuItem>
                                        <ListItemText primary="Tips" />
                                    </StyledMenuItem>
                                </StyledMenu>
                                <Button className={classes.btnNUT} size="large" color="primary">about</Button>
                                {login ? (
                                    <>
                                        <Button className={classes.btnAccount} variant="outlined" onClick={handleClickAccount} >account
                                        </Button>
                                        <StyledMenu  anchorEl={anchorElAC} open={Boolean(anchorElAC)} onClose={handleCloseAccount}>
                                            <StyledMenuItem>
                                                <ListItemText className={classes.btnLeft} primary="Profile" />
                                            </StyledMenuItem>
                                            <StyledMenuItem>
                                                <ListItemText className={classes.btnLeft} primary="Log out" />
                                            </StyledMenuItem>
                                        </StyledMenu>
                                    </>)
                                    : (
                                        <Button variant="outlined" color="primary" className={classes.btnAccount}>LOGIN</Button>
                                    )}
                            </div>
                        )}
                </Toolbar>
            </AppBar>
        </div>
    )
}
