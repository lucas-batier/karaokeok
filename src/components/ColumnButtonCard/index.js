import {Card, useTheme, CardActionArea, CardMedia, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";


function ColumnButtonCard({href, text, icon}) {
    const theme = useTheme();

    return (
        <Card sx={{ width: theme.spacing(18), height: theme.spacing(18) }}>
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
                        width: theme.spacing(18),
                        height: theme.spacing(18),
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.background.paper,
                    }}
                >
                    {
                        <Box
                            py={2}
                            display={"flex"}
                            flexDirection={"column"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            sx={{
                                width: theme.spacing(18),
                                height: theme.spacing(18),
                            }}
                        >
                            <Box>
                                {icon}
                            </Box>
                            <Typography textAlign={"center"} variant={"h6"}>
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
