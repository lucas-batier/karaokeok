import React from "react";
import BrowserApp from "../index";
import {
    Box,
    Paper,
    useTheme,
} from "@mui/material";
import FeedbackForm from "../../../components/Form/FeedbackForm";


function BrowserFeedbackView() {
    const theme = useTheme();

    return (
        <BrowserApp title={'Avis'}>
            <Box mx={36}>
                <Paper style={{padding: theme.spacing(6)}}>
                    <FeedbackForm />
                </Paper>
            </Box>
        </BrowserApp>
    );
}

export default BrowserFeedbackView;
