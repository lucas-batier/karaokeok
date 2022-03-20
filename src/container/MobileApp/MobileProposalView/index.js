import React, {useCallback, useEffect, useState} from "react";
import MobileApp from "../index";
import {
    Box, Button, ButtonBase, IconButton,
    Paper, Typography,
    useTheme,
} from "@mui/material";
import {useLinkStyles} from "../../../styles/link";
import {
    CheckCircleOutlineRounded,
    EditRounded,
    HighlightOffRounded,
    HourglassBottomRounded
} from "@mui/icons-material";
import Api from "../../../libs/api/client";
import {withUser} from "../../../contexts/userContext";
import ProposalTable from "../../../components/ProposalTable";


function MobileProposalView({user}) {
    const linkClasses = useLinkStyles();
    const theme = useTheme();
    const [rows, setRows] = useState([]);
    const isUserConnected = (0 !== Object.keys(user).length);

    function stateIcon(state) {
        switch (state) {
            case 'rejected':
                return <HighlightOffRounded color={"error"} titleAccess={"Rejeté"} />;
            case 'accepted':
                return <CheckCircleOutlineRounded color={"success"} titleAccess={"Validé"} />;
            default:
                return <HourglassBottomRounded color={"primary"} titleAccess={"En cours"} />;
        }
    }

    const prepareData = useCallback((proposal) => {
        const id = proposal.id;

        let state = stateIcon('in_progress');
        if (proposal.rejected) {
            state = stateIcon('rejected');
        } else if (proposal.song) {
            state = stateIcon('accepted');
        }

        const youtubeUrl = (
            <ButtonBase component={"a"} target={"_blank"} href={proposal.youtube_url} className={linkClasses.primary}>
                <Typography noWrap>
                    {proposal.youtube_url}
                </Typography>
            </ButtonBase>
        );

        const actionCell = (
            <IconButton color={"primary"} href={`/edit_proposal?id=${proposal.id}`} disabled={Boolean(proposal.song)}>
                <EditRounded />
            </IconButton>
        )

        return { id, state, youtubeUrl, actionCell };
    }, [linkClasses.primary])

    useEffect(() => {
        if (isUserConnected) {
            Api.get('api/proposals', {created_by: user?.id}, ['created_at'], '', 25)
                .then(response => setRows(response.data.results.map(proposal => prepareData(proposal))))
                .catch(response => console.error(response))
                .finally(() => {
                })
        }
    }, [isUserConnected, prepareData, user]);

    if (!isUserConnected) {
        return (
            <MobileApp title={'Propositions'}>
                <Box mx={2} mt={3}>
                    <Paper style={{padding: theme.spacing(3)}}>
                        <Typography mb={theme.spacing(3)} variant={"h6"}>
                            Tu dois te connecter pour envoyer des propositions
                        </Typography>
                        <Button href={"/login"} variant={"contained"} fullWidth>
                            Se connecter
                        </Button>
                    </Paper>
                </Box>
            </MobileApp>
        );
    } else if (rows?.length === 0) {
        return (
            <MobileApp title={'Propositions'}>
                <Box mx={2} mt={3}>
                    <Paper style={{padding: theme.spacing(3)}}>
                        <Typography mb={theme.spacing(3)} variant={"h6"}>
                            Tu n'as pas encore envoyé de propositions, clique sur&nbsp;
                            <Typography component={"span"} color={"primary"} variant={"h6"}>Ajouter</Typography>&nbsp;
                            pour envoyer ta première
                        </Typography>
                        <Box display={"flex"} justifyContent={"center"}>
                            <Button variant={"contained"} href={"/add_proposal"}>Ajouter</Button>
                        </Box>
                    </Paper>
                </Box>
            </MobileApp>
        );
    }

    return (
        <MobileApp title={'Propositions'}>
            <Box mx={2} my={3}>
                <ProposalTable rows={rows} />
            </Box>
        </MobileApp>
    );
}

export default withUser(MobileProposalView);
