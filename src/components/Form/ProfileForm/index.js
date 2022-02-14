import React, {useCallback, useEffect, useState} from "react";
import {
    Button,
    Grid,
    TextField,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";
import Api from "../../../libs/api/client";
import ErrorsLabel from "../../ErrorsLabel";
import {withUser} from "../../../contexts/userContext";
import User, {userShape} from "../../../models/users";
import {setCurrentUserInStorage} from "../../../libs/user";
import {errorMessage} from "../../../libs/api/errors";
import {genericErrorText} from "../../../translations";


async function handleClick(id, firstName, lastName, username) {
    return await Api.patch(`api/users/${id}/`,{first_name: firstName, last_name: lastName, username: username, email: username})
        .then(response => { return response.data })
        .catch(error => { throw error.response });
}

function ProfileForm({user}) {
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [email, setEmail] = useState(user?.username);
    const [loading, setLoading] = useState(false);
    const [helperErrors, setHelperErrors] = useState({});
    const [genericErrors, setGenericErrors] = useState('');

    useEffect(() => {
        setFirstName(user?.firstName);
        setLastName(user?.lastName);
        setEmail(user?.username);
    }, [user])

    const onSubmit = useCallback(
        (evt) => {
            evt.preventDefault();

            setLoading(true);
            setHelperErrors({});

            handleClick(user?.id, firstName, lastName, email)
                .then(currentUser => {
                    currentUser = new User(currentUser);
                    setCurrentUserInStorage(currentUser);

                    window.location.replace('/');
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
        [firstName, lastName, email, user]
    );

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
                        helperText={helperErrors?.first_name && <ErrorsLabel errors={helperErrors.first_name} />}
                        fullWidth
                        autoFocus
                        value={firstName || ''}
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
                        helperText={helperErrors?.last_name && <ErrorsLabel errors={helperErrors.last_name} />}
                        fullWidth
                        value={lastName || ''}
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
                                {(helperErrors?.email && <ErrorsLabel errors={helperErrors.email} />)}
                                {(helperErrors?.username && <ErrorsLabel errors={helperErrors.username} />)}
                            </>
                        }
                        fullWidth
                        value={email || ''}
                        onChange={evt => setEmail(evt.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button disabled={loading} type={"submit"} variant={"contained"} fullWidth>
                        {loading ? <CircularProgress size={"2rem"} /> : 'Modifier'}
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

export default withUser(ProfileForm);

ProfileForm.propTypes = {
    user: userShape,
}
