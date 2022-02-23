import {AccountCircleRounded, InfoRounded} from "@mui/icons-material";
import {
    ListItemIcon,
    ListItemText,
    ListItemButton,
    List, Button, Box
} from "@mui/material";
import MobileApp from "../index";
import {withUser} from "../../../contexts/userContext";
import {removeCurrentUserFromStorage} from "../../../libs/user";


function MobileSettingsView({user}) {
    return (
        <MobileApp title={user?.fullName}>
            <Box m={2}>
                <List>
                    <ListItemButton component={"a"} href={"/account"} disableRipple>
                        <ListItemIcon>
                            <AccountCircleRounded />
                        </ListItemIcon>
                        <ListItemText primary={'Compte'} />
                    </ListItemButton>
                    <ListItemButton component={"a"} href={"/legals"} disableRipple>
                        <ListItemIcon>
                            <InfoRounded />
                        </ListItemIcon>
                        <ListItemText primary={'Mentions légales'} />
                    </ListItemButton>
                </List>
                <Box mt={9} textAlign={"center"}>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            localStorage.removeItem('token');
                            sessionStorage.removeItem('token');
                            removeCurrentUserFromStorage();
                            window.location.replace('/');
                        }}
                    >
                        Se déconnecter
                    </Button>
                </Box>
            </Box>
        </MobileApp>
    )
}

export default withUser(MobileSettingsView);
