import {withUser} from "../../../contexts/userContext";
import {Box} from "@mui/material";
import AccountView from "../../../components/AccountView";
import MobileApp from "../index";


function MobileAccountView({user}) {
    return (
        <MobileApp title={user?.fullName}>
            <Box mx={2} mt={3}>
                <AccountView />
            </Box>
        </MobileApp>
    )
}

export default withUser(MobileAccountView);
