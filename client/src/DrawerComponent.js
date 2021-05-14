import React, { useState } from 'react'
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

    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <Drawer
                anchor='right'
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}>
                <List>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon >
                            <ExtensionIcon />
                        </ListItemIcon>
                        <ListItemText primary="MORE" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse className={classes.nested} in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemIcon >
                                    <ContactsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Contact" />
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemIcon >
                                    <HelpIcon />
                                </ListItemIcon>
                                <ListItemText primary="Guide" />
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemIcon >
                                    <EmojiObjectsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Tips" />
                            </ListItem>
                        </List>
                    </Collapse>
                    {login ? (
                        <>
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon >
                                    <AssignmentIndIcon />
                                </ListItemIcon>
                                <ListItemText>ACCOUNT</ListItemText>
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <ListItemIcon >
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText>LOG OUT</ListItemText>
                            </ListItem>
                        </>
                    ) : (
                        <ListItem button className={classes.listItem}>
                            <ListItemIcon >
                                <AssignmentIndIcon />
                            </ListItemIcon>
                            <ListItemText>LOGIN</ListItemText>
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
