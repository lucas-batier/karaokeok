import React from "react";
import MobileApp from "../index";
import {
    Box,
    Paper,
    useTheme,
} from "@mui/material";
import FeedbackForm from "../../../components/Form/FeedbackForm";


function MobileFeedbackView() {
    const theme = useTheme();

    return (
        <MobileApp title={'Avis'}>
            <Box mx={2} mt={3}>
                <Paper style={{padding: theme.spacing(3)}}>
                    <FeedbackForm />
                </Paper>
            </Box>
        </MobileApp>
    );
}

export default MobileFeedbackView;
