import {Typography} from "@mui/material";
import {withUser} from "../../contexts/userContext";


function AccountView({user}) {
    return (
        <>
            <Typography variant={"h6"} mt={3}>Nom d'utilisateur</Typography>
            <Typography>{user?.username}</Typography>
            <Typography variant={"h6"} mt={3}>Adresse email</Typography>
            <Typography>{user?.email}</Typography>
        </>
    )
}

export default withUser(AccountView);
