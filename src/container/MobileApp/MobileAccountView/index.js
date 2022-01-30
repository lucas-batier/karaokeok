import {withUser} from "../../../contexts/userContext";
import {Box, Button} from "@mui/material";
import AccountView from "../../../components/AccountView";
import MobileApp from "../index";


function MobileAccountView({user}) {
    return (
        <MobileApp title={user?.fullName}>
            <Box mx={2} mt={3} display={"flex"} flexDirection={"column"}>
                <AccountView />
                <Box my={6} alignSelf={"center"}>
                    <Button variant={"contained"} component={"a"} href={"/profile"}>
                        Modifier
                    </Button>
                </Box>
            </Box>
        </MobileApp>
    )
}

export default withUser(MobileAccountView);
