import React from "react";
import MobileApp from "../index";
import {
    Box,
    Paper,
    useTheme
} from "@mui/material";
import SendPasswordResetEmailForm from "../../../components/Form/SendPasswordResetEmailForm";


function MobileResetPasswordView() {
    const theme = useTheme();

    return (
        <MobileApp title={'Mot de passe oublié'}>
            <Box mx={2} mt={3}>
                <Paper style={{padding: theme.spacing(3)}}>
                    <SendPasswordResetEmailForm />
                </Paper>
            </Box>
        </MobileApp>
    );
}

export default MobileResetPasswordView;
