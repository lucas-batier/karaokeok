import {withUser} from "../../../contexts/userContext";
import {Box, Button} from "@mui/material";
import BrowserApp from "../index";
import AccountView from "../../../components/AccountView";


function BrowserAccountView({user}) {
    return (
        <BrowserApp title={user?.fullName}>
            <Box mx={6}>
                <AccountView />
                <Box my={6}>
                    <Button variant={"contained"} component={"a"} href={"/profile"}>
                        Modifier
                    </Button>
                </Box>
            </Box>
        </BrowserApp>
    )
}

export default withUser(BrowserAccountView);
