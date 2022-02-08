import React from "react";
import MobileApp from "../index";
import {Grid, Box, useTheme} from "@mui/material";
import {LibraryMusicRounded, AddReactionRounded, LoginRounded} from "@mui/icons-material";
import LineButtonCard from "../../../components/LineButtonCard";


function MobileHomeView() {
    const theme = useTheme();

    return (
        <MobileApp title={"KaraokeOK"}>
            <Box m={2} display={"flex"} flexDirection={"column"}>
                <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                        <LineButtonCard
                            href={"/songs"}
                            text={"Aller à la bibliothèque"}
                            icon={<LibraryMusicRounded />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LineButtonCard
                            href={"/proposal"}
                            text={"Envoyer des propositions"}
                            icon={<AddReactionRounded />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LineButtonCard
                            href={"/login"}
                            text={"Se connecter"}
                            icon={<LoginRounded />}
                        />
                    </Grid>
                </Grid>
                <Box alignSelf={"center"} my={3}>
                    <img className={'App-disclogo'} src={"disclogo512.png"} width={theme.spacing(32)} height={theme.spacing(32)} alt={"KaraokeOK"} />
                </Box>
            </Box>
        </MobileApp>
    );
}

export default MobileHomeView;
