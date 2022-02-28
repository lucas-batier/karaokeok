import React from "react";
import BrowserApp from "../index";
import {
    Box,
    Paper,
    useTheme,
} from "@mui/material";
import EditProposalForm from "../../../components/Form/ProposalForm/EditProposalForm";


function BrowserEditProposalView() {
    const theme = useTheme();

    return (
        <BrowserApp title={'Propositions'}>
            <Box mx={36}>
                <Paper style={{padding: theme.spacing(6)}}>
                    <EditProposalForm />
                </Paper>
            </Box>
        </BrowserApp>
    );
}

export default BrowserEditProposalView;
