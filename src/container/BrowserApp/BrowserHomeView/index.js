import React from "react";
import {Box, useTheme, Grid, Typography, ButtonBase} from "@mui/material";
import BrowserApp from "../index";
import {LibraryMusicRounded, AddReactionRounded, LoginRounded} from "@mui/icons-material";
import ColumnButtonCard from "../../../components/ColumnButtonCard";
import {useLinkStyles} from "../../../styles/link";


function BrowserHomeView() {
    const theme = useTheme();
    const linkClasses = useLinkStyles();

    return (
        <BrowserApp title={"KaraokeOK"}>
            <Box display={"flex"} justifyContent={"center"} m={3}>
                <Grid container mr={6} columnSpacing={6} justifyContent={"space-between"} alignItems={"center"}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} paragraph>
                            T’en as marre de passer plus de temps à choisir le prochain karaoke plutôt qu’à le chanter ?
                        </Typography>
                        <Typography variant={"h6"} paragraph>
                            Essaye <Typography component={"span"} variant={"h6"} color={theme.palette.primary.main}>KaraokeOK</Typography>
                            , première application communautaires avec des versions Karaoke vérifiés !
                        </Typography>
                        <Typography variant={"h6"} paragraph>
                            Prêt à te casser la voix ?
                        </Typography>
                    </Grid>
                    <Grid item>
                        <ColumnButtonCard
                            href={"/songs"}
                            text={"Aller à la bibliothèque"}
                            icon={<LibraryMusicRounded fontSize={"large"} />}
                        />
                    </Grid>
                    <Grid item>
                        <ColumnButtonCard
                            href={"/proposal"}
                            text={"Envoyer une proposition"}
                            icon={<AddReactionRounded fontSize={"large"} />}
                        />
                    </Grid>
                    <Grid item>
                        <ColumnButtonCard
                            href={"/login"}
                            text={"Se connecter"}
                            icon={<LoginRounded fontSize={"large"} />}
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
