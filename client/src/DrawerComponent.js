import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles((theme) => ({
    menuIconContainer: {
        marginLeft: 'auto'
    },
    listItem:{
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
