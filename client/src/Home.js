import React, { useState, useEffect } from 'react'
import Nav from './Nav'
import Footer from './Footer';
import {
    makeStyles,
    Button,
    Grid,
    GridList,
    GridListTile,
    useTheme,
    useMediaQuery,
    TextField,
    InputAdornment
} from '@material-ui/core';
import dataImages from './dataImg.json';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

import './index.css'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        top: '0px',
    }
}));

export default function Home() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Nav />
            <Album />
            <FeedBack />
            <Footer />
        </div>
    )
}


//Album
const Album = () => {
    const classes = useStylesAlbum();
    const theme = useTheme();

    const isMatch_md = useMediaQuery(theme.breakpoints.down('md'));
    const isMatch_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const isMatch_xs = useMediaQuery(theme.breakpoints.down('xs'));
    const [height, setHeight] = useState('')
    const [spacing, setSpacing] = useState('')
    const setAlbum = () => {
        return (
            !isMatch_md ? (setSpacing(50), setHeight(210)) :
                (!isMatch_sm ? (setSpacing(40), setHeight(250)) :
                    (!isMatch_xs ? (setSpacing(20), setHeight(220)) :
                        (setSpacing(10), setHeight(100))))
        )
    }
    const [visiable, setVisiable] = useState(6)
    useEffect(() => { setAlbum() });
    const [showDot, setShowDot] = useState(false)
    return (
        <div id="album" className={classes.album} >
            <Grid container justify='center' >
                <div className={classes.main_album}>
                    <p className={classes.yourAlbum}>Your Album</p>
                    <GridList cellHeight={height} cols={5} spacing={spacing}>
                        {dataImages.slice(0, visiable).map((data) => (
                            <GridListTile className={classes.gridListTile} key={data.id}  >
                                <img className={classes.img} src={data.image} alt={data.title} onMouseOver={() => setShowDot(true)} onMouseOut={() => setShowDot(false)}/>
                                {showDot && <span className={classes.moreImg}>
                                    <IconButton aria-label="3dot" className={classes.iconDot}>
                                        <MoreHorizIcon fontSize="medium" />
                                    </IconButton>
                                </span>}
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </Grid >
            {visiable < dataImages.length &&
                <Button variant='contained' className={classes.btnMore} size='small' onClick={() => setVisiable(visiable + 3)}>
                    More
                </Button>
            }

        </div>
    )
}

const useStylesAlbum = makeStyles((theme) => ({
    album: {
        width: '100%',
        marginTop: '97px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    yourAlbum: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#000',
        margin: '1em 0em 1em 0em',
        borderRadius: '15px',
        fontFamily: 'Quicksand',

    },
    main_album: {
        width: '92%',
    },
    gridListTile: {
        position: 'relative',
        
    },
    img: {
        backgroundSize: 'cover',
        height: '100%',
        width: '100%',
        borderRadius: '10px',
        cursor: 'pointer',
        '&:hover': {

        },
    },
    moreImg: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        padding: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: '#039be5',
        }
    },
    iconDot: {
        padding: '0',
        '&:hover': {
            color:'#ffffff',
        }
    },
    btnMore: {
        backgroundColor: '#039be5',
        borderRadius: '5px',
        margin: '2em 0em 1.5em 0em ',
        padding: '0.5rem 1rem',
        color: '#fff',
        fontSize: 'large'
    },

}));


//FeedBack
const FeedBack = () => {
    const classes = useStylesFeedBack();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({
        errName: '',
        errEmail: '',
        errPhone: '',
        errMessage: ''
    })

    const changeName = (e) => setName(e.target.value);
    const changeEmail = (e) => setEmail(e.target.value)
    const changePhone = (e) => setPhone(e.target.value)
    const changeMassage = (e) => setMessage(e.target.value)

    const validation = () => {
        let isErr = false;
        const errors = {};

        if (!name.trim()) {
            isErr = true;
            errors.errName = "Name is required"
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            isErr = true;
            errors.errEmail = "Email is incorrect"
        }
        if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(phone)) {
            isErr = true;
            errors.errPhone = "Phone is incorrect"
        }
        if (!message) {
            isErr = true;
            errors.errMessage = "Message is required"
        }

        if (isErr) {
            setErrors({
                ...errors
            })
        }
        return isErr;
    }

    const submit = () => {
        const err = validation();
        if (!err) {
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
            setErrors("");
        }
    }
    return (
        <div id="feedback" className={classes.root}>
            <span className={classes.contactLabel}>Get in Touch with Us</span>
            <Grid className={classes.gridForm} container spacing={5}>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        label="Your name"
                        value={name}
                        onChange={changeName}
                        required
                        helperText={errors.errName}
                        error={Boolean(errors.errName)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment className={classes.icon} position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        required
                        helperText={errors.errEmail}
                        error={Boolean(errors.errEmail)}
                        value={email}
                        onChange={changeEmail}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment className={classes.icon} position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        type="text"
                        fullWidth
                        label="Phone"
                        value={phone}
                        required
                        helperText={errors.errPhone}
                        error={Boolean(errors.errPhone)}
                        onChange={changePhone}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment className={classes.icon} position="start">
                                    <PhoneIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        fullWidth
                        value={message}
                        type="text"
                        helperText={errors.errMessage}
                        error={Boolean(errors.errMessage)}
                        onChange={changeMassage}
                        required
                        rowsMax={6}
                        multiline
                        label="Message"
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <div className={classes.bntSend}>
                <Button className={classes.btnSubmit} variant="contained" color="primary" onClick={submit} type="submit">Send</Button>
            </div>
        </div>
    )
}

const useStylesFeedBack = makeStyles((theme) => ({
    root: {
        width: '80%',
        margin: '2em auto 1em auto'
    },
    contactLabel: {
        fontSize: '24px',
        color: '#000',
        display: 'inline-block',
        fontWeight: '600'
    },
    gridForm: {
        marginTop: '0.5em',
        marginBottom: '0.5em'
    },
    bntSend: {
        width: '100%',
        textAlign: 'center'
    },
    btnSubmit: {
        backgroundColor: '#039be5',
        borderRadius: '5px',
        margin: '0.2em 0em 1.5em 0em ',
        padding: '0.5rem 1rem',
        color: '#fff',
        fontSize: 'large'
    },
    icon: {
        color: '#039be5'
    }
}));

