import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@material-ui/core'

import BackgroundImage from './img/bg.jpg'

export default function LogIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const changeEmail = e => setEmail(e.target.value)
    const changePassword = e => setPassword(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()
        try {
            const account = { email, password }
            console.log(account);
        } catch (error) {

        }
    }

    const classes = useStyles()
    return (
        <div className={classes.background}>
            <Container component="main" maxWidth="sm" className={classes.container}>
                <CssBaseline />
                <div className={classes.wrapper}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Typography className={classes.title} variant="h4">{"Login"}</Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            type="email"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={changeEmail}
                            autoComplete="email"
                            autoFocus />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            type="password"
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            value={password}
                            onChange={changePassword}
                            autoComplete="curremt-password" />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>{"Sign In"}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">{'Forgot password?'}</Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">{"Don't have an account? Sign up"}</Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box p={2}>
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    form: {
        width: '100%',
        padding: '2rem',
        borderRadius: '0.5rem',
        background: 'inherit',
        backgroundColor: 'white'
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    submit: {
        margin: theme.spacing(2, 0),
        fontSize: '1.125rem'
    },
}))