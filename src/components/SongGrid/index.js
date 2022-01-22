import React from "react";
import {Grid} from "@mui/material";
import PropTypes from "prop-types";
import {songShape} from "../../models/songs";
import SongCard from "./SongCard";


function SongGrid({songs}) {
    return (
        <Grid container columnSpacing={6}>
            {songs?.map((song, index) => (
                <Grid item key={index} my={3}>
                    <SongCard song={song} />
                </Grid>
            ))}
        </Grid>
    );
}

SongGrid.propTypes = {
    songs: PropTypes.arrayOf(songShape),
};

export default SongGrid;
