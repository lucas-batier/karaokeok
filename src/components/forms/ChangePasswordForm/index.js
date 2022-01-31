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
import {useParams} from "react-router-dom";


async function handleClick(oldPassword, password, passwordConfirmation) {
    return 'ok';
}

function ChangePasswordForm() {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const { token } = useParams();

    console.log(token);

    const onSubmit = useCallback(
        (evt) => {
            evt.preventDefault();

            handleClick(oldPassword, password, passwordConfirmation)
                .then()
                .catch(errors => { setErrors(errors) });
        },
        [oldPassword, password, passwordConfirmation]
    );

    const handleClickShowOldPassword = useCallback(() => {
        setShowOldPassword(!showOldPassword);
    }, [showOldPassword]);

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
        setPasswordConfirmation(password);
    }, [password, showPassword]);

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        type={showOldPassword ? "text" : "password"}
                        variant={"outlined"}
                        label={'Ancien mot de passe'}
                        error={Boolean(errors?.password)}
                        helperText={errors?.password && <ErrorsLabel errors={errors.password} />}
                        required
                        fullWidth
                        value={oldPassword}
                        onChange={evt => setOldPassword(evt.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowOldPassword}
                                    >
                                        {showOldPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
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
                        label={'Nouveau mot de passe'}
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
                        Modifier
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default ChangePasswordForm;
