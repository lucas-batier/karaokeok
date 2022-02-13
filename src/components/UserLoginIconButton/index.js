import {withUser} from "../../contexts/userContext";
import {AccountCircleRounded} from "@mui/icons-material";
import {
    ButtonBase,
    Box,
    Typography,
} from "@mui/material";
import {userShape} from "../../models/users";

function UserLoginIconButton({user}) {
    return (
        <ButtonBase component={"a"} href={user.id ? "/account" : "/login"} disableTouchRipple>
            <AccountCircleRounded />
        </ButtonBase>
    )
}

export default withUser(UserLoginIconButton);

UserLoginIconButton.propTypes = {
    user: userShape,
};
