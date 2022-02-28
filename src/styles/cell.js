import {makeStyles} from "@mui/styles";

export const useCellStyles = makeStyles((theme) => ({
    stickyRight: {
        position: "sticky",
        right: 0,
        top: 0,
        backgroundColor: theme.palette.background.paper,
        width: "unset",
    },
    stickyLeft: {
        position: "sticky",
        left: 0,
        top: 0,
        backgroundColor: theme.palette.background.paper,
    },
}));
