import React, {useState} from 'react'
import {
    makeStyles,
    Grid,
    TextField,
    InputAdornment,
    Button
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
// import bg from './assets/bg.jpg';

export default function Footer() {
    const classes = useStylesFooter();
    return (
        <div className={classes.root}>
            <Grid className={classes.Fott} container >
                <Grid item xs={6} >
                    <FeedBack />
                </Grid>
                <Grid item xs={3} >
                    <div className={classes.paper}>
                        <h3>About Us:</h3>
                        <p>(+84) 999999999</p>
                        <p>contact@photoframe.com</p>
                        <p>22C Thành Công, Ba Đình, Hà Nội</p>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.paper}>
                        <h3>Social networks:</h3>
                        <FacebookIcon fontSize="large" className={classes.icon} />
                        <InstagramIcon fontSize="large" className={classes.icon} />
                        <TwitterIcon fontSize="large" className={classes.icon} />
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.copyR}>
                    <hr />
                    <span>© 2021 Photo Frame</span>
                </Grid>
            </Grid>
        </div>
    )
}

const useStylesFooter = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: 'auto',
        paddingBottom: '15px',
        backgroundColor: '#cedbea',
        marginTop: '15px',
        // backgroundImage: `url(${bg})`,
        // backgroundSize:'cover',
    },
    Fott: {
        width: '100%',
        margin: 'auto',
        paddingTop: '15px',
    },
    paper: {
        color: "#000",
        fontSize: '15px',
        marginTop: '25px'
    },
    copyR: {
        color: "#000",
        fontSize: '15px',
        textAlign: 'center'
    },
    icon: {
        margin: 'auto',
        marginRight: "1em",
        marginTop: '0.5em'
    }

}));

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
        margin: '2em auto 1em auto',
        
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
