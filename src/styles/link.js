import {makeStyles} from "@mui/styles";

export const useLinkStyles = makeStyles((theme) => ({
    primary: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
            color: theme.palette.background.paper,
            backgroundColor: theme.palette.primary.main,
        },
    }
}));
