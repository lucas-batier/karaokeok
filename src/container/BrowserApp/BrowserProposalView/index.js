import React from "react";
import BrowserApp from "../index";
import {
    Box,
    Paper,
    useTheme,
    Typography
} from "@mui/material";
import ProposalForm from "../../../components/Form/ProposalForm";


function BrowserProposalView() {
    const theme = useTheme();

    return (
        <BrowserApp title={'Proposition'}>
            <Box mx={36}>
                <Paper style={{padding: theme.spacing(6)}}>
                    <ProposalForm />
                </Paper>
            </Box>
        </BrowserApp>
    );
}

export default BrowserProposalView;
