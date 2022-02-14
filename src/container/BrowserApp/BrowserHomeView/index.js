import React from "react";
import {Box, useTheme, Grid} from "@mui/material";
import BrowserApp from "../index";
import {LibraryMusicRounded} from "@mui/icons-material";
import LineButtonCard from "../../../components/LineButtonCard";
import HomeText from "../../../components/HomeText";


function BrowserHomeView() {
    const theme = useTheme();

    return (
        <BrowserApp title={"KaraokeOK"}>
            <Box display={"flex"} justifyContent={"center"} m={3}>
                <Grid container columnSpacing={6} justifyContent={"center"} alignItems={"center"}>
                    <Grid item xs={12}>
                        <HomeText />
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
