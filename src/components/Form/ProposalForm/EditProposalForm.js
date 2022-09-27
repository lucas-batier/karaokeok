import React, {useCallback, useState} from "react";
import {Snackbar, Alert, Typography, useTheme, Grid, TextField, Button, CircularProgress} from "@mui/material";
import Api from "../../../libs/api/client";
import {errorMessage, responseOk} from "../../../libs/api/errors";
import moment from "moment/moment";
import { genericErrorText } from "../../../translations";
import ErrorsLabel from "../../ErrorsLabel";


async function handleClick(id, youtubeUrl) {
    return await Api.patch(
        `api/proposals/${id}/`,
        {youtube_url: youtubeUrl, updated_at: moment().format(), rejected: false}
    )
        .then(response => { return response })
        .catch(error => { throw error.response });
}

function EditProposalForm() {
    const theme = useTheme();

    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [helperErrors, setHelperErrors] = useState({});
    const [genericErrors, setGenericErrors] = useState('');

    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    const onSubmit = useCallback(
        (evt) => {
            evt.preventDefault();

            setLoading(true);
            setHelperErrors({});

            handleClick(id, youtubeUrl)
                .then(response => {
                    if (responseOk(response)) {
                        setSuccessMessage(`Ta proposition a été modifiée, nous t'enverrons un mail lorsqu'elle
                        sera karaoketisée! Tu vas automatiquement être redirigé vers tes propositions dans 3 secondes.`);
                        setYoutubeUrl('');
                        setTimeout(() => {
                            setLoading(true);
                            window.location.replace('/proposal');
                        }, 3000);
                    }
                })
                .catch(response => {
                    if (response?.status === 400) {
                        setHelperErrors(response.data);
                    }
                    else {
                        response ? setGenericErrors(errorMessage(response)) : setGenericErrors(genericErrorText);
                    }
                })
                .finally(() => setLoading(false));
        },
        [id, youtubeUrl]
    );

    const handleCloseSuccess = () => setSuccessMessage('');
    const handleCloseErrors = () => setGenericErrors('');

    return (
        <>
            <Typography variant={"h6"} mb={theme.spacing(1)}>
                Modifie ta proposition
            </Typography>
            <Typography mb={theme.spacing(3)} fontStyle={'italic'} color={theme.palette.primary.main}>
                La vidéo peut contenir le chant, notre algorithme saura le filtrer
            </Typography>
            <form onSubmit={onSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            variant={"outlined"}
                            placeholder={'https://www.youtube.com/watch?v=njXQxWKpIcg'}
                            label={'URL YouTube'}
                            error={Boolean(helperErrors?.youtube_url)}
                            required
                            fullWidth
                            value={youtubeUrl}
                            helperText={helperErrors?.youtube_url && <ErrorsLabel errors={helperErrors.youtube_url} />}
                            onChange={evt => setYoutubeUrl(evt.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button disabled={loading} type={"submit"} variant={"contained"} fullWidth>
                            {loading ? <CircularProgress size={"2rem"} /> : 'Envoyer'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
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

export default EditProposalForm;
