import React, { useState, useEffect } from 'react'
import Nav from './Nav'
import {
    makeStyles,
    Button,
    ButtonGroup,
    Grid,
    GridList,
    GridListTile,
    GridListTileBar,
    useTheme,
    useMediaQuery,
    IconButton
} from '@material-ui/core';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import InfoIcon from '@material-ui/icons/Info';
import dataImages from './dataImg.json'

import pic1 from './assets/bg.jpg'
import pic2 from './assets/bg1.jpg'
import pic3 from './assets/bg2.jpg'
import pic4 from './assets/bg3.jpg'
import pic5 from './assets/bg4.jpg'

const useStyles = makeStyles((theme) => ({
    //container
    box: {
        width: '100%',
        paddingBottom: '1%',
        backgroundColor: '#111418',
    },
    box1: {
        height: 'auto',
        width: 'auto',
        marginTop: '92px'
    },
    btnEditYourPhoto: {
        color: '#079de0',
        maxWidth: '160px',
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
        left: '0',     
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
        width: '100%',
        height: 'auto',
        backgroundColor: '#111418',
    },
    main_album: {
        width: '90%',
        height: 'auto',
        border: '1px dotted #079de0',
        margin: '10px 0px'
    }
}))

export default function HomeOffical() {
    const [login, setLogin] = useState(true)
    return (
        <Grid container direction="column">
            <Grid item >
                <Nav />
            </Grid>
            <Container1 />
            {login ? (<Album />) : (<></>)}
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
                    <Grid container justify="center" alignItems="center" direction="column" style={{ border: '1px solid #079de0', borderRadius: '10px', padding: '19px' }} className={classes.box1}>
                        <Button variant="outlined" color="primary" className={classes.btnEditYourPhoto}>
                            <label style={{ fontSize: "small" }}>Edit your Photo</label>
                        </Button>
                        <p style={{ color: 'white', fontSize: '100%', fontFamily: 'sans-serif' }}>Make your Photo better</p>
                    </Grid>
                    <Grid container className={classes.box2} direction="column" alignItems='center' justify="center" style={{marginTop: '130px'}}>
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
        </>
    )
}

const Album = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isMatch_md = useMediaQuery(theme.breakpoints.down('md'));
    const isMatch_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const isMatch_xs = useMediaQuery(theme.breakpoints.down('xs'));

    const [cols, setCols] = useState('')
    const [height, setHeight] = useState('')

    const setAlbum = () => {
        return (
            !isMatch_md ? (setCols(5), setHeight(240)) :
                (!isMatch_sm ? (setCols(4), setHeight(210)) :
                    (!isMatch_xs ? (setCols(3), setHeight(180)) :
                        (setCols(2), setHeight(150))))
        )
    }

    useEffect(() => {setAlbum()});
    return (
        <Grid container justify='center' className={classes.album} >
            <div className={classes.main_album}>
                <GridList cellHeight={height} cols={cols} >
                    {dataImages.map((data) => (
                        <GridListTile key={data.id}>
                            <img style={{ backgroundSize: 'cover' }} src={data.image} alt={data.title} />
                            <GridListTileBar
                                title={data.title}
                                subtitle={data.description}
                                style={{ textAlign: 'start' }}
                                acctionIcon={
                                    <IconButton>
                                        <InfoIcon style={{ color: 'white' }} />
                                    </IconButton>
                                } />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </Grid >
    )
}
