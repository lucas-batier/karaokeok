import React, {useCallback, useState} from "react";
import {Snackbar, Alert, Typography, useTheme} from "@mui/material";
import Api from "../../../libs/api/client";
import {responseOk} from "../../../libs/api/errors";
import ProposalForm from "./index";
import moment from "moment/moment";


async function handleClick(id, youtubeUrl) {
    return await Api.patch(
        `api/proposals/${id}/`,
        {youtube_url: youtubeUrl, updated_at: moment().format(), rejected: false}
    )
        .then(response => { return response })
        .catch(error => { throw error.response });
}

function EditProposalForm() {
    const theme = useTheme();

    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [genericErrors, setGenericErrors] = useState('');

    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    const onSubmit = useCallback(
        (evt) => {
            evt.preventDefault();

            setLoading(true);

            handleClick(id, youtubeUrl)
                .then(response => {
                    if (responseOk(response)) {
                        setSuccessMessage(`Ta proposition a été modifiée, nous t'enverrons un mail lorsqu'elle
                        sera traitée`);
                        setYoutubeUrl('');
                    }
                })
                .catch(errors => {
                    setGenericErrors('Une erreur est apparue, vérifie le lien YouTube et réessaie');
                })
                .finally(() => setLoading(false));
        },
        [id, youtubeUrl]
    );

    const handleCloseSuccess = () => setSuccessMessage('');
    const handleCloseErrors = () => setGenericErrors('');

    return (
        <>
            <Typography variant={"h6"} mb={theme.spacing(1)}>
                Modifie ta proposition
            </Typography>
            <Typography mb={theme.spacing(3)} fontStyle={'italic'} color={theme.palette.primary.main}>
                La vidéo peut contenir le chant, notre algorithme saura le filtrer
            </Typography>
            <ProposalForm value={youtubeUrl} onChange={setYoutubeUrl} loading={loading} onSubmit={onSubmit} />
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
        </>
    );
}

export default EditProposalForm;
