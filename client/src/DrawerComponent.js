import React, { useState } from 'react'
import {
    makeStyles,
    Drawer,
    List,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MailIcon from '@material-ui/icons/Mail';

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
    }
}))

export default function DrawerComponent() {

    const [openDrawer, setOpenDrawer] = useState(false);
    const classes = useStyles();
    const [login, setLogin] = useState(true)

    return (
        <>

            <Drawer
                anchor='right'
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}>
                <List>
                    <ListItem button className={classes.listItem}>
                        <ListItemIcon >
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText>ABOUT</ListItemText>
                    </ListItem>
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
