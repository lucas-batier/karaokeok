import React, {useEffect, useState} from "react";
import MobileApp from "../index";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import SearchForm from "../../../components/Form/SearchForm";
import Api from "../../../libs/api/client";
import SongList from "../../../components/SongList";


function MobileArtistSongsList() {
    const [songs, setSongs] = useState([]);
    const [delayed, setDelayed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [artists, setArtists] = useState([...new Set(songs?.map(song => song.artist))]);
    const [nextUrl, setNextUrl] = useState('');

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
    }, [searchText]);

    // Add next songs while scrolling to the bottom of the page
    window.onscroll = () => {
        if ((window.innerHeight + Math.ceil(window.scrollY)) >= (document.body.offsetHeight - 50)) {
            if (nextUrl) {
                Api.getRawUrl(nextUrl)
                    .then(response => {
                        setSongs([...songs, ...response.data.results]);
                        setNextUrl(response.data.next);
                    })
                    .catch(response => console.error(response))
                    .finally(() => { setLoading(false) });
            }
        }
    }

    return (
        <MobileApp title={"Bibliothèque"}>
            <Box mx={2} mb={4} mt={2}>
                <SearchForm
                    searchText={searchText}
                    onSearchTextChange={(text) => setSearchText(text)}
                    onSearchSubmit={onSearchSubmit}
                />
            </Box>
            {loading ?
                <Typography textAlign={"center"} m={6}>
                    Chargement des titres... 🖖🏿
                </Typography> :
                songs?.length === 0 ?
                    <Typography textAlign={"center"} m={6}>
                        Aucun titre ne correpsond à votre recherche 😢
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
            {Boolean(nextUrl) && (
                <Box my={12} textAlign={"center"}>
                    <CircularProgress size={"4rem"} />
                </Box>
            )}
        </MobileApp>
    );
}


export default MobileArtistSongsList;
