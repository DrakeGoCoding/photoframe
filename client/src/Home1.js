import React, { useState, useEffect } from 'react'
import Nav from './Nav'
import Footer from './Footer';
import {
    makeStyles,
} from '@material-ui/core';

import img1 from './assets/Home1/benefits-start.png'
import img2 from './assets/Home1/benefits-collab.png'
import img3 from './assets/Home1/benefits-share.png'

export default function Home1() {
    const classes = useStyles();
    return (
        <div className={classes.root} >
            <Nav />
            <Benefits />
            <Footer />
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    rootH: {
        flexGrow: 1,
        marginTop: "97px",
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },

    container: {
        width: '96%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '40px auto'
    },
    image: {
        backgroundSize: 'cover',
        width: '100%',
    },
    left: {
        width: '45%',
        display: 'flex',
        alignItems: 'center',

    },
    right: {
        width: '45%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'left',
    }
}));

const Benefits = () => {
    const classes = useStyles();
    return (
        <div className={classes.rootH}>
            <div className={classes.container}>
                <div className={classes.left}>
                    <img className={classes.image} src={img1} alt="benefits" />
                </div>
                <div className={classes.right}>
                    <div><h1 style={{ margin: '0' }}>Start inspired</h1></div>
                    <div><p>With thousands of professional templates, images and quality content to choose from, get a headstart on bringing your best ideas and work to life.</p></div>
                </div>
            </div>

            <div className={classes.container}>
                <div className={classes.right}>
                    <div><h1 style={{ margin: '0' }}>Collaborate with ease</h1></div>
                    <div><p>Invite people to edit with you or set your whole team up in Canva Pro to manage brand assets, leave feedback, get approvals, and scale your visual content.</p></div>
                </div>
                <div className={classes.left}>
                    <img className={classes.image} src={img2} alt="benefits" />

                </div>
            </div>

            <div className={classes.container}>
                <div className={classes.left}>
                    <img className={classes.image} src={img3} alt="benefits" />
                </div>
                <div className={classes.right}>
                    <div><h1 style={{ margin: '0' }}>Share with pride</h1></div>
                    <div><p>Whether you’re presenting, downloading, scheduling, sharing or printing, enjoy seeing your work make an impact in the real world.</p></div>
                </div>
            </div>

        </div>
    )
}
