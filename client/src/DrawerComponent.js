// import React, { useState, useEffect } from 'react'
// import { useHistory } from "react-router-dom";
// import { Link } from 'react-scroll'
// import {
//     makeStyles,
//     Drawer,
//     List,
//     IconButton,
//     ListItem,
//     ListItemIcon,
//     ListItemText,
// } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
// import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import { ExtensionIcon } from '@material-ui/icons/Extension';

// const useStyles = makeStyles((theme) => ({
//     menuIconContainer: {
//         marginLeft: 'auto'
//     },
//     listItem: {
//         color: 'black',
//         '&:hover': {
//             backgroundColor: '#12a0d0',
//             color: '#fefefe'
//         }
//     },
//     nested: {
//         paddingLeft: theme.spacing(2)
//     }
// }))

// export default function DrawerComponent() {

//     const [openDrawer, setOpenDrawer] = useState(false);
//     const classes = useStyles();

//     const [token, setToken] = useState('')

//     // useEffect(() => {
//     //     const token = localStorage.getItem('accessToken')
//     //     token ? setToken(token) : history.push('/login')
//     // }, [])
//     let history = useHistory();
//     return (
//         <>
//             <Drawer
//                 anchor='right'
//                 onClose={() => setOpenDrawer(false)}
//                 open={openDrawer}>
//                 <List>
//                     <ListItem button >
//                         <ListItemIcon >
//                             <ExtensionIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Album" />
//                     </ListItem>
//                     <ListItem button >
//                         <ListItemIcon >
//                             <ExtensionIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Contact" />
//                     </ListItem>

//                     {token ? (
//                         <>
//                             <ListItem button className={classes.listItem}>
//                                 <ListItemIcon >
//                                     <AssignmentIndIcon />
//                                 </ListItemIcon>
//                                 <ListItemText primary="Profile" />
//                             </ListItem>
//                             <ListItem button className={classes.listItem}>
//                                 <ListItemIcon >
//                                     <ExitToAppIcon />
//                                 </ListItemIcon>
//                                 <ListItemText primary="Log out" />
//                             </ListItem>
//                         </>
//                     ) : (
//                         <ListItem button className={classes.listItem} onClick={() => history.push("/login")}>
//                             <ListItemIcon >
//                                 <AssignmentIndIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="Login" />
//                         </ListItem>
//                     )}
//                 </List>
//             </Drawer>
//             <IconButton className={classes.menuIconContainer} onClick={() => setOpenDrawer(!openDrawer)}>
//                 <MenuIcon />
//             </IconButton>
//         </>
//     )
// }
