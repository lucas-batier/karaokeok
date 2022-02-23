import React from "react";
import BrowserApp from "../index";
import {
    Box,
    Paper,
    useTheme,
} from "@mui/material";
import ProposalForm from "../../../components/Form/ProposalForm";


function BrowserAddProposalView() {
    const theme = useTheme();

    return (
        <BrowserApp title={'Propositions'}>
            <Box mx={36}>
                <Paper style={{padding: theme.spacing(6)}}>
                    <ProposalForm />
                </Paper>
            </Box>
        </BrowserApp>
    );
}

export default BrowserAddProposalView;
