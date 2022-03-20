import React from "react";
import {
    Box,
    Paper,
    useTheme,
} from "@mui/material";
import EditProposalForm from "../../../components/Form/ProposalForm/EditProposalForm";
import MobileApp from "../index";


function MobileEditProposalView() {
    const theme = useTheme();

    return (
        <MobileApp title={'Propositions'}>
            <Box mx={2} mt={3}>
                <Paper style={{padding: theme.spacing(3)}}>
                    <EditProposalForm />
                </Paper>
            </Box>
        </MobileApp>
    );
}

export default MobileEditProposalView;
