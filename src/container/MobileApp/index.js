import React from "react";
import {
    AppBar,
    Box, ButtonBase,
    Grid,
    Toolbar,
    Typography
} from "@mui/material";
import {HomeRounded, LibraryMusicRounded, AddReactionRounded} from "@mui/icons-material";
import UserLoginIconButton from "../../components/UserLoginIconButton";


function MobileApp(props) {
    return (
        <Grid container>
            <Grid item m={2} xs={12}>
                <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant={"h5"}>
                        {props.title}
                    </Typography>
                    <UserLoginIconButton />
                </Box>
            </Grid>
            <Grid item xs={12}>
                {props.children}
                <Toolbar />
            </Grid>
            <AppBar position="fixed" color="primary" sx={{top: 'auto', bottom: 0}}>
                <Toolbar>
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
                    <ButtonBase component={"a"} href={"/proposal"} disableTouchRipple>
                        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                            <AddReactionRounded />
                            <Typography variant={"caption"}>
                                Propositions
                            </Typography>
                        </Box>
                    </ButtonBase>
                    {/*<ButtonBase component={"a"} href={"/playlist"} disableTouchRipple>*/}
                    {/*    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>*/}
                    {/*        <SubscriptionsRounded/>*/}
                    {/*        <Typography variant={"caption"}>*/}
                    {/*            Vos playlists*/}
                    {/*        </Typography>*/}
                    {/*    </Box>*/}
                    {/*</ButtonBase>*/}
                    {/*<Box sx={{ flexGrow: 1 }} />*/}
                </Toolbar>
            </AppBar>
        </Grid>
    );
}

export default MobileApp;
