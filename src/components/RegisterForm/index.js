import React, {useCallback, useState} from "react";
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import {VisibilityOffRounded, VisibilityRounded} from "@mui/icons-material";
import Api from "../../libs/api";


async function handleRegisterButtonClick(firstName, lastName, username, password, passwordConfirmation) {
    await Api.register(firstName, lastName, username, password, passwordConfirmation)
        .then(response => {
            if (Api.responseOk(response)) {
                Api.login(username, password)
                    .then(() => window.location.replace('/'))
                    .catch(response => {
                        localStorage.setItem('token', '');
                        sessionStorage.setItem('token', '');
                        console.error(response);
                    });
            }
        })
        .catch(response => console.error(response));
}

function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = useCallback(
        (evt) => {
            evt.preventDefault();

            handleRegisterButtonClick(firstName, lastName, email, password, passwordConfirmation);
        },
        [firstName, lastName, email, password, passwordConfirmation]
    );

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
        setPasswordConfirmation(password);
    }, [password, showPassword]);

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        type={"text"}
                        variant={"outlined"}
                        placeholder={'Freddy'}
                        label={'Prénom'}
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
                        required
                        fullWidth
                        value={passwordConfirmation}
                        onChange={evt => setPasswordConfirmation(evt.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type={"submit"} variant={"contained"} fullWidth>
                        Créer son compte
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default RegisterForm;
