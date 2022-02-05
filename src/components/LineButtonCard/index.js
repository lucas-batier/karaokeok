import {Card, useTheme, CardActionArea, CardMedia, CardContent} from "@mui/material";
import PropTypes from "prop-types";


function LineButtonCard({href, text, icon}) {
    const theme = useTheme();

    return (
        <Card>
            <CardActionArea sx={{display: "flex", alignItems: "center", justifyContent: "start"}} href={href}>
                <CardMedia
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: theme.spacing(8),
                        height: theme.spacing(8),
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.background.paper,
                    }}
                >
                    {icon}
                </CardMedia>
                <CardContent>
                    {text}
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
}
