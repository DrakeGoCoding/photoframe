import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Container, CssBaseline, Grid, IconButton, InputAdornment, Icon, Link, TextField, Typography, CircularProgress } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Alert from './Alert'

import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

import BackgroundImage from './assets/bg.jpg'
import GoogleIcon from './assets/google.svg'
import FacebookIcon from './assets/facebook.svg'
import { signin } from './Axios';

export default function LogIn({ setToken }) {
    const history = useHistory()
    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState('');
    const [passwordShown, setPasswordShown] = useState(false)
    const [loading, setLoading] = useState(false)

    const changeEmail = e => setEmail(e.target.value)
    const changePassword = e => setPassword(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const account = { email, password }
        await submitAccount(account) && redirectMain()
    }

    const submitAccount = async (account) => {
        try {
            setLoading(true)
            setAlertMessage('')
            const response = await signin(account)
            setLoading(false)
            setToken(response.data.token)
            return true
        } catch (error) {
            setAlertMessage(error.response.data.error)
            setLoading(false)
            return false
        }
    }

    const responseGoogle = async (res) => {
        console.log(res);
    }

    const responseFacebook = async (res) => {
        console.log(res);
    }

    const togglePasswordVisibility = e => {
        e.preventDefault()
        setPasswordShown(!passwordShown)
    }

    const redirectMain = () => history.push('/')
    const redirectSignup = () => history.push('/signup')
    const redirectResetPassword = () => history.push('/resetpassword')

    const renderGoogleBtn = (renderProps) => {
        return (
            <Button
                className={classes.methodBtn}
                onClick={renderProps.onClick}
                fullWidth
                variant="contained">
                <Icon className={classes.googleIcon}></Icon>
                &nbsp;Continue with Google
            </Button>
        )
    }

    const renderFacebookBtn = (renderProps) => {
        return (
            <Button
                className={classes.methodBtn}
                fullWidth
                variant="contained"
                onClick={renderProps.onClick}>
                <Icon className={classes.facebookIcon}></Icon>
                &nbsp;Continue with Facebook
            </Button>
        )
    }

    return (
        <div className={classes.background}>
            <Container component="main" maxWidth="sm" className={classes.container}>
                <CssBaseline />
                <div className={classes.wrapper}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Typography paragraph className={classes.title} variant="h5">{"Login to your account"}</Typography>
                        <TextField
                            className={classes.textfield}
                            variant="outlined" margin="normal" fullWidth
                            label="Email address"
                            type="email" name="email" value={email}
                            onChange={changeEmail}
                            autoComplete="email" autoFocus required />
                        <TextField
                            className={classes.textfield}
                            variant="outlined" margin="normal" fullWidth
                            label="Password" name="password" value={password}
                            type={passwordShown ? "text" : "password"}
                            onChange={changePassword} required
                            autoComplete="current-password"
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={togglePasswordVisibility}>
                                            {passwordShown ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }} />
                        {alertMessage && <Alert message={alertMessage} />}
                        <Button
                            className={classes.submit} type="submit"
                            variant="contained" color="primary" fullWidth>
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Log in'}
                        </Button>
                        <div className={classes.methodSeparator} align="center" variant="body2">
                            <hr className={classes.separator} />OR<hr className={classes.separator} />
                        </div>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <GoogleLogin
                                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                    render={renderGoogleBtn}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'} />
                            </Grid>
                            <Grid item xs={12}>
                                <FacebookLogin
                                    appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                                    render={renderFacebookBtn}
                                    callback={responseFacebook}
                                    fields="name,email,picture" />
                            </Grid>
                        </Grid>
                        <hr className={classes.separator} />
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" onClick={redirectResetPassword}>{'Forgot password?'}</Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={redirectSignup}>{"Sign up for an account"}</Link>
                            </Grid>
                        </Grid>
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
        backgroundSize: 'cover',
        overflow: 'hidden'
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
        padding: '1.5rem',
        borderRadius: '0.5rem',
        background: 'inherit',
        backgroundColor: 'white',
        minWidth: '320px',
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textfield: {
        margin: '0.5rem 0',
    },
    submit: {
        margin: theme.spacing(2, 0, 0, 0),
        fontSize: '1.125rem',
        height: '3rem',
    },
    methodSeparator: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem',
        color: 'rgba(47,64,80,.25);',
        margin: '0.5rem 0',
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
        margin: '1rem 0',
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
        textfield: {
            margin: '0.3rem 0'
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