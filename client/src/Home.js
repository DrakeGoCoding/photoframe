import React, { useState, useEffect } from 'react'
import Nav from './Nav'
import Fotter from './Footer'
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

import bgHome5 from './assets/bgHome5.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        top: '0px',
    }
}));




export default function Home() {
    const classes = useStyles();
    const [login, setLogin] = useState(true)
    return (
            <div className={classes.root}>
                <Nav />
                <Container1 />
                {login && <Album />}
                <hr />
                <FeedBack />
                <Fotter />
            </div>
    )
}


//Con1
const Container1 = () => {
    const classes = useStylesCon1();
    return (
        <Grid container className={classes.gridRoot} style={{ backgroundImage: `url(${bgHome5})` }} >
            <Grid item xs={8} className={classes.box} >
                <span className={classes.slogan}>MAKE YOUR PHOTO BETTER </span>
                <span className={classes.sub}>Iet's create your ideas...</span>
                <Button className={classes.btnEdit} variant="contained" ><b>Edit your photo now</b></Button>
            </Grid>
        </Grid>
    )
}

const useStylesCon1 = makeStyles((theme) => ({
    gridRoot: {
        backgroundSize: 'cover',
        height: '97vh',
        [theme.breakpoints.down('sm')]: {
            height: '80vh',
        },
        [theme.breakpoints.down('xs')]: {
            height: '35vh',
        },
    },
    slogan: {
        color: 'white',
        fontWeight: '600',
        marginLeft: '40px',
        fontSize: '40px',
        fontFamily: 'TimeNewRoman',
        marginTop: '50px',
        [theme.breakpoints.down('md')]: {
            fontSize: '30px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '22px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '13px',
        },
    },
    sub: {
        color: 'white',
        fontSize: '30px',
        marginTop: '10px',
        marginLeft: '10px',
        [theme.breakpoints.down('md')]: {
            fontSize: '25px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '13px',
        },
    },
    btnEdit: {
        marginTop: '28px',
        borderRadius: '15px',

        textTransform: 'uppercase',
        '&:hover': {
            backgroundColor: '#12a0d0',
            color: '#fefefe'
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '12px',
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '20px',
            fontSize: '5px',
        },
    },
    box: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
}));
//End Con1

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
            !isMatch_md ? (setSpacing(60), setHeight(290)) :
                (!isMatch_sm ? (setSpacing(40), setHeight(250)) :
                    (!isMatch_xs ? (setSpacing(20), setHeight(220)) :
                        (setSpacing(10), setHeight(100))))
        )
    }
    const [visiable, setVisiable] = useState(6)
    useEffect(() => { setAlbum() });
    return (
        <div className={classes.album} >
            <span className={classes.yourAlbum}>Your Album</span>
            <Grid container justify='center' >
                <div className={classes.main_album}>
                    <GridList cellHeight={height} cols={3} spacing={spacing}>
                        {dataImages.slice(0, visiable).map((data) => (
                            <GridListTile key={data.id}>
                                <img className={classes.img} src={data.image} alt={data.title} />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </Grid >
            {visiable < dataImages.length &&
                <Button variant='contained' className={classes.btnMore} size='small' onClick={() => setVisiable(visiable + 3)}>
                    More<ExpandMoreIcon />
                </Button>
            }

        </div>
    )
}

const useStylesAlbum = makeStyles((theme) => ({
    album: {
        width: '100%',
        marginTop: '3em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    yourAlbum: {
        fontSize: '28px',
        backgroundColor: '#28c4c3',
        color: '#fff',
        margin: '0.3em 0.3em 1em 0.3em',
        padding: '0.2em 1em 0.2em 1em',
        borderRadius: '15px',
    },
    main_album: {
        width: '80%',
    },
    img: {
        backgroundSize: 'cover',
        height: '100%',
        width: '100%'
    },
    btnMore: {
        backgroundColor: '#039be5',
        borderRadius: '15px',
        margin: '1.5em 0em 1.5em 0em ',
        paddingLeft: '15px'

    }
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
        <div className={classes.root}>

            <p className={classes.contactLabel}>Get in Touch with Us</p>
            <Grid className={classes.grid} container spacing={5}>
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
                                <InputAdornment position="start">
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
                                <InputAdornment position="start">
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
                                <InputAdornment position="start">
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
            <Button className={classes.btnSubmit} variant="contained" color="primary" onClick={submit} type="submit">SEND MESSAGE</Button>
        </div>
    )
}

const useStylesFeedBack = makeStyles((theme) => ({
    root: {
        width: '100%',
        textAlign: 'center',
        marginBottom: "1em"
    },
    grid: {
        width: '85%',
        margin: 'auto',
    },

    contactLabel: {
        fontSize: '28px',
        backgroundColor: '#28c4c3',
        color: '#fff',
        padding: '0.2em 0.6em 0.2em 0.6em',
        borderRadius: '15px',
        display: 'inline-block'
    },
    btnSubmit: {
        fontSize: 'large',
        padding: '0.8em 1.3em 0.8em 1.3em',
        borderRadius: '15px',
        margin: '1em 0em 1em 0em'
    }
}));

