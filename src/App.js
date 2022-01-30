import './App.css';
import React, {useEffect, useState} from "react";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {BrowserView, MobileView} from "react-device-detect";
import BrowserHomeView from "./container/BrowserApp/BrowserHomeView";
import MobileHomeView from "./container/MobileApp/MobileHomeView";
import BrowserArtistView from "./container/BrowserApp/BrowserArtistView";
import MobileArtistSongsList from "./container/MobileApp/MobileArtistSongsList";
import BrowserLegalMentionsView from "./container/BrowserApp/BrowserLegalMentionsView";
import MobileLegalMentionsView from "./container/MobileApp/MobileLegalMentionsView";
import BrowserLoginView from "./container/BrowserApp/BrowserLoginView";
import MobileLoginView from "./container/MobileApp/MobileLoginView";
import BrowserRegisterView from "./container/BrowserApp/BrowserLoginView/BrowserRegisterView";
import MobileRegisterView from "./container/MobileApp/MobileLoginView/MobileRegisterView";
import MobileProfileView from "./container/MobileApp/MobileProfileView";
import BrowserAccountView from "./container/BrowserApp/BrowserAccountView";
import MobileAccountView from "./container/MobileApp/MobileAccountView";
import userContext from "./contexts/userContext";
import Api from "./libs/api";
import {getCurrentUserFromStorage, setCurrentUserInStorage} from "./libs/user";
import User from "./models/users";
import TeasingView from "./components/TeasingView";
import BrowserTeasingView from "./container/BrowserApp/BrowserTeasingView";
import MobileTeasingView from "./container/MobileApp/MobileTeasingView";

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

async function getCurrentUser() {
    return await Api.get('users/me')
        .then(response => {return response.data})
        .catch(response => console.error(response));
}

function App() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token') || null;

        if (token) {
            let currentUser = getCurrentUserFromStorage();

            if (currentUser?.id) {
                setUser(currentUser);
            } else {
                getCurrentUser().then(currentUser => {
                    currentUser = new User(currentUser);

                    setCurrentUserInStorage(currentUser);
                    setUser(currentUser);
                });
            }
        }
    }, [setUser]);

    const production = process.env.NODE_ENV === 'production';

    if (production) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserView>
                    <BrowserTeasingView />
                </BrowserView>
                <MobileView>
                    <MobileTeasingView />
                </MobileView>
            </ThemeProvider>
        )
    }

    return (
        <userContext.Provider value={user}>
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
                        <Route path="/login" element={
                            <>
                                <BrowserView>
                                    <BrowserLoginView />
                                </BrowserView>
                                <MobileView>
                                    <MobileLoginView />
                                </MobileView>
                            </>
                        }/>
                        <Route path="/register" element={
                            <>
                                <BrowserView>
                                    <BrowserRegisterView />
                                </BrowserView>
                                <MobileView>
                                    <MobileRegisterView />
                                </MobileView>
                            </>
                        }/>
                        <Route path="/profile" element={
                            <>
                                <MobileView>
                                    <MobileProfileView />
                                </MobileView>
                            </>
                        }/>
                        <Route path="/account" element={
                            <>
                                <BrowserView>
                                    <BrowserAccountView />
                                </BrowserView>
                                <MobileView>
                                    <MobileAccountView />
                                </MobileView>
                            </>
                        }/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </userContext.Provider>
    );
}

export default App;
