import React, {useEffect, useState} from "react";
import BrowserApp from "../index";
import {
    Box,
    Paper,
    useTheme,
    Table, TableHead, TableRow, TableCell, TableBody, Button
} from "@mui/material";
import {withUser} from "../../../contexts/userContext";
import Api from "../../../libs/api/client";


function BrowserProposalView({user}) {
    const theme = useTheme();
    const [rows, setRows] = useState([]);

    function prepareData(proposal) {
        let state = 'in_progress'
        if (proposal.rejected) {
            state = 'rejected'
        } else if (proposal.song) {
            state = 'accepted'
        }
        const youtube_url = proposal.youtube_url

        return { state, youtube_url };
    }

    useEffect(() => {
        Api.get('api/proposals', {created_by: user?.id}, ['created_at'], '', 25)
            .then(response => { setRows(response.data.results.map(proposal => prepareData(proposal)))})
            .catch(response => console.error(response))
            .finally(() => {})
    }, [user]);

    return (
        <BrowserApp title={'Propositions'}>
            <Paper style={{padding: theme.spacing(6)}}>
                <Box mb={3}>
                    <Button component={"a"} href={"/add_proposal"} variant={"contained"}>
                        Ajouter
                    </Button>
                </Box>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>État</TableCell>
                            <TableCell>Propositions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.calories}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </BrowserApp>
    );
}

export default withUser(BrowserProposalView);
