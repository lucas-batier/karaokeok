import React, {useEffect, useState} from "react";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import BrowserApp from "../index";
import SearchForm from "../../../components/Form/SearchForm";
import Api from "../../../libs/api/client";
import SongGrid from "../../../components/SongGrid";


function BrowserArtistView() {
    const [songs, setSongs] = useState([]);
    const [delayed, setDelayed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [artists, setArtists] = useState([...new Set(songs?.map(song => song.artist))]);
    const [nextUrl, setNextUrl] = useState('');

    useEffect(() => setArtists([...new Set(songs?.map(song => song.artist))]), [songs])

    const onSearchSubmit = () => {
        setLoading(true);

        Api.get('api/songs', {}, ['artist__name', 'title'], searchText, 25)
            .then(response => {
                setSongs(response.data.results);
                setNextUrl(response.data.next);
            })
            .catch(response => console.error(response))
            .finally(() => { setLoading(false) });
    }

    useEffect(() => {
        if (!delayed) {
            setTimeout(function delayHandler() {
                Api.get('api/songs', {}, ['artist__name', 'title'], searchText, 25)
                    .then(response => {
                        setSongs(response.data.results);
                        setNextUrl(response.data.next);
                    })
                    .catch(response => console.error(response))
                    .finally(() => { setLoading(false); setDelayed(false) });
            }, 500);

            setLoading(true);
            setDelayed(true);
        }
    }, [searchText]);

    // Add next songs while scrolling to the bottom of the page
    window.onscroll = () => {
        if ((window.innerHeight + Math.ceil(window.scrollY)) >= (document.body.offsetHeight - 200)) {
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
        <BrowserApp title={'Bibliothèque'}>
            <Box mb={9}>
                <SearchForm
                    searchText={searchText}
                    onSearchTextChange={(text) => setSearchText(text)}
                    onSearchSubmit={onSearchSubmit}
                />
            </Box>
            {loading ?
                <Typography textAlign={"center"} variant={"h5"} m={6}>
                    Chargement des titres... &#x1F596;&#x1F3FF;
                </Typography> :
                songs?.length === 0 ?
                    <Typography textAlign={"center"} variant={"h5"} m={6}>
                        Aucun titre ne correpsond à votre recherche &#128546;
                    </Typography> :
                    <Grid container columnSpacing={21} rowSpacing={12}>
                        {artists?.map((artist, index) => {
                            return (
                                <Grid key={index} item>
                                    <Grid item>
                                        <Typography variant={"h3"}>{artist}</Typography>
                                        <SongGrid songs={songs?.filter(song =>
                                            (song.artist === artist || song.featuring_artist?.includes(artist))
                                        )}/>
                                    </Grid>
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
        </BrowserApp>
    );
}


export default BrowserArtistView;
