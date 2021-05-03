import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Container, CssBaseline, Grid, Icon, Link, TextField, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import BackgroundImage from './assets/bg.jpg'
import GoogleIcon from './assets/google.svg'
import FacebookIcon from './assets/facebook.svg'

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState('');

    const changeName = e => setName(e.target.value)
    const changeEmail = e => setEmail(e.target.value)
    const changePassword = e => setPassword(e.target.value)
    const changeConfirmPassword = e => setConfirmPassword(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()
        try {
            const account = { name, email, password }
            checkInput() && console.log(account);
        } catch (error) {

        }
    }

    const checkInput = () => {
        if (!checkName()) {
            setAlertMessage('Your name should be 3-50 characters.');
            return false;
        }
        if (!checkEmail()) {
            setAlertMessage('Your email should be at most 50 characters.');
            return false;
        }
        if (!checkPassword()) {
            setAlertMessage('Your password should be at least 6 characters.');
            return false;
        }
        if (!checkConfirmPassword()) {
            setAlertMessage('Password mismatch');
            return false;
        }
        return true;
    }

    const checkName = () => name.length >= 3 && name.length <= 50
    const checkEmail = () => email.length <= 50
    const checkPassword = () => password.length >= 6
    const checkConfirmPassword = () => confirmPassword.localeCompare(password) === 0

    const responseGoogle = res => {
        console.log(res.profileObj);
    }

    const responseFacebook = res => {
        console.log(res);
    }

    const classes = useStyles();
    return (
        <div className={classes.background}>
            <Container component="main" maxWidth="sm" className={classes.container}>
                <CssBaseline />
                <div className={classes.wrapper}>
                    <form className={classes.form} onSubmit={handleSubmit} >
                        <Typography className={classes.title} variant="h5">{"Sign up for your account"}</Typography>
                        <TextField
                            className={classes.textfield}
                            variant="outlined" margin="normal" fullWidth
                            label="Email Address"
                            type="email" name="email" value={email}
                            onChange={changeEmail}
                            autoFocus required />
                        <TextField
                            className={classes.textfield}
                            variant="outlined" margin="normal" fullWidth
                            label="Your name"
                            type="text" name="name" value={name}
                            onChange={changeName}
                            required />
                        <TextField
                            className={classes.textfield}
                            variant="outlined" margin="normal" fullWidth
                            label="Password"
                            type="password" name="password" value={password}
                            onChange={changePassword}
                            required />
                        <TextField
                            className={classes.textfield}
                            variant="outlined" margin="normal" fullWidth
                            label="Confirm Password"
                            type="password" name="confirmPassword" value={confirmPassword}
                            onChange={changeConfirmPassword}
                            required />
                        {alertMessage && <Alert severity="error">{alertMessage}</Alert>}
                        <Typography variant="caption">
                            By signing up, you confirm that you've read and accepted our&nbsp;
                            <Link href="#">Terms of Services</Link>&nbsp;and &nbsp;
                            <Link href="#">Privacy Policy</Link>.
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>{"Sign Up"}
                        </Button>
                        <div className={classes.methodSeparator} align="center" variant="body2">
                            <hr className={classes.separator}/>OR<hr className={classes.separator}/>
                        </div>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <GoogleLogin
                                    clientId="850972548288-5kc5bd9okqa0enotpcpo021tg779s2si.apps.googleusercontent.com"
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
                        <hr className={classes.separator}/>
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
            padding: '1rem',
            borderRadius: '0.5rem 0.5rem 0 0',
        },
        textfield:{
            margin: '0.5rem 0'
        },
        methodSeparator: {
            margin: '0'
        },
        separator: {
            marginTop: '2rem',
            marginBottom: '2rem',
        },
        footer: {
            display: 'none',
        },
    }
}))