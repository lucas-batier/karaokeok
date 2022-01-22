import React, {useRef, useState} from "react";
import {Box, ButtonBase, Card, Typography, useTheme} from "@mui/material";
import {songShape} from "../../models/songs";
import ReactPlayer from "react-player/lazy";
import screenfull from "screenfull";


function SongCard({song}) {
    const theme = useTheme();

    const player = useRef(null);

    const [play, setPlay] = useState(false);

    const handleClick = () => {
        setPlay(true);
    };

    const handleStart = () => {
        if (screenfull.isEnabled) {
            screenfull.request(player.current.wrapper);
        }
    };

    const handleEnd = () => {
        if (screenfull.isFullscreen) {
            screenfull.exit().finally(() => setPlay(false));
        }
        setPlay(false);
    };

    return (
        <>
            <Card style={{width: 150, height: 150}}>
                <ButtonBase
                    onClick={handleClick}
                    style={{width: 150, height: 150}}
                >
                    {!play ? (
                        <>
                            <img
                                src={song.thumbnail_url}
                                alt={song.title}
                                style={{width: 150, height: 150, opacity: 0.3}}
                                color={theme.palette.background.paper}
                            />
                            <Box position={"absolute"} textAlign={"center"}>
                                <Typography style={{fontWeight: 600}}>
                                    {song.title}
                                </Typography>
                                <Typography color={"textSecondary"} variant={"caption"}>
                                    {song.artist}
                                    {song.featuring_artist?.map(featuring_artist => `, ${featuring_artist}`)}
                                </Typography>
                            </Box>
                        </>
                        ) : (
                        <ReactPlayer
                            ref={player}
                            url={song.youtube_url}
                            playing
                            style={{width: 150, height: 150}}
                            onStart={handleStart}
                            onEnded={handleEnd}
                            onPause={handleEnd}
                        />
                    )}
                </ButtonBase>
            </Card>
        </>
    );
}

SongCard.propTypes = {
    songs: songShape,
};

export default SongCard;
