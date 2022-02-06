import React from "react";
import {Box, useTheme, Grid, Typography} from "@mui/material";
import BrowserApp from "../index";
import {LibraryMusicRounded, AddReactionRounded, LoginRounded} from "@mui/icons-material";
import ColumnButtonCard from "../../../components/ColumnButtonCard";


function BrowserHomeView() {
    const theme = useTheme();

    return (
        <BrowserApp title={"KaraokeOK"}>
            <Box display={"flex"} justifyContent={"center"} m={3}>
                <Grid container mr={6} columnSpacing={6} justifyContent={"space-between"} alignItems={"center"}>
                    <Grid item xs={12}>
                        <Typography variant={"h4"}>
                            Prêt à vous casser la voix ?!
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
