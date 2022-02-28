import React from "react";
import MobileApp from "../index";
import {
    Box,
    Paper,
    useTheme,
} from "@mui/material";
import AddProposalForm from "../../../components/Form/ProposalForm/AddProposalForm";


function MobileAddProposalView() {
    const theme = useTheme();

    return (
        <MobileApp title={'Propositions'}>
            <Box mx={2} mt={3}>
                <Paper style={{padding: theme.spacing(3)}}>
                    <AddProposalForm />
                </Paper>
            </Box>
        </MobileApp>
    );
}

export default MobileAddProposalView;
