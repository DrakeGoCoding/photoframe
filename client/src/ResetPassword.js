import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Box, Button,
    Container, CssBaseline,
    Grid,
    IconButton, InputAdornment,
    Link,
    TextField, Typography
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Alert from './assets/Alert'
import Loader from './assets/Loader'
import OtpInput from 'react-otp-input'
import Countdown from 'react-countdown'

import BackgroundImage from './assets/bg.jpg'

import { checkPassword } from './utils'
import { requestPasswordReset, resetPassword, checkCode } from './Axios';

export default function ResetPassword() {
    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')

    const backtoEmail = e => {
        e.preventDefault();
        setEmail('');
    }
    const backtoLogin = e => {
        e.preventDefault();
        console.log("Back to log in");
    }

    const Email = (props) => {
        const [email, setEmail] = useState('')
        const [alert, setAlert] = useState('')
        const [loading, setLoading] = useState(false)

        const changeEmail = e => setEmail(e.target.value)

        const submitEmail = async (e) => {
            e.preventDefault()
            try {
                setLoading(true)
                setAlert('')
                await requestPasswordReset({ email })
                setTimeout(() => {
                    props.setEmail(email)
                    setLoading(false)
                }, 1000)
            } catch (error) {
                setAlert(error.response.data.error);
                setLoading(false)
            }
        }
        return (
            <form className={classes.form} onSubmit={submitEmail}>
                <Typography paragraph className={classes.title} variant="h5">{"Forgotten your password?"}</Typography>
                <Typography variant="subtitle2">{"Don't worry, we'll send you an email to help you reset your password."}</Typography>
                <TextField
                    className={classes.textfield}
                    variant="outlined" margin="normal" fullWidth
                    type="email" label="Email address" name="email"
                    value={email} onChange={changeEmail}
                    autoComplete="email" autoFocus required
                    error={alert.length > 0}
                    helperText={alert} />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}>{loading ? <Loader /> : 'Continue'}
                </Button>
                <Link href="" variant="body2" align="center" onClick={backtoLogin}>{"Return to log in"}</Link>
            </form>
        )
    }

    const Code = (props) => {
        const CODE_LENGTH = 6
        const [code, setCode] = useState('')
        const [alert, setAlert] = useState('')
        const [loading, setLoading] = useState(false)

        const changeCode = value => setCode(value)

        const submitCode = async (e) => {
            e.preventDefault()
            try {
                setLoading(true)
                setAlert('')
                await checkCode({ code })
                setTimeout(() => {
                    props.setCode(code)
                    setLoading(false)
                }, 1000)
            } catch (error) {
                setAlert(error.response.data.error);
                setLoading(false)
            }
        }

        const resendCode = async (e) => {
            e.preventDefault()
            await requestPasswordReset({ email })
        }

        const CountDownOTP = (props) => {
            return <Typography variant="subtitle2">
                {!props.completed
                    ? `Resend code in ${props.total / 1000 - 1}s`
                    : <>
                        Didn't get the code?&nbsp;
                    <Link href="#" variant="body2" onClick={resendCode}>Resend code</Link>
                    </>}
            </Typography>
        }

        return (
            <form className={classes.form} onSubmit={submitCode}>
                <Typography paragraph className={classes.title} variant="h5">{"Ok, we sent you a code!"}</Typography>
                <Typography paragraph variant="subtitle2">{`Please enter the code we sent to within the next 10 minutes.`}</Typography>
                <OtpInput
                    containerStyle={classes.code}
                    inputStyle={classes.codeDigit}
                    focusStyle={classes.codeDigitFocus}
                    value={code} onChange={changeCode} numInputs={CODE_LENGTH}
                    isInputNum shouldAutoFocus hasErrored={alert.length > 0} />
                {alert && <Alert message={alert} />}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}>{loading ? <Loader /> : 'Continue'}
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="" variant="body2" onClick={backtoEmail}>{'Back'}</Link>
                    </Grid>
                    <Grid item>
                        <Countdown date={Date.now() + 60000} renderer={CountDownOTP} />
                    </Grid>
                </Grid>
            </form>
        )
    }

    const Reset = () => {
        const [password, setPassword] = useState('')
        const [confirmPassword, setConfirmPassword] = useState('')
        const [passwordShown, setPasswordShown] = useState(false)
        const [loading, setLoading] = useState(false)

        const [passwordAlert, setPasswordAlert] = useState('')
        const [confirmPasswordAlert, setConfirmPasswordAlert] = useState('')
        const [alert, setAlert] = useState('')

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
            password.localeCompare(input)
                ? setConfirmPasswordAlert('Password mismatch.')
                : setConfirmPasswordAlert('')
        }

        const togglePasswordVisibility = e => {
            e.preventDefault()
            setPasswordShown(!passwordShown)
        }

        const submitPassword = async (e) => {
            e.preventDefault()
            try {
                setLoading(true)
                setAlert('')
                await resetPassword({ email, code, password })
                setTimeout(() => {
                    console.log('Back to login');
                    setLoading(false)
                }, 1000)
            } catch (error) {
                setAlert(error.response.data.error);
                setLoading(false)
            }
        }

        return (
            <form className={classes.form} onSubmit={submitPassword}>
                <Typography paragraph className={classes.title} variant="h5">{"Reset your password"}</Typography>
                <Typography variant="subtitle2">{`Please set a new password for your account.`}</Typography>
                <TextField
                    className={classes.textfield}
                    variant="outlined" margin="normal" fullWidth
                    label="New password"
                    type={passwordShown ? "text" : "password"} name="password" value={password}
                    onChange={changePassword}
                    autoFocus required
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
                    }} />
                <TextField
                    className={classes.textfield}
                    variant="outlined" margin="normal" fullWidth
                    label="Confirm new password"
                    type={passwordShown ? "text" : "password"} name="confirmPassword" value={confirmPassword}
                    onChange={changeConfirmPassword} required
                    error={confirmPasswordAlert.length > 0}
                    helperText={confirmPasswordAlert} />
                {alert && <Alert message={alert} />}
                <Button
                    className={classes.submit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary">{loading ? <Loader /> : 'Set password'}
                </Button>
            </form>
        )
    }

    return (
        <div className={classes.background}>
            <Container component="main" maxWidth="sm" className={classes.container}>
                <CssBaseline />
                <div className={classes.wrapper}>
                    {!email
                        ? <Email setEmail={setEmail} />
                        : !code
                            ? <Code setCode={setCode} />
                            : <Reset />
                    }
                </div>
                <Box className={classes.footer} p={2}>
                    <Copyright color="#fff" />
                </Box>
            </Container>
        </div>
    )
}

const Copyright = () => {
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
    code: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(1),
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
    codeDigitFocus: {
        border: '1px solid',
        borderColor: theme.palette.primary.main,
    },
    submit: {
        margin: theme.spacing(2, 0, 2, 0),
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