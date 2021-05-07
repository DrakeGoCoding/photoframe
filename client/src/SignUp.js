import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Container, CssBaseline, Grid, IconButton, InputAdornment, Icon, Link, TextField, Typography } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Alert from './assets/Alert'
import Loader from './assets/Loader'

import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import BackgroundImage from './assets/bg.jpg'
import GoogleIcon from './assets/google.svg'
import FacebookIcon from './assets/facebook.svg'

import { checkName, checkEmail, checkPassword } from './utils'
import { signup } from './Axios';

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordShown, setPasswordShown] = useState(false)

    const [loading, setLoading] = useState(false)

    const [alertMessage, setAlertMessage] = useState('')
    const [nameAlert, setNameAlert] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [passwordAlert, setPasswordAlert] = useState('')
    const [confirmPasswordAlert, setConfirmPasswordAlert] = useState('')

    const changeName = e => {
        const input = e.target.value
        setName(input)
        !checkName(input)
            ? setNameAlert('Please enter your name.')
            : setNameAlert('')
    }
    const changeEmail = e => {
        const input = e.target.value
        setEmail(input)
        !checkEmail(input)
            ? setEmailAlert('Please enter your email.')
            : setEmailAlert('')
    }
    const changePassword = e => {
        const input = e.target.value
        setPassword(input)
        !checkPassword(input)
            ? setPasswordAlert('Use 8+ characters with at least 1 digit, 1 uppercase and 1 lowercase.')
            : setPasswordAlert('')
    }
    const changeConfirmPassword = e => {
        const input = e.target.value
        setConfirmPassword(input)
        !checkConfirmPassword(input)
            ? setConfirmPasswordAlert('Password mismatch.')
            : setConfirmPasswordAlert('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const account = { name, email, password }
        if (!checkInput()) {
            setAlertMessage("Invalid input.");
            return;
        }
        try {
            setLoading(true)
            setAlertMessage('')
            const res = await signup(account)
            setTimeout(() => {
                console.log(res);
                setLoading(false);
            }, 1000)
        } catch (error) {
            setAlertMessage(error.response.data.error);
            setLoading(false);
        }
    }

    const checkInput = () => {
        if (!checkName(name) || !checkEmail(email) || !checkPassword(password) || !checkConfirmPassword(confirmPassword)) {
            return false;
        }
        return true;
    }

    const checkConfirmPassword = (input) => input.localeCompare(password) === 0

    const responseGoogle = res => {
        console.log(res.profileObj);
    }

    const responseFacebook = res => {
        console.log(res);
    }

    const togglePasswordVisibility = e => {
        e.preventDefault()
        setPasswordShown(!passwordShown)
    }

    const classes = useStyles();
    return (
        <div className={classes.background}>
            <Container component="main" maxWidth="sm" className={classes.container}>
                <CssBaseline />
                <div className={classes.wrapper}>
                    <form className={classes.form} onSubmit={handleSubmit} >
                        <Typography paragraph className={classes.title} variant="h5">{"Sign up for your account"}</Typography>
                        <TextField
                            className={classes.textfield}
                            variant="outlined" margin="normal" fullWidth
                            label="Email address"
                            type="email" name="email" value={email}
                            onChange={changeEmail}
                            error={emailAlert.length > 0}
                            helperText={emailAlert}
                            autoFocus required />
                        <TextField
                            className={classes.textfield}
                            variant="outlined" margin="normal" fullWidth
                            label="Your name"
                            type="text" name="name" value={name}
                            onChange={changeName}
                            error={nameAlert.length > 0}
                            helperText={nameAlert}
                            required />
                        <TextField
                            className={classes.textfield}
                            variant="outlined" margin="normal" fullWidth
                            label="Password"
                            type={passwordShown ? "text" : "password"} name="password" value={password}
                            onChange={changePassword}
                            error={passwordAlert.length > 0}
                            helperText={passwordAlert}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={togglePasswordVisibility}>
                                            {passwordShown ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                            required />
                        <TextField
                            className={classes.textfield}
                            variant="outlined" margin="normal" fullWidth
                            label="Confirm password"
                            type={passwordShown ? "text" : "password"} name="confirmPassword" value={confirmPassword}
                            onChange={changeConfirmPassword} required
                            error={confirmPasswordAlert.length > 0}
                            helperText={confirmPasswordAlert} />
                        <Typography variant="caption">
                            By signing up, you confirm that you've read and accepted our&nbsp;
                            <Link href="#">Terms of Services</Link>&nbsp;and &nbsp;
                            <Link href="#">Privacy Policy</Link>.
                        </Typography>
                        {alertMessage && <Alert message={alertMessage} />}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            {loading ? <Loader /> : 'Sign up'}
                        </Button>
                        <div className={classes.methodSeparator} align="center" variant="body2">
                            <hr className={classes.separator} />OR<hr className={classes.separator} />
                        </div>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <GoogleLogin
                                    clientId="754246735652-rt5pm47ctndoeonb3qcehaeh1krri2j4.apps.googleusercontent.com"
                                    render={renderProps => (
                                        <Button
                                            className={classes.methodBtn}
                                            onClick={renderProps.onClick}
                                            fullWidth
                                            variant="contained">
                                            <Icon className={classes.googleIcon}></Icon>
                                            &nbsp;Continue with Google
                                        </Button>
                                    )}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'} />
                            </Grid>
                            <Grid item xs={12}>
                                <FacebookLogin
                                    appId="529841281727853"
                                    callback={responseFacebook}
                                    scope="public_profile,email"
                                    render={renderProps => (
                                        <Button
                                            className={classes.methodBtn}
                                            fullWidth
                                            variant="contained"
                                            onClick={renderProps.onClick}>
                                            <Icon className={classes.facebookIcon}></Icon>
                                            &nbsp;Continue with Facebook
                                        </Button>
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <hr className={classes.separator} />
                        <Link href="#" variant="body2" align="center">{"Already have an account? Log in"}</Link>
                    </form>
                </div>
                <Box className={classes.footer} p={2}>
                    <Copyright color="#fff" />
                </Box>
            </Container>
        </div>
    )
}

function Copyright() {
    return (
        <Typography variant="body2" align="center" style={{ color: 'white' }}>
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                PhotoFrame
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    background: {
        background: `
            linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.5)
            ), 
            url(${BackgroundImage})
        `,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    wrapper: {
        margin: 'auto',
        width: '100%',
    },
    form: {
        width: '100%',
        padding: '2rem',
        borderRadius: '0.5rem',
        background: 'inherit',
        backgroundColor: 'white',
        minWidth: '320px',
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    submit: {
        margin: theme.spacing(2, 0, 0, 0),
        fontSize: '1.125rem',
    },
    methodSeparator: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem',
        color: 'rgba(47,64,80,.25);',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    methodBtn: {
        color: '#0e1318',
        backgroundColor: 'rgba(64,87,109,.07)',
        fontWeight: '600',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: 'rgb(0 0 0 / 7%);',
            boxShadow: 'none',
        },
    },
    googleIcon: {
        backgroundImage: `url(${GoogleIcon})`,
        fontSize: '1rem',
    },
    facebookIcon: {
        backgroundImage: `url(${FacebookIcon})`,
        fontSize: '1rem',
    },
    separator: {
        display: 'block',
        height: '1px',
        border: '0',
        borderTop: '1px solid hsl(0, 0%, 90%)',
        margin: '1em 0',
        padding: '0',
        flex: '1 0',
    },
    '@media (max-width: 600px)': {
        container: {
            padding: '0',
        },
        wrapper: {
            margin: 'auto 0 0 0',
        },
        form: {
            padding: '1.5rem',
            borderRadius: '0.5rem 0.5rem 0 0',
        },
        textfield: {
            margin: '0.5rem 0'
        },
        methodSeparator: {
            margin: '0'
        },
        separator: {
            marginTop: '1rem',
            marginBottom: '1rem',
        },
        footer: {
            display: 'none',
        },
    }
}))