import React, {useCallback, useState} from "react";
import {Button, Grid, TextField, Snackbar, CircularProgress, Alert, Typography, useTheme} from "@mui/material";
import Api from "../../../libs/api/client";
import {errorMessage, responseOk} from "../../../libs/api/errors";
import {withUser} from "../../../contexts/userContext";
import {genericErrorText} from "../../../translations";


async function handleClick(comment, user) {
    return await Api.post('api/feedbacks/', {comment: comment, created_by: user?.username})
        .then(response => { return response })
        .catch(error => { throw error.response });
}

function FeedbackForm({user}) {
    const theme = useTheme();

    const [comment, setComment] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [genericErrors, setGenericErrors] = useState('');

    const onSubmit = useCallback(
        (evt) => {
            evt.preventDefault();

            setLoading(true);

            handleClick(comment, user)
                .then(response => {
                    if (responseOk(response)) {
                        setComment('');
                        setSuccessMessage(`Merci pour ton avis !`);
                    }
                })
                .catch(response => {
                    response ? setGenericErrors(errorMessage(response)) : setGenericErrors(genericErrorText);
                })
                .finally(() => setLoading(false));
        },
        [user, comment]
    );

    const handleCloseSuccess = () => setSuccessMessage('');
    const handleCloseErrors = () => setGenericErrors('');

    return (
        <>
            <Typography mb={theme.spacing(3)} variant={"h6"}>
                Donne nous ton avis sur l'application
            </Typography>
            <form onSubmit={onSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            variant={"outlined"}
                            placeholder={'Je trouve cette application incroyable !'}
                            required
                            fullWidth
                            multiline
                            rows={6}
                            inputProps={{ maxLength: 2048 }}
                            value={comment}
                            onChange={evt => setComment(evt.target.value)}
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

export default withUser(FeedbackForm);
