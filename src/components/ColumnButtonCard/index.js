import {Card, useTheme, CardActionArea, CardMedia, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";


function ColumnButtonCard({href, text, icon}) {
    const theme = useTheme();

    return (
        <Card sx={{ width: theme.spacing(24), height: theme.spacing(24) }}>
            <CardActionArea
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                }}
                href={href}
            >
                <CardMedia
                    sx={{
                        width: theme.spacing(24),
                        height: theme.spacing(24),
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.background.paper,
                    }}
                >
                    {
                        <Box m={3} display={"flex"} flexDirection={"column"} alignItems={"center"}>
                            <Box my={4} fontSize={"large"}>
                                {icon}
                            </Box>
                            <Typography justify={"center"}>
                                {text}
                            </Typography>
                        </Box>
                    }
                </CardMedia>
            </CardActionArea>
        </Card>
    )
}

export default ColumnButtonCard;

ColumnButtonCard.propTypes = {
    href: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.element,
}
