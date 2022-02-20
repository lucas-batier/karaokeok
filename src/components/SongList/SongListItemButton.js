import React, {useRef, useState} from "react";
import {ListItemButton, ListItemIcon, ListItemText, useTheme} from "@mui/material";
import {songShape} from "../../models/songs";
import screenfull from "screenfull";
import ReactPlayer from "react-player/lazy";


function SongListItemButton({song}) {
    const theme = useTheme();

    const player = useRef(null);

    const [play, setPlay] = useState(false);

    const handleClick = () => {
        // @todo Virer le commentaire lorsque le fullscreen téléphone sera géré
        // setPlay(true);
    };

    const handleStart = () => {
        // @todo Gérer fullscreen téléphone
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
        !play ? (
            <ListItemButton component={"a"} href={song.youtube_url} disableRipple disableGutters>
                <ListItemIcon>
                    <img src={song.thumbnail_url} alt={song.title} title={song.title} width={50} height={50}/>
                </ListItemIcon>
                <ListItemText primary={song.title} secondary={song.artist} style={{marginLeft: theme.spacing(1)}}/>
            </ListItemButton>
        ) : (
            <ReactPlayer
                ref={player}
                url={song.youtube_url}
                controls
                playing
                style={{width: 150, height: 150}}
                onStart={handleStart}
                onEnded={handleEnd}
                onPause={handleEnd}
            />
        )
    );
}

SongListItemButton.propTypes = {
    song: songShape,
};

export default SongListItemButton;
