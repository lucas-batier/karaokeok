import {Typography, Box} from "@mui/material";

function TeasingView() {
    return (
        <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} m={3}>
            <Typography>
                Roulement de tambour ! 🥁
            </Typography>
            <Typography>
                L’application est en cours de finalisation et sera disponible sous peu 🎤
            </Typography>
            <img className={'App-disclogo'} src={"disclogo512.png"} alt={"KaraokeOK"} />
        </Box>
    );
}

export default TeasingView;
