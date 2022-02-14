import React, {useCallback, useState} from "react";
import {
    Button, Checkbox,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    ButtonBase,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";
import {VisibilityOffRounded, VisibilityRounded} from "@mui/icons-material";
import Api from "../../../libs/api/client";
import ErrorsLabel from "../../ErrorsLabel";
import {useLinkStyles} from "../../../styles/link";
import {errorMessage} from "../../../libs/api/errors";
import {genericErrorText} from "../../../translations";


async function handleConnectionButtonClick(username, password, remainConnection) {
    return await Api.login(username, password, remainConnection)
        .then()
        .catch(error => { throw error.response });
}

function LoginForm() {
    const linkClasses = useLinkStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remainConnection, setRemainConnection] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [helperErrors, setHelperErrors] = useState({});
    const [genericErrors, setGenericErrors] = useState('');

    const onSubmit = useCallback(
        (evt) => {
            evt.preventDefault();

            setHelperErrors({});

            handleConnectionButtonClick(email, password, remainConnection)
                .then(() => window.location.replace('/'))
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
        [email, password, remainConnection]
    );

    const handleClickShowPassword = () => setShowPassword(!showPassword);
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
                        error={Boolean(helperErrors?.non_field_errors)}
                        helperText={helperErrors?.non_field_errors && <ErrorsLabel errors={helperErrors.non_field_errors} />}
                        required
                        fullWidth
                        autoFocus
                        value={email}
                        onChange={evt => setEmail(evt.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type={showPassword ? "text" : "password"}
                        variant={"outlined"}
                        label={'Mot de passe'}
                        error={Boolean(helperErrors?.non_field_errors)}
                        helperText={helperErrors?.non_field_errors && <ErrorsLabel errors={helperErrors.non_field_errors} />}
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
                    <ButtonBase component={"a"} href={"/send_reset_password"} className={linkClasses.primary}>Mot de passe oublié</ButtonBase>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent={"space-between"} alignItems={"center"} spacing={6}>
                        <Grid item>
                            <Grid container alignItems={"center"} spacing={1}>
                                <Grid item>
                                    <Checkbox
                                        value={remainConnection}
                                        onChange={evt => setRemainConnection(evt.target.checked)}
                                        defaultChecked
                                    />
                                </Grid>
                                <Grid item>
                                    Rester connecté
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            <Button disabled={loading} type={"submit"} variant={"contained"} fullWidth>
                                {loading ? <CircularProgress size={"2rem"} /> : 'Se connecter'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        fullWidth
                        component={"a"}
                        href={"/register"}
                    >
                        Créer un compte
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

export default LoginForm;
