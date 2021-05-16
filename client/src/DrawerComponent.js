import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { Link } from 'react-scroll'
import {
    makeStyles,
    Drawer,
    List,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExtensionIcon from '@material-ui/icons/Extension';
import ContactsIcon from '@material-ui/icons/Contacts';
import HelpIcon from '@material-ui/icons/Help';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

const useStyles = makeStyles((theme) => ({
    menuIconContainer: {
        marginLeft: 'auto'
    },
    listItem: {
        color: 'black',
        '&:hover': {
            backgroundColor: '#12a0d0',
            color: '#fefefe'
        }
    },
    nested: {
        paddingLeft: theme.spacing(2)
    }
}))

export default function DrawerComponent() {

    const [openDrawer, setOpenDrawer] = useState(false);
    const classes = useStyles();
    const [login, setLogin] = useState(true)
    let history = useHistory();
    return (
        <>
            <Drawer
                anchor='right'
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}>
                <List>
                    <Link
                        activeClass="active"
                        to="album" spy={true}
                        smooth={true}
                        offset={0}
                        duration={500}
                        delay={100}>
                        <ListItem button >
                        <ListItemIcon >
                            <ExtensionIcon />
                        </ListItemIcon>
                        <ListItemText primary="Album" />
                    </ListItem>
                    </Link>
                    
                    <Link
                        activeClass="active"
                        to="feedback" spy={true}
                        smooth={true}
                        offset={0}
                        duration={500}
                        delay={100}>
                        <ListItem button >
                        <ListItemIcon >
                            <ExtensionIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contact" />
                    </ListItem>
                    </Link>
                    {login ? (
                        <>
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon >
                                    <AssignmentIndIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon >
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary="Log out" />
                            </ListItem>
                        </>
                    ) : (
                        <ListItem button className={classes.listItem} onClick={() => history.push("/login")}>
                            <ListItemIcon >
                                <AssignmentIndIcon />
                            </ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItem>
                    )}
                </List>
            </Drawer>
            <IconButton className={classes.menuIconContainer} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </>
    )
}
