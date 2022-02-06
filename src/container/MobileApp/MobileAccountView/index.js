import {withUser} from "../../../contexts/userContext";
import {Box, Button} from "@mui/material";
import AccountView from "../../../components/AccountView";
import MobileApp from "../index";


function MobileAccountView({user}) {
    return (
        <MobileApp title={user?.fullName}>
            <Box m={2} display={"flex"} flexDirection={"column"}>
                <AccountView />
                <Box mt={6} alignSelf={"center"}>
                    <Button variant={"contained"} component={"a"} href={"/profile"}>
                        Modifier
                    </Button>
                </Box>
                <Box my={3} alignSelf={"center"}>
                    <Button variant={"contained"} component={"a"} href={"/legals"} color={"secondary"}>
                        Mentions légales
                    </Button>
                </Box>
            </Box>
        </MobileApp>
    )
}

export default withUser(MobileAccountView);
