import React from "react";
import MobileApp from "../index";
import {Box, useTheme} from "@mui/material";
import {LibraryMusicRounded} from "@mui/icons-material";
import LineButtonCard from "../../../components/LineButtonCard";
import HomeText from "../../../components/HomeText";


function MobileHomeView() {
    const theme = useTheme();

    return (
        <MobileApp title={"KaraokeOK"}>
            <Box m={2} display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <HomeText />
                <LineButtonCard
                    href={"/songs"}
                    text={"Bibliothèque"}
                    icon={<LibraryMusicRounded />}
                />
                <Box alignSelf={"center"} mt={3}>
                    <img className={'App-disclogo'} src={"disclogo512.png"} width={theme.spacing(32)} height={theme.spacing(32)} alt={"KaraokeOK"} />
                </Box>
            </Box>
        </MobileApp>
    );
}

export default MobileHomeView;
