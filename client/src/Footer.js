import React from 'react'
import {
    makeStyles,
    Grid,
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

export default function Footer() {
    const classes = useStylesFooter();
    return (
        <div className={classes.root}>
            <Grid className={classes.Fott} container >
                <Grid item xs={6} >
                    <div className={classes.paper}>
                        <p>About Us:</p>
                        <p>(+84) 999999999</p>
                        <p>contact@photoframe.com</p>
                        <p>22C Thành Công, Ba Đình, Hà Nội</p>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.paper}>
                        <p>Social networks:</p>
                        <FacebookIcon fontSize="large" className={classes.icon}/>
                        <InstagramIcon fontSize="large" className={classes.icon}/>
                        <TwitterIcon fontSize="large" className={classes.icon}/>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.copyR}>
                <hr/>
                    <span>© 2021 Photo Frame</span>
                </Grid>
            </Grid>

        </div>
    )
}

const useStylesFooter = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: 'auto',
        backgroundColor: '#151515',
        paddingBottom:'15px'
    },
    Fott: {
        width: '85%',
        margin: 'auto',
    },
    paper: {
        color: "#ffffff",
        fontSize: '15px',
    },
    copyR:{
        color: "#ffffff",
        fontSize: '15px',
        textAlign: 'center'
    },
    icon: {
        margin: 'auto',
        marginRight:"4em",
        marginTop: '0.5em'
    }
   
}));
