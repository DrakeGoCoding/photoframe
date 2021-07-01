import React, { useState, useEffect } from 'react'
import DrawerComponent from './DrawerComponent'
import { useHistory } from "react-router-dom";
import {
    makeStyles,
    useTheme,
    withStyles
} from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';

import {
    useMediaQuery,
    Button,
    Toolbar,
    AppBar,
    ListItemText,
    Menu,
    MenuItem,
    useScrollTrigger,
    Slide,
    IconButton,
} from '@material-ui/core';

import logo from './assets/logo.png'
import { uploadPhoto } from './Axios'

const StyledMenu = withStyles({

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
        background: '#fff',
        width: '100%',
        padding: '15px 0px 15px 0px',
        [theme.breakpoints.down('xs')]: {
            padding: '0',
        }
    },
    toolbar: {
        width: '96%',
        margin: 'auto',
        top: '0',
    },
    wrapBtnNUT: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnAccount: {
        color: '#039be5',
        [theme.breakpoints.down('md')]: {
            fontSize: 'small'
        }
    },
    btncreateEdit: {
        color: '#fff',
        backgroundColor: '#039be5',
        borderRadius: '4px',
        textTransform: 'uppercase',
        fontWeight: '600',
        height: '40px',
        '&:hover': {
            backgroundColor: '#0485c3',
            color: '#fefefe'
        },
        [theme.breakpoints.down('md')]: {
            fontSize: 'small'
        }
    },

    btnNUT: {
        textTransform: 'uppercase',
        color: '#039be5',
        marginLeft: '1.5vw',
        fontWeight: '600',
        [theme.breakpoints.down('sm')]: {
            fontSize: 'small'
        }
    },
    logo: {
        height: 'auto',
        width: '10%',
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

    },
    inputA: {
        display: 'none',
    },
}));

export default function Nav() {
    let history = useHistory();

    const [token, setToken] = useState('')

    useEffect(() => {
        const accessToken = localStorage.getItem('token')
        setToken(accessToken || '');
    }, [])

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

    const changePhoto = e => {
        const file = e.target.files[0]
        if (!file) return;
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = async () => {
            const previewSource = reader.result
            if (!previewSource) return
            try {
                const result = await uploadPhoto({ data: previewSource })
                history.push(`/editor/${result.data.cloudinaryId}`)
            } catch (error) {
                console.log(error.response.data.error)
            }
        }
    }

    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <HideOnSrcoll>
            <AppBar className={classes.bar} >
                <Toolbar className={classes.toolbar}>
                    <img alt="Logo" src={logo} className={classes.logo} />
                    {isMatch ? (<><DrawerComponent /></>)
                        : (
                            <div className={classes.wrapBtnNUT}>
                                <div className={classes.btnLeft}>
                                    <Button className={classes.btnNUT}>Home</Button>
                                    <Button className={classes.btnNUT}>Tips</Button>
                                    <Button className={classes.btnNUT}>Blog</Button>
                                    <Button className={classes.btnNUT}>Contact</Button>
                                </div>
                                {token ? (
                                    <div className={classes.btnRight}>
                                        <IconButton className={classes.btnAccount}>
                                            <HelpIcon fontSize="large" />
                                        </IconButton>
                                        <IconButton className={classes.btnAccount}>
                                            <SettingsIcon fontSize="large" />
                                        </IconButton>
                                        <div style={{ margin: '0 12px' }}>
                                            <input
                                                accept="image/*"
                                                className={classes.inputA}
                                                id="contained-button-file"
                                                type="file"
                                                onChange={changePhoto}
                                            />
                                            <label htmlFor="contained-button-file">
                                                <Button variant="contained" color="primary" component="span">
                                                    Upload
                                                </Button>
                                            </label>

                                        </div>
                                        <IconButton className={classes.btnAccount}>
                                            <AccountCircleIcon fontSize="large" onClick={handleClickAccount} />
                                        </IconButton>
                                        <StyledMenu style={{ float: 'left' }} anchorEl={anchorElAC} open={Boolean(anchorElAC)} onClose={handleCloseAccount}>
                                            <StyledMenuItem>
                                                <ListItemText className={classes.btnLeft} onClick={() => history.push("/settings")} primary="Account Setting" />
                                            </StyledMenuItem>
                                            <StyledMenuItem>
                                                <ListItemText className={classes.btnLeft} onClick={logout} primary="Log out" />
                                            </StyledMenuItem>
                                        </StyledMenu>
                                    </div>)
                                    : (
                                        <Button size="medium" variant="outlined" color="primary" className={classes.btnAccount} onClick={() => history.push("/login")}>LOGIN</Button>
                                    )}
                            </div>
                        )}
                </Toolbar>
            </AppBar>
        </HideOnSrcoll>
    )
}
