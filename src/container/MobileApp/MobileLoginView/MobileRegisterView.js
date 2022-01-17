import React from "react";
import MobileApp from "../index";
import {
    Box,
    Paper,
    useTheme
} from "@mui/material";
import RegisterForm from "../../../components/RegisterForm";


function MobileRegisterView() {
    const theme = useTheme();

    return (
        <MobileApp title={'Créer un compte'}>
            <Box mx={3}>
                <Paper style={{padding: theme.spacing(3)}}>
                    <RegisterForm />
                </Paper>
            </Box>
        </MobileApp>
    );
}

export default MobileRegisterView;
