import {withUser} from "../../contexts/userContext";
import {LoginRounded, AccountCircleRounded, LogoutRounded, InfoRounded} from "@mui/icons-material";
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Divider,
    Typography,
    useTheme,
} from "@mui/material";
import {userShape} from "../../models/users";
import {useState} from "react";
import {removeCurrentUserFromStorage} from "../../libs/user";

function UserLoginListItemButton({user}) {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (user.id) {
        return (
            <List>
                <ListItemButton
                    onClick={handleClick}
                    style={{borderRadius: theme.shape.borderRadius, margin: theme.spacing(1)}}
                >
                    <ListItemIcon>
                        <AccountCircleRounded />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography noWrap>{user.fullName}</Typography>}
                        style={{whiteSpace: "nowrap"}}
                    />
                </ListItemButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem component={"a"} href={"/account"}>
                        <ListItemIcon>
                            <AccountCircleRounded fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Compte</ListItemText>
                    </MenuItem>
                    <MenuItem component={"a"} href={"/legals"}>
                        <ListItemIcon>
                            <InfoRounded fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Mentions légales</ListItemText>
                    </MenuItem>
                    <Divider variant={"middle"} />
                    <MenuItem onClick={() => {
                        localStorage.removeItem('token');
                        sessionStorage.removeItem('token');
                        removeCurrentUserFromStorage();
                        window.location.replace('/');
                    }}>
                        <ListItemIcon>
                            <LogoutRounded fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Se déconnecter</ListItemText>
                    </MenuItem>
                </Menu>
            </List>
        );
    }

    return (
        <List>
            <ListItemButton component={"a"} href={"/login"} style={{borderRadius: theme.shape.borderRadius, margin: theme.spacing(1)}}>
                <ListItemIcon>
                    <LoginRounded />
                </ListItemIcon>
                <ListItemText primary={'Se connecter'} style={{whiteSpace: "nowrap"}} />
            </ListItemButton>
        </List>
    )
}

export default withUser(UserLoginListItemButton);

UserLoginListItemButton.propTypes = {
    user: userShape,
};
