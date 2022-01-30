import PropTypes from "prop-types";
import moment from "moment";
import {Box, Typography, CircularProgress} from "@mui/material";


function Clock({value, percentageValue, label}) {
    return (
        <>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" value={percentageValue} size={'4rem'} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h4">
                        {value}
                    </Typography>
                </Box>
            </Box>
            <Typography variant={"body1"} mt={2}>
                {label}
            </Typography>
        </>
    )
}


function Countdown({date}) {
    const countdown = moment(moment(date, "DD-MM-YYYY hh:mm:ss") - moment.now());

    const days = parseInt(countdown.format('D')) - 1;
    const hours = parseInt(countdown.format('HH'));
    const minutes = parseInt(countdown.format('mm'));
    const seconds = parseInt(countdown.format('ss'));

    return (
        <Box display={"flex"} my={6} justifyContent={"space-between"}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Clock percentageValue={days / 30 * 100} value={days} label={'JOURS'} />
            </Box>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Clock percentageValue={hours / 24 * 100} value={hours} label={'HEURES'} />
            </Box>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Clock percentageValue={minutes / 60 * 100} value={minutes} label={'MINUTES'} />
            </Box>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Clock percentageValue={seconds / 60 * 100} value={seconds} label={'SECONDES'} />
            </Box>
        </Box>
    );
}

export default Countdown;

Countdown.propTypes = {
    date: PropTypes.string,
}
