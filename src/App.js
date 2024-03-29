import './App.css';
import React, {useEffect, useState} from "react";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import "@fontsource/dosis";
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
import MobileSettingsView from "./container/MobileApp/MobileSettingsView";
import BrowserAccountView from "./container/BrowserApp/BrowserAccountView";
import MobileAccountView from "./container/MobileApp/MobileAccountView";
import userContext from "./contexts/userContext";
import Api from "./libs/api/client";
import {getCurrentUserFromStorage, setCurrentUserInStorage} from "./libs/user";
import User from "./models/users";
import BrowserTeasingView from "./container/BrowserApp/BrowserTeasingView";
import MobileTeasingView from "./container/MobileApp/MobileTeasingView";
import BrowserProfileView from "./container/BrowserApp/BrowserProfileView";
import MobileProfileView from "./container/MobileApp/MobileProfileView";
import BrowserResetPasswordView from "./container/BrowserApp/BrowserResetPasswordView";
import MobileResetPasswordView from "./container/MobileApp/MobileResetPasswordView";
import BrowserChangePasswordView from "./container/BrowserApp/BrowserChangePasswordView";
import MobileChangePasswordView from "./container/MobileApp/MobileChangePasswordView";
import BrowserProposalView from "./container/BrowserApp/BrowserProposalView";
import MobileProposalView from "./container/MobileApp/MobileProposalView";
import BrowserFeedbackView from "./container/BrowserApp/BrowserFeedbackView";
import MobileFeedbackView from "./container/MobileApp/MobileFeedbackView";
import BrowserAddProposalView from "./container/BrowserApp/BrowserProposalView/BrowserAddProposalView";
import MobileAddProposalView from "./container/MobileApp/MobileProposalView/MobileAddProposalView";
import BrowserEditProposalView from "./container/BrowserApp/BrowserProposalView/BrowserEditProposalView";
import MobileEditProposalView from "./container/MobileApp/MobileProposalView/MobileEditProposalView";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FFE169',
            light: '#FFF0AE',
        },
        secondary: {
            main: '#000000',
        },
    },
    typography: {
        fontWeightLight: 500,
        fontWeightRegular: 800,
        fontWeightMedium: 900,
        fontWeightBold: 1000,
        body1: {
            letterSpacing: '0.05rem',
        },
        h1: {
            fontWeight: 1000,
        },
        h2: {
            fontWeight: 1000,
        },
        fontFamily: [
            'Dosis',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

async function getCurrentUser() {
    return await Api.get('api/current_user')
        .then(response => { return response.data })
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
                        {user &&
                            <Route path="/settings" element={
                                <>
                                    <MobileView>
                                        <MobileSettingsView/>
                                    </MobileView>
                                </>
                            }/>
                        }
                        {user &&
                            <Route path="/account" element={
                                <>
                                    <BrowserView>
                                        <BrowserAccountView/>
                                    </BrowserView>
                                    <MobileView>
                                        <MobileAccountView/>
                                    </MobileView>
                                </>
                            }/>
                        }
                        {user &&
                            <Route path="/profile" element={
                                <>
                                    <BrowserView>
                                        <BrowserProfileView/>
                                    </BrowserView>
                                    <MobileView>
                                        <MobileProfileView/>
                                    </MobileView>
                                </>
                            }/>
                        }
                        <Route path="/send_reset_password" element={
                            <>
                                <BrowserView>
                                    <BrowserResetPasswordView />
                                </BrowserView>
                                <MobileView>
                                    <MobileResetPasswordView />
                                </MobileView>
                            </>
                        }/>
                        <Route path="/reset_password:token" element={
                            <>
                                <BrowserView>
                                    <BrowserChangePasswordView />
                                </BrowserView>
                                <MobileView>
                                    <MobileChangePasswordView />
                                </MobileView>
                            </>
                        }/>
                        <Route path="/proposal" element={
                            <>
                                <BrowserView>
                                    <BrowserProposalView />
                                </BrowserView>
                                <MobileView>
                                    <MobileProposalView />
                                </MobileView>
                            </>
                        }/>
                        <Route path="/add_proposal" element={
                            <>
                                <BrowserView>
                                    <BrowserAddProposalView />
                                </BrowserView>
                                <MobileView>
                                    <MobileAddProposalView />
                                </MobileView>
                            </>
                        }/>
                        <Route path="/edit_proposal" element={
                            <>
                                <BrowserView>
                                    <BrowserEditProposalView />
                                </BrowserView>
                                <MobileView>
                                    <MobileEditProposalView />
                                </MobileView>
                            </>
                        }/>
                        <Route path="/feedback" element={
                            <>
                                <BrowserView>
                                    <BrowserFeedbackView />
                                </BrowserView>
                                <MobileView>
                                    <MobileFeedbackView />
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

export {theme};
