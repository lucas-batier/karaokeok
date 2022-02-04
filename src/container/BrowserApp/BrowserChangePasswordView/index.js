import React from "react";
import BrowserApp from "../index";
import {
    Box,
    Paper,
    useTheme
} from "@mui/material";
import ChangePasswordForm from "../../../components/Form/ChangePasswordForm";


function BrowserChangePasswordView() {
    const theme = useTheme();

    return (
        <BrowserApp title={'Réinitialisation de mot de passe'}>
            <Box mx={36}>
                <Paper style={{padding: theme.spacing(6)}}>
                    <ChangePasswordForm />
                </Paper>
            </Box>
        </BrowserApp>
    );
}

export default BrowserChangePasswordView;
