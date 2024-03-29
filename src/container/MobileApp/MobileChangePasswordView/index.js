import React from "react";
import MobileApp from "../index";
import {
    Box,
    Paper,
    useTheme
} from "@mui/material";
import ChangePasswordForm from "../../../components/Form/ResetPasswordForm";


function MobileChangePasswordView() {
    const theme = useTheme();

    return (
        <MobileApp title={'Nouveau mot de passe'}>
            <Box mx={2} mt={3}>
                <Paper style={{padding: theme.spacing(3)}}>
                    <ChangePasswordForm />
                </Paper>
            </Box>
        </MobileApp>
    );
}

export default MobileChangePasswordView;
