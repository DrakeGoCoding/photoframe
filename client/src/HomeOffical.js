import React, { useState } from 'react'
import Nav from './Nav'
import {
    makeStyles,
    Button,
    ButtonGroup,
    Grid,
    useTheme,
    useMediaQuery
} from '@material-ui/core';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';

import pic1 from './assets/bg.jpg'
import pic2 from './assets/bg1.jpg'
import pic3 from './assets/bg2.jpg'
import pic4 from './assets/bg3.jpg'
import pic5 from './assets/bg4.jpg'

const useStyles = makeStyles((theme) => ({
    //container
    box: {
        width: '100vw',
        paddingBottom: '1%',
        backgroundColor: '#111418',
        marginTop: '91px'
    },
    box1: {
        height: 'auto',
        width: 'auto'
    },
    btnEditYourPhoto: {
        color: '#079de0',
        maxWidth: '160px',
        //textTransform: 'none',
        '&:hover': {
            backgroundColor: '#12a0d0',
            color: '#fefefe'
        }
    },
    box2: {
        height: '90%',
        width: '60%',
        marginTop: '15px',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
    },
    box2_1: {
        height: '90%',
        width: '90%',
        marginBottom: '10px',
        display: 'block',
    },
    grBTN: {
        height: '5%',
        width: 'auto'
    },
    changeBG: {
        color: '#079de0',
        textTransform: 'none',
        '&:hover': {
            color: '#fefefe'
        }
    },
    imgBG: {
        display: 'block',
        width: '100%',
        height: '80%',
    },

    //Album 
    album: {
        width:'100%',
        paddingBottom: '5%',
        //height: '300px',
        backgroundColor:'red'
    }
}))

export default function HomeOffical() {
    return (
        <Grid container direction="column">
            <Grid item >
                <Nav />
            </Grid>
            <Container1 />
        </Grid>
    )
}
const Container1 = () => {
    const classes = useStyles();
    const [bgimg, setBgimg] = useState(pic1);
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('xs'));
    console.log(isMatch)
    return (
        <>
            {!isMatch ? (
                <Grid className={classes.box} container wrap direction="row" alignItems='center' justify='space-around'>
                    <Grid container justify="center" alignItems="center" direction="column" style={ {marginLeft: '50px'}, {marginTop: '10px'}} className={classes.box1}>
                        <Button variant="outlined" color="primary" className={classes.btnEditYourPhoto}>
                            <label style={{ fontSize: "small" }}>Edit your Photo</label>
                        </Button>
                        <h3 style={{ color: 'white' }}>Make your Photo better</h3>
                    </Grid>
                    <Grid container className={classes.box2} direction="column" alignItems='center' justify="center" >
                        <Grid item className={classes.box2_1} >
                            <img src={bgimg} alt="Anh" className={classes.imgBG}></img>
                        </Grid>

                        <ButtonGroup className={classes.grBTN} fontSize="small" size="small" variant="text" aria-label="text primary button group">
                            <Button className={classes.changeBG} variant="outlined" color="primary" onMouseEnter={() => { setBgimg(pic1) }}></Button>
                            <Button className={classes.changeBG} variant="outlined" color="primary" onMouseEnter={() => { setBgimg(pic2) }}></Button>
                            <Button className={classes.changeBG} variant="outlined" color="primary" onMouseEnter={() => { setBgimg(pic3) }}></Button>
                            <Button className={classes.changeBG} variant="outlined" color="primary" onMouseEnter={() => { setBgimg(pic4) }}></Button>
                            <Button className={classes.changeBG} variant="outlined" color="primary" onMouseEnter={() => { setBgimg(pic5) }}></Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            ) : (
                <Grid className={classes.box} container wrap direction="column" alignItems='center' justify='space-around'>
                    <Grid container className={classes.box1}>
                        <Button variant="container" dense style={{ marginTop: "10px" }}>
                            <AddPhotoAlternateOutlinedIcon style={{ color: "#079de0" }} fontSize="large" />
                        </Button>
                    </Grid>
                    <Grid container className={classes.box2} direction="column" alignItems='center' justify="center" >
                        <Grid item className={classes.box2_1} >
                            <img src={bgimg} alt="Anh" className={classes.imgBG}></img>
                        </Grid>
                        <ButtonGroup className={classes.grBTN} size="small" variant="text" style={{ marginBottom: "5px" }}>
                            <Button className={classes.changeBG} size="small" variant="outlined" color="primary" onMouseEnter={() => { setBgimg(pic1) }}></Button>
                            <Button className={classes.changeBG} size="small" variant="outlined" color="primary" onMouseEnter={() => { setBgimg(pic2) }}></Button>
                            <Button className={classes.changeBG} size="small" variant="outlined" color="primary" onMouseEnter={() => { setBgimg(pic3) }}></Button>
                            <Button className={classes.changeBG} size="small" variant="outlined" color="primary" onMouseEnter={() => { setBgimg(pic4) }}></Button>
                            <Button className={classes.changeBG} size="small" variant="outlined" color="primary" onMouseEnter={() => { setBgimg(pic5) }}></Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            )}
            <Album />
        </>
    )
}

const Album = () => {
    const classes = useStyles();
    return(
        <div className={classes.album}>
            Hello cacs ban
        </div>
    )
}
