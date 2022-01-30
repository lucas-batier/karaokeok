import React from "react";
import BrowserApp from "../index";
import {
    Box,
    Paper,
    useTheme
} from "@mui/material";
import ResetPasswordForm from "../../../components/forms/ResetPasswordForm";


function BrowserResetPasswordView() {
    const theme = useTheme();

    return (
        <BrowserApp title={'Mot de passe oublié'}>
            <Box mx={36}>
                <Paper style={{padding: theme.spacing(6)}}>
                    <ResetPasswordForm />
                </Paper>
            </Box>
        </BrowserApp>
    );
}

export default BrowserResetPasswordView;
