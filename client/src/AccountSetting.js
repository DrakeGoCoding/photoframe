import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Container, Box, } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Divider from '@material-ui/core/Divider';
import grey from '@material-ui/core/colors/grey';
import purple from '@material-ui/core/colors/purple'
import TextField from '@material-ui/core/TextField';
//diaglog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function AccountSetting(props) {
    const [updatingName, setUpdateName] = useState(false);
    const [updatingEmail, setUpdateEmail] = useState(false);
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [openRemoveAccDialog, setRemoveAccDialog] = useState(false);
    const [username, setUsername] = useState('my name');
    const [email, setEmail] = useState('you@mail.com');
    // const [password, setPassword] = useState('');
    const useStyles = makeStyles((theme) => ({
        grid: {
            width: '100%',
            margin: '2px',
        },
        grid_left_col: {
            width: '200px',
            margin: '2px',
        },
        grid_button: {
            width: '50px',
            margin: '2px'
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
        },
        box: {
            width: 'flex',
            height: 'flex',
            margin: '2px',
            padding: '10px',
            alignItems: 'center'
        },
        box_small:{
            width: 'flex',
            margin: '2px',
            padding: '10px',
            alignItems: 'center'
        },
        button_normal: {
            background: grey[200],
            width: '100%',
            height: '30px',
        },
        button_purple: {
            background: purple[200],
            height: '30px',
        },
        button_grey: {
            background: grey[200],
            height: '30px',
        },
    }));
    const classes = useStyles();
    const onClickChangeName = e => {
        e.preventDefault()
        setUpdateName(!updatingName)
    }
    const getUsernameFromInput = e => setUsername(e.target.value)
    const getEmailFromInput = e => setEmail(e.target.value)
    // const getPasswordFromInput = e => setPassword(e.target.value)
    const onClickChangeEmail = () => {
        setUpdateEmail(!updatingEmail)
    }
    const onClickChangePassword = () => {
        //show message box
        setOpenPasswordDialog(true);
    }
    const onCloseChangePassword = () => {
        setOpenPasswordDialog(false)
    }

    const onOpenRemoveAccount = () => {
        setRemoveAccDialog(true);
    }
    const onCloseRemoveAccDialog = () => {
        setRemoveAccDialog(false)
    }
    const removeAccount = () => {
        onCloseRemoveAccDialog(false);
    }
    //remove account

    const updateUsernameBlock = () => {
        if (updatingName)
            return (
                <Box className={classes.box}>
                    <Box fontWeight="fontWeightBold">
                        Your name
                    </Box >
                    <Grid container direction='row' justify='flex-start'>

                        <Grid item xs={6} spacing={2}>

                            <TextField id="outlined-basic" variant="outlined" size='small' onChange={getUsernameFromInput} value={username} />
                        </Grid>
                        <Grid container direction='row' justify='flex-start' xs={6} spacing={2}>
                            <Grid item xs={3}>
                                <Button className={classes.button_purple} onClick={onClickChangeName}>Save</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button className={classes.button_grey} onClick={onClickChangeName}>Cancel</Button>

                            </Grid>

                        </Grid>

                    </Grid>
                    <Box m="2">
                        <p />
                    </Box>
                    <Divider />

                </Box>

            )
        else
            return (
                <Box className={classes.box}>
                    <Grid container direction='row' justify='flex-start'>
                        <Grid item xs={9}>

                            <Box fontWeight="fontWeightBold">
                                Your name
                        </Box>
                            <p>{username}</p>
                        </Grid>
                        <Grid container item xs={2} alignItems='center'>
                            <Button className={classes.button_normal} onClick={onClickChangeName}>Change</Button>
                        </Grid>

                    </Grid>
                    <Box m="2">
                        <p />
                    </Box>
                    <Divider />
                </Box>
            )
    }
    const updateEmailBlock = () => {
        if (updatingEmail)
            return (
                <Box className={classes.box}>
                    <Box fontWeight="fontWeightBold">
                        Your email
                     </Box>
                    <Grid container direction='row' justify='flex-start'>
                        <Grid item xs={6}>

                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField id="outlined-basic" size='small' variant="outlined" value={email} onChange={getEmailFromInput} />
                            </form>
                        </Grid>
                        <Grid container direction='row' justify='flex-start' xs={6} spacing={2}>
                            <Grid item >
                                <Button className={classes.button_purple} onClick={onClickChangeEmail}>Save</Button>
                            </Grid>
                            <Grid item >
                                <Button className={classes.button_grey} onClick={onClickChangeEmail}>Cancel</Button>
                            </Grid>


                        </Grid>

                    </Grid>
                    <Box m="2">
                        <p />
                    </Box>
                    <Divider />
                </Box>
            )
        else
            return (
                <Box className={classes.box}>
                    <Box fontWeight="fontWeightBold">
                        Your email
                     </Box>
                    <Grid container direction='row' justify='flex-start'>
                        <Grid item xs={9}>

                            <p>{email}</p>
                        </Grid>
                        <Grid container item xs={2} alignItems='center'>
                            <Button className={classes.button_normal} onClick={onClickChangeEmail}>Change</Button>
                        </Grid>

                    </Grid>
                    <Box m="2">
                        <p />
                    </Box>
                    <Divider />
                </Box>
            )
    }
    const removeAccountBlock = () => {
        return (
            <div>
                <Dialog open={openRemoveAccDialog} onClose={onCloseRemoveAccDialog}>
                    <DialogTitle id="form-dialog-title">Remove your account</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter your password
                      </DialogContentText>
                        <TextField
                            margin="dense"
                            id="filled-password-input"
                            label="password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            // onChange={getPasswordFromInput}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button classname={classes.button_normal} onClick={onCloseRemoveAccDialog}>
                            Cancel
                        </Button>
                        <Button classname={classes.button_purple} onClick={removeAccount} >
                            Remove
                        </Button>
                    </DialogActions>
                </Dialog>
                <Box className={classes.box}>
                    <Box fontWeight="fontWeightBold">
                        Remove account
             </Box>
                    <Grid container direction='row' justify='flex-start'>
                        <Grid item xs={9}>

                            <p>hoantancong@gmail.com</p>
                        </Grid>
                        <Grid container item xs={2} alignItems='center'>
                            <Button className={classes.button_normal} onClick={onOpenRemoveAccount}>Remove</Button>
                        </Grid>

                    </Grid>
                    <Box m="2">
                        <p />
                    </Box>
                    <Divider />
                </Box>
            </div>

        )
    }

    const updatepasswordBlock = () => {
        return (
            <div>
                <Dialog open={openPasswordDialog} onClose={onCloseChangePassword}>
                    <DialogTitle id="form-dialog-title">Confirm your password</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter your current password
                      </DialogContentText>
                        <TextField
                            margin="dense"
                            id="filled-password-input"
                            label="Old password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            // onChange={getPasswordFromInput}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button classname={classes.button_normal} onClick={onCloseChangePassword}>
                            Cancel
                        </Button>
                        <Button classname={classes.button_purple} onClick={onCloseChangePassword} >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
                <Box className={classes.box}>
                    <Grid container direction='row' justify='flex-start'>
                        <Grid item xs={9}>
                            <Box fontWeight="fontWeightBold">
                                Your password
                </Box >
                            <p>Update your password</p>
                        </Grid>
                        <Grid container item xs={2} alignItems='center'>
                            <Button className={classes.button_normal} onClick={onClickChangePassword}>Change</Button>
                        </Grid>

                    </Grid>
                    <Box m="2">
                        <p />
                    </Box>
                    <Divider />
                </Box>

            </div>
        )
    }
    return (

        <div>
            <Container component="main" maxWidth={12} className={classes.container}>
                <Grid container className={classes.grid} spacing={30}>
                    <Grid item xs={12}>
                        <h2>Navigation bar header</h2>
                    </Grid>
                    <Grid item className={classes.grid_left_col}>
                        <Box className={classes.box_small}>
                            <h4>{username}</h4>
                            {email}
                            <p></p>
                            <Divider/>
   
                        </Box>
                        <Button
                            href='/'
                            startIcon={<AccountCircleIcon />}
                        >
                            Your account
                             </Button>
                        <Button
                            href='/tab2'
                            startIcon={<LockIcon />}
                        >
                            Security setting
                             </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Router>
                            <Route exact path="/">
                                <Grid sm={12} spacing={2}>
                                    <Box className={classes.box}>
                                        <h3>Your account</h3>
                                    </Box>
                                    {updateUsernameBlock()}
                                    {updateEmailBlock()}
                                </Grid>
                            </Route>
                            <Route exact path="/tab2">
                                <Grid sm={12} spacing={2}>
                                    <Box className={classes.box}>
                                        <h3>Security setting</h3>
                                    </Box>
                                    {updatepasswordBlock()}
                                    {/*remove account*/}
                                    {removeAccountBlock()}
                                </Grid>
                            </Route>
                        </Router>

                    </Grid>

                </Grid>


            </Container>


        </div>
    )
}
