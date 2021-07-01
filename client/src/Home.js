import React, { useState, useEffect } from 'react'
import Nav from './Nav'
import Footer from './Footer';
import {
    makeStyles,
    Button,
    Grid,
    GridList,
    GridListTile,
    useTheme,
    useMediaQuery,

} from '@material-ui/core';
import dataImages from './dataImg.json';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import jwt_decode from 'jwt-decode'
import {getAllPhotosFromUser} from './Axios'
import './index.css'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        top: '0px',
    }
}));

export default function Home() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Nav />
            <Album />
            <Footer />
        </div>
    )
}


//Album
const Album = () => {
    const classes = useStylesAlbum();
    const theme = useTheme();

    const isMatch_md = useMediaQuery(theme.breakpoints.down('md'));
    const isMatch_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const isMatch_xs = useMediaQuery(theme.breakpoints.down('xs'));
    const [height, setHeight] = useState('')
    const [spacing, setSpacing] = useState('')
    const setAlbum = () => {
        return (
            !isMatch_md ? (setSpacing(50), setHeight(210)) :
                (!isMatch_sm ? (setSpacing(40), setHeight(250)) :
                    (!isMatch_xs ? (setSpacing(20), setHeight(220)) :
                        (setSpacing(10), setHeight(100))))
        )
    }
    const [visiable, setVisiable] = useState(6)

    const fetchPhotos = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const userID = jwt_decode(token).id;
            const photoList = await getAllPhotosFromUser(userID);
            console.log(photoList)
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchPhotos();
        setAlbum();
    }, [])


    return (
        <div id="album" className={classes.album} >
            <Grid container justify='center' >
                <div className={classes.main_album}>
                    <p className={classes.yourAlbum}>Your Album</p>
                    <GridList cellHeight={height} cols={5} spacing={spacing}>
                        {dataImages.slice(0, visiable).map((data) => (
                            <GridListTile className={classes.gridListTile} key={data.id}  >
                                <img className={classes.img} src={data.image} alt={data.title} />
                                <span className={classes.moreImg} >
                                    <IconButton aria-label="3dot" className={classes.iconDot}>
                                        <MoreHorizIcon fontSize="medium" />
                                    </IconButton>
                                </span>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </Grid >
            {visiable < dataImages.length &&
                <Button variant='contained' className={classes.btnMore} size='small' onClick={() => setVisiable(visiable + 3)}>
                    More
                </Button>
            }

        </div>
    )
}

const useStylesAlbum = makeStyles((theme) => ({
    album: {
        width: '100%',
        marginTop: '97px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    yourAlbum: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#000',
        margin: '1em 0em 1em 0em',
        borderRadius: '15px',
        fontFamily: 'Quicksand',

    },
    main_album: {
        width: '92%',
    },
    gridListTile: {
        position: 'relative',
    },
    img: {
        backgroundSize: 'cover',
        height: '100%',
        width: '100%',
        borderRadius: '10px',
        cursor: 'pointer',
        '&:hover': {

        },
    },
    moreImg: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        padding: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: '#039be5',
        }
    },
    iconDot: {
        padding: '0',
        '&:hover': {
            color: '#ffffff',
        }
    },
    btnMore: {
        backgroundColor: '#039be5',
        borderRadius: '5px',
        margin: '2em 0em 1.5em 0em ',
        padding: '0.5rem 1rem',
        color: '#fff',
        fontSize: 'large'
    },

}));


//FeedBack


