import React, {useEffect, useState} from "react";
import MobileApp from "../index";
import {Box, Grid, Typography} from "@mui/material";
import SearchForm from "../../../components/Form/SearchForm";
import Api from "../../../libs/api/client";
import SongList from "../../../components/SongList";


function MobileArtistSongsList() {
    const [songs, setSongs] = useState([]);
    const [delayed, setDelayed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [artists, setArtists] = useState([...new Set(songs?.map(song => song.artist))]);

    useEffect(() => setArtists([...new Set(songs?.map(song => song.artist))]), [songs])

    const onSearchSubmit = () => {
        setLoading(true);

        Api.get('api/songs', {}, ['artist__name', 'title'], searchText)
            .then(response => setSongs(response.data.results))
            .catch(response => console.error(response))
            .finally(() => { setLoading(false) });
    }

    useEffect(() => {
        if (!delayed) {
            setTimeout(function delayHandler() {
                Api.get('api/songs', {}, ['artist__name', 'title'], searchText)
                    .then(response => setSongs(response.data.results))
                    .catch(response => console.error(response))
                    .finally(() => { setLoading(false); setDelayed(false); });
            }, 500);

            setLoading(true);
            setDelayed(true);
        }
    }, [searchText])

    return (
        <MobileApp title={"Bibliothèque"}>
            <Box mx={2} mb={4}>
                <SearchForm
                    searchText={searchText}
                    onSearchTextChange={(text) => setSearchText(text)}
                    onSearchSubmit={onSearchSubmit}
                />
            </Box>
            {loading ?
                <Typography textAlign={"center"} m={6}>
                    Chargement des titres... &#x1F596;&#x1F3FF;
                </Typography> :
                songs?.length === 0 ?
                    <Typography textAlign={"center"} m={6}>
                        Aucun titre ne correpsond à votre recherche &#128546;
                    </Typography> :
                    <Grid container rowSpacing={3}>
                        {artists?.map((artist, index) => {
                            return (
                                <Grid key={index} item xs={12} mx={2}>
                                    <Typography variant={"h6"}>{artist}</Typography>
                                    <SongList songs={songs?.filter(song =>
                                        (song.artist === artist || song.featuring_artist?.includes(artist))
                                    )}/>
                                </Grid>
                            )
                        })}
                    </Grid>
            }
        </MobileApp>
    );
}


export default MobileArtistSongsList;
