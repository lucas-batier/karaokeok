import React from "react";
import BrowserApp from "../index";
import {
    Box,
    Paper,
    useTheme
} from "@mui/material";
import ProfileForm from "../../../components/ProfileForm";
import {withUser} from "../../../contexts/userContext";
import {userShape} from "../../../models/users";


function BrowserProfileView({user}) {
    const theme = useTheme();

    return (
        <BrowserApp title={user?.fullName}>
            <Box mx={36}>
                <Paper style={{padding: theme.spacing(6)}}>
                    <ProfileForm />
                </Paper>
            </Box>
        </BrowserApp>
    );
}

export default withUser(BrowserProfileView);

BrowserProfileView.propTypes = {
    user: userShape,
}
