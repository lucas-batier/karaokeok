import {withUser} from "../../../contexts/userContext";
import {Box} from "@mui/material";
import BrowserApp from "../index";
import AccountView from "../../../components/AccountView";


function BrowserAccountView({user}) {
    return (
        <BrowserApp title={user?.fullName}>
            <Box mx={6}>
                <AccountView />
            </Box>
        </BrowserApp>
    )
}

export default withUser(BrowserAccountView);
