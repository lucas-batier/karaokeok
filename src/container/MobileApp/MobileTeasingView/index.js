import {Typography, Box, useTheme} from "@mui/material";
import MobileApp from "../index";
import Countdown from "../../../components/Countdown";
import {useState} from "react";

function MobileTeasingView() {
    const theme = useTheme();

    const [date, setDate] = useState('14-02-2022 20:00:00');

    setInterval(() => {
        setDate('');
        setDate('14-02-2022 20:00:00');
    }, 1000);

    return (
        <MobileApp title={"KaraokeOK"}>
            <Box display={"flex"} flexDirection={"column"} mx={2} my={6}>
                <Typography variant={"h2"}>
                    KaraokeOK
                </Typography>
                <Typography variant={"h5"}>
                    SORTIE DANS
                </Typography>
                <Countdown date={date} />
                <Typography variant={"h5"}>
                    Roulement de tambour... 🥁
                </Typography>
                <Box alignSelf={"center"} my={3}>
                    <img className={'App-disclogo'} src={"disclogo512.png"} width={theme.spacing(32)} height={theme.spacing(32)} alt={"KaraokeOK"} />
                </Box>
                <Typography variant={"h6"}>
                    L’application est en cours de finalisation et une version beta sera disponible le
                    <Typography variant={"h5"} component={"span"} color={"primary"}>
                        &nbsp;14 février&nbsp;
                    </Typography>
                    ! 💕
                </Typography>
                <Typography variant={"h6"} mt={1}>
                    Juste le temps de faire vos vocalises 🎤
                </Typography>
            </Box>
        </MobileApp>
    );
}

export default MobileTeasingView;
