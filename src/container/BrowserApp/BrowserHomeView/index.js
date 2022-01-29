import React from "react";
import {Box} from "@mui/material";
import BrowserApp from "../index";


function BrowserHomeView() {
    return (
        <BrowserApp title={"KaraokeOK"}>
            <Box display={"flex"} justifyContent={"center"} m={3}>
                <img className={'App-disclogo'} src={"disclogo512.png"} alt={"KaraokeOK"} />
            </Box>
        </BrowserApp>
    );
}

export default BrowserHomeView;
