import React, {useCallback, useState} from "react";
import {Button, Grid, TextField, Snackbar, CircularProgress, Alert} from "@mui/material";
import Api from "../../../libs/api";
import ErrorsLabel from "../../ErrorsLabel";


async function handleClick(email, emailConfirmation) {
    if (email !== emailConfirmation) {
        throw {email: ['Les adresses email sont différentes']};
    }

    return await Api.sendPasswordResetEmail(email)
        .then(response => { return response })
        .catch(error => { throw error.response });
}

function SendPasswordResetEmailForm() {
    const [email, setEmail] = useState('');
    const [emailConfirmation, setEmailConfirmation] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [genericErrors, setGenericErrors] = useState('');

    const onSubmit = useCallback(
        (evt) => {
            evt.preventDefault();

            setErrors({});
            setLoading(true);

            handleClick(email, emailConfirmation)
                .then(response => {
                    if (Api.responseOk(response)) {
                        setSuccessMessage(`Une email pour réinitialiser ton mot de passe a été envoyé à ${email}`)
                    }
                })
                .catch(errors => {
                    setErrors(errors.data); setGenericErrors(errors?.detail);
                })
                .finally(() => setLoading(false));
        },
        [email, emailConfirmation]
    );

    const handleCloseSuccess = () => setSuccessMessage('');
    const handleCloseErrors = () => setGenericErrors('');

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        type={"email"}
                        variant={"outlined"}
                        placeholder={'karaoke@ok.com'}
                        label={'E-mail'}
                        error={Boolean(errors?.email || errors?.username)}
                        helperText={
                            <>
                                {(errors?.email && <ErrorsLabel errors={errors.email} />)}
                                {(errors?.username && <ErrorsLabel errors={errors.username} />)}
                            </>
                        }
                        required
                        fullWidth
                        value={email}
                        onChange={evt => setEmail(evt.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type={"email"}
                        variant={"outlined"}
                        placeholder={'karaoke@ok.com'}
                        label={'Confirmation'}
                        error={Boolean(errors?.email || errors?.username)}
                        helperText={
                            <>
                                {(errors?.email && <ErrorsLabel errors={errors.email} />)}
                                {(errors?.username && <ErrorsLabel errors={errors.username} />)}
                            </>
                        }
                        required
                        fullWidth
                        value={emailConfirmation}
                        onChange={evt => setEmailConfirmation(evt.target.value)}
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
    );
}

export default SendPasswordResetEmailForm;
