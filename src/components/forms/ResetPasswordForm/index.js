import React, {useCallback, useState} from "react";
import {
    Button,
    Grid,
    TextField,
} from "@mui/material";
import Api from "../../../libs/api";
import ErrorsLabel from "../../ErrorsLabel";


async function handleClick(email, emailConfirmation) {
    if (email !== emailConfirmation) {
        throw {email: ['The email adresses doesn\'t match.']};
    }

    const response = await Api.get('api/users', {username: email})
        .then(response => { return response })
        .catch(error => { throw error.response.data });

    if (!Api.responseOk(response)) {
        return response;
    }

    if (1 !== response.data.count) {
        throw {username: ['No user exists with this username.']};
    }

    return 'sendmail'; // @todo send mail or handle reset password
}

function ResetPasswordForm() {
    const [email, setEmail] = useState('');
    const [emailConfirmation, setEmailConfirmation] = useState('');
    const [errors, setErrors] = useState({});

    const onSubmit = useCallback(
        (evt) => {
            evt.preventDefault();

            handleClick(email, emailConfirmation)
                .then()
                .catch(errors => { setErrors(errors) });
        },
        [email, emailConfirmation]
    );

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
                    <Button type={"submit"} variant={"contained"} fullWidth>
                        Envoyer
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default ResetPasswordForm;
