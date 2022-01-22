import './App.css';
import React from "react";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {BrowserView, MobileView} from "react-device-detect";
import BrowserHomeView from "./container/BrowserApp/BrowserHomeView";
import MobileHomeView from "./container/MobileApp/MobileHomeView";
import BrowserArtistView from "./container/BrowserApp/BrowserArtistView";
import MobileArtistSongsList from "./container/MobileApp/MobileArtistSongsList";
import BrowserLegalMentionsView from "./container/BrowserApp/BrowserLegalMentionsView";
import MobileLegalMentionsView from "./container/MobileApp/MobileLegalMentionsView";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FFE169',
        },
        secondary: {
            main: '#000000',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <>
                            <BrowserView>
                                <BrowserHomeView />
                            </BrowserView>
                            <MobileView>
                                <MobileHomeView />
                            </MobileView>
                        </>
                    }/>
                    <Route path="/songs" element={
                        <>
                            <BrowserView>
                                <BrowserArtistView />
                            </BrowserView>
                            <MobileView>
                                <MobileArtistSongsList />
                            </MobileView>
                        </>
                    }/>
                    <Route path="/legals" element={
                        <>
                            <BrowserView>
                                <BrowserLegalMentionsView />
                            </BrowserView>
                            <MobileView>
                                <MobileLegalMentionsView />
                            </MobileView>
                        </>
                    }/>
                    {/*<Route path="/login" element={*/}
                    {/*    <>*/}
                    {/*        <BrowserView>*/}
                    {/*            <BrowserLoginView />*/}
                    {/*        </BrowserView>*/}
                    {/*        <MobileView>*/}
                    {/*            <MobileLoginView />*/}
                    {/*        </MobileView>*/}
                    {/*    </>*/}
                    {/*}/>*/}
                    {/*<Route path="/register" element={*/}
                    {/*    <>*/}
                    {/*        <BrowserView>*/}
                    {/*            <BrowserRegisterView />*/}
                    {/*        </BrowserView>*/}
                    {/*        <MobileView>*/}
                    {/*            <MobileRegisterView />*/}
                    {/*        </MobileView>*/}
                    {/*    </>*/}
                    {/*}/>*/}
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
