import React from "react";
import MobileApp from "../index";
import {Box} from "@mui/material";


function MobileHomeView() {
    return (
        <MobileApp title={"KaraokeOK"}>
            <Box display={"flex"} justifyContent={"center"} m={3}>
                <img className={'App-logo'} src={"logo512-white.png"} alt={"KaraokeOK"} />
            </Box>
        </MobileApp>
    );
}

export default MobileHomeView;
