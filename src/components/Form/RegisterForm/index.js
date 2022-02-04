import React, {useCallback, useState} from "react";
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import {VisibilityOffRounded, VisibilityRounded} from "@mui/icons-material";
import Api from "../../../libs/api";
import ErrorsLabel from "../../ErrorsLabel";


async function handleClick(firstName, lastName, username, password, passwordConfirmation) {
    return await Api.register(firstName, lastName, username, password, passwordConfirmation)
        .then(response => {
            if (Api.responseOk(response)) {
                Api.login(username, password)
                    .then(() => window.location.replace('/'))
                    .catch(error => { throw error.response.data });
            }
        })
        .catch(error => { throw error.response.data });
}

function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const onSubmit = useCallback(
        (evt) => {
            evt.preventDefault();

            handleClick(firstName, lastName, email, password, passwordConfirmation)
                .then()
                .catch(errors => { setErrors(errors) });
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
                        error={Boolean(errors?.first_name)}
                        helperText={errors?.first_name && <ErrorsLabel errors={errors.first_name} />}
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
                        error={Boolean(errors?.last_name)}
                        helperText={errors?.last_name && <ErrorsLabel errors={errors.last_name} />}
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
                        type={showPassword ? "text" : "password"}
                        variant={"outlined"}
                        label={'Mot de passe'}
                        error={Boolean(errors?.password)}
                        helperText={errors?.password && <ErrorsLabel errors={errors.password} />}
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
                        error={Boolean(errors?.password)}
                        helperText={errors?.password && <ErrorsLabel errors={errors.password} />}
                        required
                        fullWidth
                        value={passwordConfirmation}
                        onChange={evt => setPasswordConfirmation(evt.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type={"submit"} variant={"contained"} fullWidth>
                        Créer
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default RegisterForm;
