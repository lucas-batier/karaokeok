import React, {useCallback, useEffect, useState} from "react";
import BrowserApp from "../index";
import {
    Box,
    Paper,
    useTheme,
    Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, TableContainer, ButtonBase, IconButton
} from "@mui/material";
import {withUser} from "../../../contexts/userContext";
import Api from "../../../libs/api/client";
import {useLinkStyles} from "../../../styles/link";
import {
    HighlightOffRounded,
    CheckCircleOutlineRounded,
    HourglassBottomRounded,
    EditRounded,
    AddReactionRounded
} from "@mui/icons-material";
import {useCellStyles} from "../../../styles/cell";
import LineButtonCard from "../../../components/LineButtonCard";


function BrowserProposalView({user}) {
    const linkClasses = useLinkStyles();
    const cellClasses = useCellStyles();
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
            <BrowserApp title={'Propositions'}>
                <Box mx={36}>
                    <Paper style={{padding: theme.spacing(6)}}>
                        <Typography mb={theme.spacing(3)} variant={"h6"}>
                            Tu dois te connecter pour envoyer des propositions
                        </Typography>
                        <Button href={"/login"} variant={"contained"} fullWidth>
                            Se connecter
                        </Button>
                    </Paper>
                </Box>
            </BrowserApp>
        );
    } else if (rows?.length === 0) {
        return (
            <BrowserApp title={'Propositions'}>
                <Box mx={36}>
                    <Paper style={{padding: theme.spacing(6)}}>
                        <Typography mb={theme.spacing(3)} variant={"h6"}>
                            Tu n'as pas encore envoyé de propositions, clique sur
                            &nbsp;<Typography component={"span"} color={"primary"} variant={"h6"}>ajouter</Typography>
                            &nbsp;pour envoyer ta première
                        </Typography>
                        <LineButtonCard href={"/add_proposal"} text={"Ajouter"} icon={<AddReactionRounded />} />
                    </Paper>
                </Box>
            </BrowserApp>
        );
    }

    return (
        <BrowserApp title={'Propositions'}>
            <Paper style={{padding: theme.spacing(6)}}>
                <Box mb={3}>
                    <Button component={"a"} href={"/add_proposal"} variant={"contained"}>
                        Ajouter
                    </Button>
                </Box>
                <TableContainer fullWidth sx={{ maxHeight: 440 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    className={cellClasses.stickyLeft}
                                    style={{zIndex: 101, textAlign: "center"}}
                                >
                                    État
                                </TableCell>
                                <TableCell style={{width: "100%"}}>Proposition</TableCell>
                                <TableCell
                                    className={cellClasses.stickyRight}
                                    style={{zIndex: 101, textAlign: "center"}}
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell
                                        className={cellClasses.stickyLeft}
                                        style={{zIndex: 100, textAlign: "center"}}
                                    >
                                        {row.state}
                                    </TableCell>
                                    <TableCell style={{width: "100%"}}>{row.youtubeUrl}</TableCell>
                                    <TableCell
                                        className={cellClasses.stickyRight}
                                        style={{zIndex: 100, textAlign: "center"}}
                                    >
                                        {row.actionCell}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </BrowserApp>
    );
}

export default withUser(BrowserProposalView);
