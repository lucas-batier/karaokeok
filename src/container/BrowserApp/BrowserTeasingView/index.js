import {Typography, Box, useTheme} from "@mui/material";
import BrowserApp from "../index";
import Countdown from "../../../components/Countdown";
import {useState} from "react";

function BrowserTeasingView() {
    const theme = useTheme();

    const [date, setDate] = useState('14-02-2022 20:00:00');

    setInterval(() => {
        setDate('');
        setDate('14-02-2022 20:00:00');
    }, 1000);

    return (
        <BrowserApp title={"KaraokeOK"}>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} m={3}>
                <img
                    className={'App-disclogo'}
                    src={"disclogo512.png"}
                    width={theme.spacing(54)}
                    height={theme.spacing(54)}
                    alt={"KaraokeOK"}
                />
                <Box display={"flex"} flexDirection={"column"} mx={9} my={6}>
                    <Typography variant={"h4"}>
                        SORTIE DANS
                    </Typography>
                    <Countdown date={date} />
                    <Typography variant={"h4"}>
                        Roulement de tambour... 🥁
                    </Typography>
                    <Typography variant={"h5"} mt={2}>
                        L’application est en cours de finalisation et une version beta sera disponible le
                        <Typography variant={"h4"} component={"span"} color={"primary"}>
                            &nbsp;14 février&nbsp;
                        </Typography>
                        ! 💕
                    </Typography>
                    <Typography variant={"h5"} mt={1}>
                        Juste le temps de faire vos vocalises 🎤
                    </Typography>
                </Box>
            </Box>
        </BrowserApp>
    );
}

export default BrowserTeasingView;
