import React from "react";
import MobileApp from "../index";
import {
    Box,
    Paper,
    useTheme
} from "@mui/material";
import ProfileForm from "../../../components/Form/ProfileForm";
import {withUser} from "../../../contexts/userContext";
import {userShape} from "../../../models/users";


function MobileProfileView({user}) {
    const theme = useTheme();

    return (
        <MobileApp title={user?.fullName}>
            <Box mx={2} mt={3}>
                <Paper style={{padding: theme.spacing(3)}}>
                    <ProfileForm />
                </Paper>
            </Box>
        </MobileApp>
    );
}

export default withUser(MobileProfileView);

MobileProfileView.propTypes = {
    user: userShape,
}
