import React from "react";
import {Box, useTheme} from "@mui/material";
import BrowserApp from "../index";
import {LibraryMusicRounded, AddReactionRounded} from "@mui/icons-material";
import ColumnButtonCard from "../../../components/ColumnButtonCard";


function BrowserHomeView() {
    const theme = useTheme();

    return (
        <BrowserApp title={"KaraokeOK"}>
            <Box display={"flex"} justifyContent={"center"} m={3}>
                <Box display={"flex"} justifyContent={"center"} m={3}>
                    <img
                        className={'App-disclogo'}
                        src={"disclogo512.png"}
                        width={theme.spacing(54)}
                        height={theme.spacing(54)}
                        alt={"KaraokeOK"}
                    />
                </Box>
                <ColumnButtonCard
                    href={"/songs"}
                    text={"Aller à la bibliothèque"}
                    icon={<LibraryMusicRounded />}
                />
            </Box>
        </BrowserApp>
    );
}

export default BrowserHomeView;
