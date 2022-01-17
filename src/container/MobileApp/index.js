// @todo Add navbar on the bottom as browser have it on the left
import React from "react";
import {
    AppBar,
    Box, ButtonBase,
    Grid,
    Toolbar,
    Typography
} from "@mui/material";
import {HomeRounded, LibraryMusicRounded} from "@mui/icons-material";


function MobileApp(props) {
    return (
        <Grid container>
            <Grid item my={2} mx={2} xs={12}>
                <Typography variant={"h5"}>
                    {props.title}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {props.children}
                <Toolbar />
            </Grid>
            <AppBar position="fixed" color="primary" sx={{top: 'auto', bottom: 0}}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <ButtonBase component={"a"} href={"/"} disableTouchRipple>
                        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                            <HomeRounded/>
                            <Typography variant={"caption"}>
                                Accueil
                            </Typography>
                        </Box>
                    </ButtonBase>
                    <Box sx={{ flexGrow: 1 }} />
                    <ButtonBase component={"a"} href={"/songs"} disableTouchRipple>
                        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                            <LibraryMusicRounded />
                            <Typography variant={"caption"}>
                                Bibliothèque
                            </Typography>
                        </Box>
                    </ButtonBase>
                    <Box sx={{ flexGrow: 1 }} />
                    {/*<ButtonBase component={"a"} href={"/playlist"} disableTouchRipple>*/}
                    {/*    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>*/}
                    {/*        <SubscriptionsRounded/>*/}
                    {/*        <Typography variant={"caption"}>*/}
                    {/*            Vos playlists*/}
                    {/*        </Typography>*/}
                    {/*    </Box>*/}
                    {/*</ButtonBase>*/}
                    {/*<Box sx={{ flexGrow: 1 }} />*/}
                    {/*<ButtonBase component={"a"} href={"/login"} disableTouchRipple>*/}
                    {/*    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>*/}
                    {/*        <LoginRounded/>*/}
                    {/*        <Typography variant={"caption"}>*/}
                    {/*            Se connecter*/}
                    {/*        </Typography>*/}
                    {/*    </Box>*/}
                    {/*</ButtonBase>*/}
                </Toolbar>
            </AppBar>
        </Grid>
    );
}

export default MobileApp;
