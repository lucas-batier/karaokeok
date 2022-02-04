import React from "react";
import BrowserApp from "../index";
import {
    Box,
    Paper,
    useTheme
} from "@mui/material";
import SendPasswordResetEmailForm from "../../../components/Form/SendPasswordResetEmailForm";


function BrowserResetPasswordView() {
    const theme = useTheme();

    return (
        <BrowserApp title={'Mot de passe oublié'}>
            <Box mx={36}>
                <Paper style={{padding: theme.spacing(6)}}>
                    <SendPasswordResetEmailForm />
                </Paper>
            </Box>
        </BrowserApp>
    );
}

export default BrowserResetPasswordView;
