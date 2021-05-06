import React, { useState } from 'react'
import './css/Nav.css'
import Nav from './Nav'
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup } from '@material-ui/core';
import pic1 from './assets/2_adjust.png'
import pic2 from './assets/3_crop.png'
import pic3 from './assets/4_2_text.png'
import pic4 from './assets/5_shape.png'
import pic5 from './assets/6_frame.png'

const useStyles = makeStyles((theme) => ({
    home: {
        height: 'auto',
        width: '100%',
        //backgroundColor: 'black',
        position: 'static',
        marginTop: '91px'
    },
    p1: {
        //backgroundImage: `url(${bg})`,
        //backgroundSize: 'cover',
        backgroundColor: '#111418',
        height: "80vh",
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    btnEditYourPhoto: {
        color: '#079de0',
        padding: '5px 20px',
        fontSize: '18px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#12a0d0',
            color: '#fefefe'
        }
    },
    bg: {
        height: '80%',
        width: '90%',
        //backgroundColor: 'red',
        backgroundImage: `url(${pic1})`,
        backgroundSize: 'cover',
        borderRadius: '10px',
        marginBottom: '20px'
        
    },
    rightBG: {
        height: '100%',
        width: '60%',
        //backgroundColor: 'green',
        marginRight: '35px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnEdit: {
        height: '80%',
        width: '30%',
        //backgroundColor: 'green',
        marginLeft: '35px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Slogan: {
        color: 'white',
        fontFamily: 'Roboto'
    },
    changeBG: {
        color: '#079de0',
        padding: '5px 20px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#12a0d0',
            color: '#fefefe'
        }
    }

}))

export default function Home() {

    const classes = useStyles();
    const [bgimg, setBgimg] = useState(pic1)
    return (
        <>
            <Nav />
            <div className={classes.home}>
                <div className={classes.p1}>
                    <div className={classes.btnEdit}>
                        <Button variant="outlined" color="primary" className={classes.btnEditYourPhoto}>Edit Your Photo</Button>
                        <h1 className={classes.Slogan}>Make your Photo better</h1>
                    </div>

                    <div className={classes.rightBG}>
                        <div className={classes.bg} style={{backgroundImage: `url(${bgimg})`}}>

                        </div>
                        <ButtonGroup variant="text" aria-label="text primary button group">
                            <Button className={classes.changeBG} onClick={()=>{setBgimg(pic1)}}>Adjust</Button>
                            <Button className={classes.changeBG} onClick={()=>{setBgimg(pic2)}}>Crop</Button>
                            <Button className={classes.changeBG} onClick={()=>{setBgimg(pic3)}}>Text</Button>
                            <Button className={classes.changeBG} onClick={()=>{setBgimg(pic4)}}>Shape</Button>
                            <Button className={classes.changeBG} onClick={()=>{setBgimg(pic5)}}>Frame</Button>
                        </ButtonGroup>
                    </div>


                </div>
            </div>
        </>
    )
}
