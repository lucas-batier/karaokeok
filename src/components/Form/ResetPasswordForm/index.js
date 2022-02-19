import React, {useCallback, useState} from "react";
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import {VisibilityOffRounded, VisibilityRounded} from "@mui/icons-material";
import Api from "../../../libs/api/client";
import ErrorsLabel from "../../ErrorsLabel";
import {useParams} from "react-router-dom";
import {errorMessage, responseOk} from "../../../libs/api/errors";
import {genericErrorText} from "../../../translations";


async function handleClick(token, password, passwordConfirmation) {
    if (password !== passwordConfirmation) {
        throw {password: ['Les mot de passes sont différents']};
    }

    return await Api.resetPassword(token, password)
        .then(response => { return response })
        .catch(error => { throw error.response });
}

function ResetPasswordForm() {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [helperErrors, setHelperErrors] = useState({});
    const [genericErrors, setGenericErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const [waitForRedirection, setWaitForRedirection] = useState(false);
    const { token } = useParams();

    const onSubmit = useCallback(
        (evt) => {
            evt.preventDefault();

            setHelperErrors({});
            setLoading(true);

            handleClick(token, password, passwordConfirmation)
                .then(response => {
                    if (responseOk(response)) {
                        setSuccessMessage(`Ton mot de passe vient d'être modifié, tu vas automatiquement être redirigé 
                        vers la page de login dans 3 secondes`);
                        setWaitForRedirection(true);
                        setTimeout(() => {
                            setWaitForRedirection(true);
                            window.location.replace('/login');
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
        [password, passwordConfirmation, token]
    );

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
        setPasswordConfirmation(password);
    }, [password, showPassword]);

    const handleCloseSuccess = () => setSuccessMessage('');
    const handleCloseErrors = () => setGenericErrors('');

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        type={showPassword ? "text" : "password"}
                        variant={"outlined"}
                        label={'Nouveau mot de passe'}
                        error={Boolean(helperErrors?.password)}
                        helperText={helperErrors?.password && <ErrorsLabel errors={helperErrors.password} />}
                        required
                        fullWidth
                        value={password}
                        onChange={evt => setPassword(evt.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type={showPassword ? "text" : "password"}
                        variant={"outlined"}
                        label={'Confirmation'}
                        error={Boolean(helperErrors?.password)}
                        helperText={helperErrors?.password && <ErrorsLabel errors={helperErrors.password} />}
                        required
                        fullWidth
                        value={passwordConfirmation}
                        onChange={evt => setPasswordConfirmation(evt.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button disabled={loading || waitForRedirection} type={"submit"} variant={"contained"} fullWidth>
                        {(loading || waitForRedirection) ? <CircularProgress size={"2rem"} /> : 'Modifier'}
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

export default ResetPasswordForm;
