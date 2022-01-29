import {withUser} from "../../contexts/userContext";
import {LoginRounded, AccountCircleRounded} from "@mui/icons-material";
import {
    ButtonBase,
    Box,
    Typography,
} from "@mui/material";
import {userShape} from "../../models/users";

function UserLoginListItemButton({user}) {
    if (user.id) {
        return (
            <ButtonBase component={"a"} href={"/profile"} disableTouchRipple>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                    <AccountCircleRounded />
                    <Typography variant={"caption"}>
                        {user.fullName}
                    </Typography>
                </Box>
            </ButtonBase>
        );
    }

    return (
        <ButtonBase component={"a"} href={"/login"} disableTouchRipple>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <LoginRounded />
                <Typography variant={"caption"}>
                    Se connecter
                </Typography>
            </Box>
        </ButtonBase>
    )
}

export default withUser(UserLoginListItemButton);

UserLoginListItemButton.propTypes = {
    user: userShape,
};
