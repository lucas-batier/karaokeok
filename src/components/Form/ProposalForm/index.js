import React, {useCallback, useState} from "react";
import {Button, Grid, TextField, Snackbar, CircularProgress, Alert, Typography, useTheme} from "@mui/material";
import Api from "../../../libs/api/client";
import {responseOk} from "../../../libs/api/errors";
import {withUser} from "../../../contexts/userContext";


async function handleClick(youtubeUrl, user) {
    return await Api.post('api/proposals/', {youtube_url: youtubeUrl, proposed_by: user.username})
        .then(response => { return response })
        .catch(error => { throw error.response });
}

function ProposalForm({user}) {
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
                        setSuccessMessage(`Ta proposition a été enregistrée, nous t'enverrons un mail lorsqu'elle sera traitée`)
                    }
                })
                .catch(errors => {
                    setGenericErrors(errors?.detail);
                })
                .finally(() => setLoading(false));
        },
        [user, youtubeUrl]
    );

    const handleCloseSuccess = () => setSuccessMessage('');
    const handleCloseErrors = () => setGenericErrors('');

    if (0 === Object.keys(user).length) {
        return (
            <>
                <Typography variant={"h6"} mb={3}>
                    Tu dois te connecter pour soumettre des propositions
                </Typography>
                <Button href={"/login"} variant={"contained"} fullWidth>
                    Se connecter
                </Button>
            </>
        );
    }

    return (
        <>
            <Typography mb={theme.spacing(1)} variant={"h6"}>
                Propose un nouveau Karaoke grâce à un lien YouTube !
            </Typography>
            <Typography mb={theme.spacing(6)} fontStyle={'italic'} color={theme.palette.primary.main}>
                La vidéo peut contenir le chant, notre algorithme saura le filtrer
            </Typography>
            <form onSubmit={onSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            variant={"outlined"}
                            placeholder={'https://www.youtube.com/watch?v=njXQxWKpIcg'}
                            label={'URL YouTube'}
                            required
                            fullWidth
                            value={youtubeUrl}
                            onChange={evt => setYoutubeUrl(evt.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button disabled={loading} type={"submit"} variant={"contained"} fullWidth>
                            {loading ? <CircularProgress size={"2rem"} /> : 'Envoyer'}
                        </Button>
                    </Grid>
                </Grid>
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
            </form>
        </>
    );
}

export default withUser(ProposalForm);
