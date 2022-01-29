import React from "react";
import {
    Box,
    Drawer,
    Grid,
    List, ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Typography,
    useTheme
} from "@mui/material";
import {HomeRounded, LibraryMusicRounded} from "@mui/icons-material";
import UserLoginListItemButton from "../../components/UserLoginListItemButton";


function BrowserApp(props) {
    const theme = useTheme();

    const drawerWidth = 240;

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="nav"
                sx={{ width: drawerWidth, flexShrink: 0 }}
            >
                <Drawer
                    variant={"permanent"}
                    sx={{'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },}}
                >
                    <List>
                        <ListItem>
                            <Grid container flexDirection={"row"} spacing={2} alignItems={"center"} component={"a"} href={"/"}>
                                <Grid item>
                                    <img src={"logo512-white.png"} alt={"Karaoke OK"} height={36} />
                                </Grid>
                                <Grid item>
                                    <img
                                        src={"brand-white.png"}
                                        alt={"KaraokeOK"}
                                        height={30}
                                    />
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItemButton
                            component={"a"}
                            href={"/"}
                            style={{borderRadius: theme.shape.borderRadius, margin: theme.spacing(1)}}
                        >
                            <ListItemIcon>
                                <HomeRounded />
                            </ListItemIcon>
                            <ListItemText primary={'Accueil'} style={{whiteSpace: "nowrap"}} />
                        </ListItemButton>
                        <ListItemButton
                            component={"a"}
                            href={"/songs"}
                            style={{borderRadius: theme.shape.borderRadius, margin: theme.spacing(1)}}
                        >
                            <ListItemIcon>
                                <LibraryMusicRounded />
                            </ListItemIcon>
                            <ListItemText primary={'Bibliothèque'} style={{whiteSpace: "nowrap"}} />
                        </ListItemButton>
                        {/*<ListItemButton component={"a"} href={"/playlist"} style={{borderRadius: theme.shape.borderRadius, margin: theme.spacing(1)}}>*/}
                        {/*    <ListItemIcon>*/}
                        {/*        <SubscriptionsRounded />*/}
                        {/*    </ListItemIcon>*/}
                        {/*    <ListItemText primary={'Vos playlists'} style={{whiteSpace: "nowrap"}} />*/}
                        {/*</ListItemButton>*/}
                    </List>
                    <div style={{flex: 1}} />
                    <UserLoginListItemButton />
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, width: `calc(100% - ${drawerWidth}px)` }}
            >
                <Grid container>
                    <Grid item xs={12} mx={3} mt={3}>
                        <Typography variant={"h2"}>
                            {props.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} m={3}>
                        {props.children}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default BrowserApp;
