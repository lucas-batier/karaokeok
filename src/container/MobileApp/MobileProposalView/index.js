import React from "react";
import MobileApp from "../index";
import {
    Box,
    Paper,
    useTheme,
    Typography
} from "@mui/material";
import ProposalForm from "../../../components/Form/ProposalForm";


function MobileProposalView() {
    const theme = useTheme();

    return (
        <MobileApp title={'Propositions'}>
            <Box mx={2} mt={3}>
                <Paper style={{padding: theme.spacing(3)}}>
                    <ProposalForm />
                </Paper>
            </Box>
        </MobileApp>
    );
}

export default MobileProposalView;
