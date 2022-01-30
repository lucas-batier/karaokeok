import React, {useCallback, useState} from "react";
import {
    Button, Checkbox,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import {VisibilityOffRounded, VisibilityRounded} from "@mui/icons-material";
import Api from "../../libs/api";
import ErrorsLabel from "../ErrorsLabel";


async function handleConnectionButtonClick(username, password, remainConnection) {
    return await Api.login(username, password, remainConnection)
        .then()
        .catch(error => { throw error.response.data });
}

// @todo ajouter mot de passe oublié avec envoie d'email etc...
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remainConnection, setRemainConnection] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const onSubmit = useCallback(
        (evt) => {
            evt.preventDefault();

            handleConnectionButtonClick(email, password, remainConnection)
                .then(() => window.location.replace('/'))
                .catch(errors => { setErrors(errors) });
        },
        [email, password, remainConnection]
    );

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        type={"email"}
                        variant={"outlined"}
                        placeholder={'karaoke@ok.com'}
                        label={'E-mail'}
                        error={Boolean(errors?.non_field_errors)}
                        helperText={errors?.non_field_errors && <ErrorsLabel errors={errors.non_field_errors} />}
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
                        error={Boolean(errors?.non_field_errors)}
                        helperText={errors?.non_field_errors && <ErrorsLabel errors={errors.non_field_errors} />}
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
                            <Button type={"submit"} variant={"contained"} fullWidth>
                                Se connecter
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
        </form>
    );
}

export default LoginForm;
