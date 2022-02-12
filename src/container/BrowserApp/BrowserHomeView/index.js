import React from "react";
import {Box, useTheme, Grid, Typography} from "@mui/material";
import BrowserApp from "../index";
import {LibraryMusicRounded, AddReactionRounded, LoginRounded} from "@mui/icons-material";
import LineButtonCard from "../../../components/LineButtonCard";


function BrowserHomeView() {
    const theme = useTheme();

    return (
        <BrowserApp title={"KaraokeOK"}>
            <Box display={"flex"} justifyContent={"center"} m={3}>
                <Grid container columnSpacing={6} justifyContent={"center"} alignItems={"center"}>
                    <Grid item xs={12}>
                        <Typography variant={"h4"} paragraph fontWeight={900}>
                            L'application communautaire avec des karaokes vérifiés !
                        </Typography>
                        <Typography paragraph ml={6} textAlign={"justify"}>
                            - Accéder à une bibliothèque de presque 300 karaoke vérifiés<br/>
                            - Proposer de nouveaux karaokes qui seront validés par l'équipe<br/>
                            - Créer vos playlist pour préparer vos soirées&nbsp;
                            <Typography component={"span"} fontStyle={"italic"}>
                                (disponible au printemps)
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <LineButtonCard
                            href={"/songs"}
                            text={"Bibliothèque"}
                            icon={<LibraryMusicRounded fontSize={"large"} />}
                            size={"big"}
                        />
                    </Grid>
                </Grid>
                <Box display={"flex"} justifyContent={"center"} mx={6}>
                    <img
                        className={'App-disclogo'}
                        src={"disclogo512.png"}
                        width={theme.spacing(54)}
                        height={theme.spacing(54)}
                        alt={"KaraokeOK"}
                    />
                </Box>
            </Box>
        </BrowserApp>
    );
}

export default BrowserHomeView;
