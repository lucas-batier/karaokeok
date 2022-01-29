import React from "react";
import LegalMentionsView from "../../../components/LegalMentionsView";
import MobileApp from "../index";
import {Box} from "@mui/material";


function MobileLegalMentionsView() {
    return (
        <MobileApp title={"Mentions légales"}>
            <Box mx={2} mt={3}>
                <LegalMentionsView />
            </Box>
        </MobileApp>
    );
}

export default MobileLegalMentionsView;
