import React from "react";
import MobileApp from "../index";
import {
    Box,
    Paper,
    useTheme,
} from "@mui/material";


function MobileProposalView() {
    const theme = useTheme();

    return (
        <MobileApp title={'Propositions'}>
            <Box mx={2} mt={3}>
                <Paper style={{padding: theme.spacing(3)}}>
                    Proposal table
                </Paper>
            </Box>
        </MobileApp>
    );
}

export default MobileProposalView;
