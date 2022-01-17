import React from "react";
import BrowserApp from "../index";
import {Box} from "@mui/material";


function BrowserHomeView() {
    return (
        <BrowserApp title={"KaraokeOK"}>
            <Box display={"flex"} justifyContent={"center"} m={3}>
                <img className={'App-logo'} src={"logo512-white.png"} alt={"Karaoke OK"} />
            </Box>
        </BrowserApp>
    );
}

export default BrowserHomeView;
