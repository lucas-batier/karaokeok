import {Card, useTheme, CardActionArea, CardMedia, CardContent, Typography} from "@mui/material";
import PropTypes from "prop-types";


function LineButtonCard({href, text, icon, size="medium"}) {
    const theme = useTheme();

    return (
        <Card>
            <CardActionArea sx={{display: "flex", alignItems: "center", justifyContent: "start"}} href={href}>
                <CardMedia
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: theme.spacing(size === "big" ? 12 : 8),
                        height: theme.spacing(size === "big" ? 12 : 8),
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.background.paper,
                    }}
                >
                    {icon}
                </CardMedia>
                <CardContent>
                    <Typography variant={size === "big" ? "h5" : "body1"} mx={2}>
                        {text}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default LineButtonCard;

LineButtonCard.propTypes = {
    href: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.element,
    size: PropTypes.string,
}
