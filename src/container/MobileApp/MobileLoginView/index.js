import React from "react";
import MobileApp from "../index";
import {
    Box,
    Paper,
    useTheme
} from "@mui/material";
import LoginForm from "../../../components/LoginForm";


function MobileLoginView() {
    const theme = useTheme();

    return (
        <MobileApp title={'Connexion'}>
            <Box mx={3}>
                <Paper style={{padding: theme.spacing(3)}}>
                    <LoginForm />
                </Paper>
            </Box>
        </MobileApp>
    );
}

export default MobileLoginView;
