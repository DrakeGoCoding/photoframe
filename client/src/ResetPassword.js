import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import OtpInput from 'react-otp-input'
import Countdown from 'react-countdown'
import { fadeInRight } from 'react-animations'

import BackgroundImage from './assets/bg.jpg'

export default function ResetPassword() {
    const [email, setEmail] = useState('')
    const [emailSent, setEmailSent] = useState(true)
    const [code, setCode] = useState('')
    const [codeChecked, setCodeChecked] = useState(true)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState('')

    const changeEmail = e => setEmail(e.target.value)
    const changeCode = otp => setCode(otp)
    const changePassword = e => setPassword(e.target.value)
    const changeConfirmPassword = e => setConfirmPassword(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

    }

    const countDownOTP = (props) => {
        return <Typography variant="subtitle2">
            {!props.completed
                ? `Resend code in ${props.total / 1000 - 1}s`
                : <>
                    Didn't get the code?&nbsp;
                    <Link href="#" variant="body2">Resend code</Link>
                </>}
        </Typography>
    }

    const classes = useStyles()
    return (
        <div className={classes.background}>
            <Container component="main" maxWidth="sm" className={classes.container}>
                <CssBaseline />
                <div className={classes.wrapper}>
                    <form className={classes.form} onSubmit={handleSubmit} style={fadeInRight}>
                        {!emailSent ?
                            <>
                                <Typography paragraph className={classes.title} variant="h5">{"Forgotten your password?"}</Typography>
                                <Typography variant="subtitle2">{"Don't worry, we'll send you an email to help you reset your password."}</Typography>
                                <TextField
                                    className={classes.textfield}
                                    variant="outlined" margin="normal" fullWidth
                                    type="email" label="Email address" name="email"
                                    value={email} onChange={changeEmail}
                                    autoComplete="email" autoFocus required />
                                {alertMessage && <Alert severity="error">{alertMessage}</Alert>}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>{"Continue"}
                                </Button>
                                <hr className={classes.separator} />
                                <Link href="#" variant="body2" align="center">{"Return to log in"}</Link>
                            </> :
                            !codeChecked ?
                                <>
                                    <Typography paragraph className={classes.title} variant="h5">{"Ok, we sent you a code!"}</Typography>
                                    <Typography paragraph variant="subtitle2">{`Please enter the code we sent to ${email} within the next 10 minutes.`}</Typography>
                                    <OtpInput
                                        containerStyle={classes.code}
                                        inputStyle={classes.codeDigit}
                                        value={code} onChange={changeCode} numInputs={6}
                                        isInputNum shouldAutoFocus />
                                    {alertMessage && <Alert severity="error">{alertMessage}</Alert>}
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}>{"Continue"}
                                    </Button>
                                    <hr className={classes.separator} />
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">{'Back'}</Link>
                                        </Grid>
                                        <Grid item>
                                            <Countdown date={Date.now() + 60000} renderer={countDownOTP} />
                                        </Grid>
                                    </Grid>
                                </> :
                                <>
                                    <Typography paragraph className={classes.title} variant="h5">{"Reset your password"}</Typography>
                                    <Typography variant="subtitle2">{`Please set a new password for your account.`}</Typography>
                                    <TextField
                                        className={classes.textfield}
                                        variant="outlined" margin="normal" fullWidth
                                        label="New password"
                                        type="password" name="password" value={password}
                                        onChange={changePassword}
                                        required />
                                    <TextField
                                        className={classes.textfield}
                                        variant="outlined" margin="normal" fullWidth
                                        label="Confirm new password"
                                        type="password" name="confirmPassword" value={confirmPassword}
                                        onChange={changeConfirmPassword}
                                        required />
                                    {alertMessage && <Alert severity="error">{alertMessage}</Alert>}
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}>{"Set password"}
                                    </Button>
                                </>}
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
        minWidth: '320px'
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    code: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    codeDigit: {
        backgroundColor: '#fff',
        border: '1px solid rgba(53,71,90,.2)',
        borderRadius: '4px',
        width: '40px !important',
        height: '40px',
        fontSize: '1rem',
        outline: 'none',
        boxSizing: 'border-box',
    },
    submit: {
        margin: theme.spacing(2, 0, 0, 0),
        fontSize: '1.125rem',
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
            height: '100%',
            padding: '1.5rem',
            borderRadius: '0.5rem 0.5rem 0 0',
        },
        textfield: {
            margin: '0.5rem 0'
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