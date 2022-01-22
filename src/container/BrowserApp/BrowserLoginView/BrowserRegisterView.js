import React from "react";
import BrowserApp from "../index";
import {
    Box,
    Paper,
    useTheme
} from "@mui/material";
import RegisterForm from "../../../components/RegisterForm";


function BrowserRegisterView() {
    const theme = useTheme();

    return (
        <BrowserApp title={'Créer un compte'}>
            <Box mx={36}>
                <Paper style={{padding: theme.spacing(6)}}>
                    <RegisterForm />
                </Paper>
            </Box>
        </BrowserApp>
    );
}

export default BrowserRegisterView;
