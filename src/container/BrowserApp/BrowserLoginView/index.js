import React from "react";
import BrowserApp from "../index";
import {
    Box,
    Paper,
    useTheme
} from "@mui/material";
import LoginForm from "../../../components/Form/LoginForm";


function BrowserLoginView() {
    const theme = useTheme();

    return (
        <BrowserApp title={'Connexion'}>
            <Box mx={36}>
                <Paper style={{padding: theme.spacing(6)}}>
                    <LoginForm />
                </Paper>
            </Box>
        </BrowserApp>
    );
}

export default BrowserLoginView;
