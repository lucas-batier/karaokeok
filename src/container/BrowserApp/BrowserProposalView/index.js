import React, {useCallback, useEffect, useState} from "react";
import BrowserApp from "../index";
import {
    Box,
    Paper,
    useTheme,
    Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, TableContainer, ButtonBase
} from "@mui/material";
import {withUser} from "../../../contexts/userContext";
import Api from "../../../libs/api/client";
import {useLinkStyles} from "../../../styles/link";
import {HighlightOffRounded, CheckCircleOutlineRounded, HourglassBottomRounded} from "@mui/icons-material";


function BrowserProposalView({user}) {
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

        const youtube_url = (
            <ButtonBase component={"a"} target={"_blank"} href={proposal.youtube_url} className={linkClasses.primary}>
                <Typography noWrap>
                    {proposal.youtube_url}
                </Typography>
            </ButtonBase>
        );

        return { id, state, youtube_url };
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
                            Tu dois te connecter pour soumettre des propositions
                        </Typography>
                        <Button href={"/login"} variant={"contained"} fullWidth>
                            Se connecter
                        </Button>
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
                <TableContainer fullWidth>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>État</TableCell>
                                <TableCell>Proposition</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{row.state}</TableCell>
                                    <TableCell>{row.youtube_url}</TableCell>
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
