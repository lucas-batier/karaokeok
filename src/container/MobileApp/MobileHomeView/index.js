import React from "react";
import MobileApp from "../index";
import {Grid, Box, useTheme, Typography} from "@mui/material";
import {LibraryMusicRounded, AddReactionRounded, LoginRounded} from "@mui/icons-material";
import LineButtonCard from "../../../components/LineButtonCard";


function MobileHomeView() {
    const theme = useTheme();

    return (
        <MobileApp title={"KaraokeOK"}>
            <Box m={2} display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Typography variant={"h6"} paragraph fontWeight={900}>
                    L'application communautaire avec des karaokes vérifiés !
                </Typography>
                <Typography paragraph ml={3} mb={6} textAlign={"justify"}>
                    - Accéder à une bibliothèque de presque 300 karaoke vérifiés<br/>
                    - Proposer de nouveaux karaokes qui seront validés par l'équipe<br/>
                    - Créer vos playlist pour préparer vos soirées&nbsp;
                    <Typography component={"span"} fontStyle={"italic"}>
                        (disponible au printemps)
                    </Typography>
                </Typography>
                <LineButtonCard
                    href={"/songs"}
                    text={"Bibliothèque"}
                    icon={<LibraryMusicRounded />}
                />
                <Box alignSelf={"center"} my={3}>
                    <img className={'App-disclogo'} src={"disclogo512.png"} width={theme.spacing(32)} height={theme.spacing(32)} alt={"KaraokeOK"} />
                </Box>
            </Box>
        </MobileApp>
    );
}

export default MobileHomeView;
