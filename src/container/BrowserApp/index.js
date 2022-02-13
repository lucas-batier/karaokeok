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
import {HomeRounded, LibraryMusicRounded, AddReactionRounded, SubscriptionsRounded} from "@mui/icons-material";
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
                            <Box component={"a"} href={"/"}>
                                <img
                                    src={"brand-white.png"}
                                    alt={"KaraokeOK"}
                                    height={30}
                                />
                            </Box>
                        </ListItem>
                        <ListItemButton
                            component={"a"}
                            href={"/"}
                            style={{borderRadius: theme.shape.borderRadius, margin: theme.spacing(1)}}
                        >
                            <ListItemIcon>
                                <HomeRounded />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography variant={"body2"} noWrap>
                                        Accueil
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                        <ListItemButton
                            component={"a"}
                            href={"/songs"}
                            style={{borderRadius: theme.shape.borderRadius, margin: theme.spacing(1)}}
                        >
                            <ListItemIcon>
                                <LibraryMusicRounded />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography variant={"body2"} noWrap>
                                        Bibliothèque
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                        {/*<ListItemButton component={"a"} href={"/playlist"} style={{borderRadius: theme.shape.borderRadius, margin: theme.spacing(1)}}>*/}
                        {/*    <ListItemIcon>*/}
                        {/*        <SubscriptionsRounded />*/}
                        {/*    </ListItemIcon>*/}
                        {/*    <ListItemText*/}
                        {/*        disableTypography*/}
                        {/*        primary={*/}
                        {/*            <Typography variant={"body2"} noWrap>*/}
                        {/*                Vos playlists*/}
                        {/*            </Typography>*/}
                        {/*        }*/}
                        {/*    />*/}
                        {/*</ListItemButton>*/}
                        <ListItemButton
                            component={"a"}
                            href={"/proposal"}
                            style={{borderRadius: theme.shape.borderRadius, margin: theme.spacing(1)}}
                        >
                            <ListItemIcon>
                                <AddReactionRounded />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography variant={"body2"} noWrap>
                                        Propositions
                                    </Typography>
                                }
                            />
                        </ListItemButton>
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
