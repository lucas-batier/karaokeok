import React, {useCallback, useState} from "react";
import {Snackbar, Alert, Typography, useTheme} from "@mui/material";
import Api from "../../../libs/api/client";
import {responseOk} from "../../../libs/api/errors";
import {withUser} from "../../../contexts/userContext";
import ProposalForm from "./index";


async function handleClick(youtubeUrl, user) {
    return await Api.post('api/proposals/', {youtube_url: youtubeUrl, created_by: user.username})
        .then(response => { return response })
        .catch(error => { throw error.response });
}

function AddProposalForm({user}) {
    const theme = useTheme();

    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [genericErrors, setGenericErrors] = useState('');

    const onSubmit = useCallback(
        (evt) => {
            evt.preventDefault();

            setLoading(true);

            handleClick(youtubeUrl, user)
                .then(response => {
                    if (responseOk(response)) {
                        setSuccessMessage(`Ta proposition a été enregistrée, nous t'enverrons un mail lorsqu'elle sera 
                        traitée`);
                        setYoutubeUrl('');
                    }
                })
                .catch(errors => {
                    setGenericErrors('Une erreur est apparue, vérifie le lien YouTube et réessaie');
                })
                .finally(() => setLoading(false));
        },
        [user, youtubeUrl]
    );

    const handleCloseSuccess = () => setSuccessMessage('');
    const handleCloseErrors = () => setGenericErrors('');

    return (
        <>
            <Typography variant={"h6"}>
                Propose un nouveau karaoke grâce à un lien YouTube
            </Typography>
            <Typography mb={theme.spacing(3)} fontStyle={'italic'} color={theme.palette.primary.main}>
                La vidéo peut contenir le chant, notre algorithme saura le filtrer
            </Typography>
            <ProposalForm value={youtubeUrl} onChange={setYoutubeUrl} loading={loading} onSubmit={onSubmit} />
            <Snackbar open={Boolean(successMessage)} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={Boolean(genericErrors)} autoHideDuration={6000} onClose={handleCloseErrors}>
                <Alert onClose={handleCloseErrors} severity="error" sx={{ width: '100%' }}>
                    {genericErrors}
                </Alert>
            </Snackbar>
        </>
    );
}

export default withUser(AddProposalForm);
