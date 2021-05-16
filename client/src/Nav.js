import React, { useState } from 'react'
import DrawerComponent from './DrawerComponent'
import { useHistory } from "react-router-dom";
import {
    makeStyles,
    useTheme,
    withStyles
} from '@material-ui/core/styles';
import { Link } from 'react-scroll'

import {
    useMediaQuery,
    Button,
    Toolbar,
    AppBar,
    ListItemText,
    Menu,
    MenuItem,
    useScrollTrigger,
    Slide
} from '@material-ui/core';

import logo from './assets/logo.png'

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

interface props {
    children: React.ReactElement;
}
function HideOnSrcoll({ children }: props) {
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction={"down"} in={!trigger}>
            {children}
        </Slide>
    )
}

const useStyles = makeStyles((theme) => ({
    bar: {
        background: '#f3f3f3',
        width: '100%',
        height: 'auto',
        padding: '10px 0px 10px 0px',
        [theme.breakpoints.down('xs')]: {
            padding: '0',
        },
    },
    toolbar: {
        width: '85%',
        margin: 'auto',
        top: '0',
    },
    btnAccount: {
        color: '#039be5',
        background: 'rgba(255,255,255,0)',
        position: 'absolute',
        right: '0',
        width: 'auto',
        borderRadius: '10px',
        textTransform: 'uppercase',
        '&:hover': {
            backgroundColor: '#12a0d0',
            color: '#fefefe'
        },
        [theme.breakpoints.down('md')]: {
            fontSize: 'small'
        }
    },
    wrapBtnNUT: {
        width:'50%'
    },
    btnNUT: {
        textTransform: 'uppercase',
        color: '#039be5',
        marginLeft: '2.5em',
        fontWeight: '600',
        [theme.breakpoints.down('sm')]: {
            fontSize: 'small'
        }
    },
    nested: {
        paddingLeft: '10px'
    },
    logo: {
        height: 'auto',
        width: '10%',
        margin: '0em 5em 0em 0em',
        [theme.breakpoints.down('sm')]: {
            height: 'auto',
            width: '13%',
            margin: '0em 0em 0em 0em',
        },
        [theme.breakpoints.down('xs')]: {
            height: 'auto',
            width: '17%',
            margin: '0em 0em 0em 0em',
        },
    }
}));

export default function Nav() {
    let history = useHistory();

    const [login, setLogin] = useState(true)

    const classes = useStyles();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));


    const [anchorElAC, setAnchorElAC] = useState(null);


    const handleClickAccount = (event) => {
        setAnchorElAC(event.currentTarget);
    };
    const handleCloseAccount = () => {
        setAnchorElAC(null);
    };

    return (
        <HideOnSrcoll>
            <AppBar className={classes.bar} >
                <Toolbar className={classes.toolbar}>
                    <img Button onClick={() => history.push("/")} alt="Logo" src={logo} className={classes.logo} />
                    {isMatch ? (<><DrawerComponent /></>)
                        : (
                            <div className={classes.wrapBtnNUT}>
                                <Link
                                    activeClass="active"
                                    to="container" spy={true}
                                    smooth={true}
                                    offset={0}
                                    duration={500}
                                    delay={100}>
                                    <Button className={classes.btnNUT}>Home</Button>
                                </Link>
                                <Link
                                    className={classes.btnNUT}
                                    activeClass="active"
                                    to="album" spy={true}
                                    smooth={true}
                                    offset={0}
                                    duration={500}
                                    delay={100}>
                                    <Button className={classes.btnNUT}>Album</Button>
                                </Link>
                                <Link
                                    className={classes.btnNUT}
                                    activeClass="active"
                                    to="feedback" spy={true}
                                    smooth={true}
                                    offset={0}
                                    duration={500}
                                    delay={100}>
                                    <Button className={classes.btnNUT}>Contact</Button>
                                </Link>
                                {login ? (
                                    <>
                                        <Button className={classes.btnAccount} variant="outlined" onClick={handleClickAccount}>account</Button>
                                        <StyledMenu anchorEl={anchorElAC} open={Boolean(anchorElAC)} onClose={handleCloseAccount}>
                                            <StyledMenuItem>
                                                <ListItemText className={classes.btnLeft} primary="Profile" />
                                            </StyledMenuItem>
                                            <StyledMenuItem>
                                                <ListItemText className={classes.btnLeft} primary="Log out" />
                                            </StyledMenuItem>
                                        </StyledMenu>
                                    </>)
                                    : (
                                        <Button size="nomal" variant="outlined" color="primary" className={classes.btnAccount} >LOGIN</Button>
                                    )}
                            </div>
                        )}
                </Toolbar>
            </AppBar>
        </HideOnSrcoll>
    )
}
