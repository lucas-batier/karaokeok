import React from "react";
import {List} from "@mui/material";
import PropTypes from "prop-types";
import {songShape} from "../../models/songs";
import SongListItemButton from "./SongListItemButton";


function SongList({songs}) {
    return (
        <List disablePadding>
            {songs?.map((song, index) => (
                <SongListItemButton song={song} key={index} />
            ))}
        </List>
    );
}

SongList.propTypes = {
    songs: PropTypes.arrayOf(songShape),
};

export default SongList;
