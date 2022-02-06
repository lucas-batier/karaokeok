import React, {useCallback, useState} from "react";
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";
import {VisibilityOffRounded, VisibilityRounded} from "@mui/icons-material";
import Api from "../../../libs/api/client";
import ErrorsLabel from "../../ErrorsLabel";
import {errorMessage, responseOk} from "../../../libs/api/errors";


async function handleClick(firstName, lastName, username, password, passwordConfirmation) {
    return await Api.register(firstName, lastName, username, password, passwordConfirmation)
        .then(response => {
            if (responseOk(response)) {
                Api.login(username, password)
                    .then(() => window.location.replace('/'))
                    .catch(error => { throw error.response });
            }
        })
        .catch(error => { throw error.response });
}

function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [helperErrors, setHelperErrors] = useState({});
    const [genericErrors, setGenericErrors] = useState('');

    const onSubmit = useCallback(
        (evt) => {
            evt.preventDefault();

            setLoading(true);
            setHelperErrors({});

            handleClick(firstName, lastName, email, password, passwordConfirmation)
                .then()
                .catch(response => {
                    if (response.status === 400) {
                        setHelperErrors(response.data);
                    }
                    else {
                        setGenericErrors(errorMessage(response));
                    }
                })
                .finally(() => setLoading(false));
        },
        [firstName, lastName, email, password, passwordConfirmation]
    );

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
        setPasswordConfirmation(password);
    }, [password, showPassword]);

    const handleCloseErrors = () => setGenericErrors('');

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        type={"text"}
                        variant={"outlined"}
                        placeholder={'Freddy'}
                        label={'Prénom'}
                        error={Boolean(helperErrors?.first_name)}
                        helperText={helperErrors?.first_name && <ErrorsLabel helperErrors={helperErrors.first_name} />}
                        required
                        fullWidth
                        autoFocus
                        value={firstName}
                        onChange={evt => setFirstName(evt.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type={"text"}
                        variant={"outlined"}
                        placeholder={'Mercury'}
                        label={'Nom'}
                        error={Boolean(helperErrors?.last_name)}
                        helperText={helperErrors?.last_name && <ErrorsLabel helperErrors={helperErrors.last_name} />}
                        required
                        fullWidth
                        value={lastName}
                        onChange={evt => setLastName(evt.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type={"email"}
                        variant={"outlined"}
                        placeholder={'karaoke@ok.com'}
                        label={'E-mail'}
                        error={Boolean(helperErrors?.email || helperErrors?.username)}
                        helperText={
                            <>
                                {(helperErrors?.email && <ErrorsLabel helperErrors={helperErrors.email} />)}
                                {(helperErrors?.username && <ErrorsLabel helperErrors={helperErrors.username} />)}
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
                        type={showPassword ? "text" : "password"}
                        variant={"outlined"}
                        label={'Mot de passe'}
                        error={Boolean(helperErrors?.password)}
                        helperText={helperErrors?.password && <ErrorsLabel helperErrors={helperErrors.password} />}
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
                        helperText={helperErrors?.password && <ErrorsLabel helperErrors={helperErrors.password} />}
                        required
                        fullWidth
                        value={passwordConfirmation}
                        onChange={evt => setPasswordConfirmation(evt.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button disabled={loading} type={"submit"} variant={"contained"} fullWidth>
                        {loading ? <CircularProgress size={"2rem"} /> : 'Créer'}
                    </Button>
                </Grid>
            </Grid>
            <Snackbar open={Boolean(genericErrors)} autoHideDuration={6000} onClose={handleCloseErrors}>
                <Alert onClose={handleCloseErrors} severity="error" sx={{ width: '100%' }}>
                    {genericErrors}
                </Alert>
            </Snackbar>
        </form>
    );
}

export default RegisterForm;
