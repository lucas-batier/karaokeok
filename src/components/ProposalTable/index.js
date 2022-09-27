import {Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import {useCellStyles} from "../../styles/cell";

function ProposalTable({rows}) {
    const cellClasses = useCellStyles();

    return (
        <>
            <Box mb={3}>
                <Button component={"a"} href={"/add_proposal"} variant={"contained"}>
                    Ajouter
                </Button>
            </Box>
            <TableContainer fullwidth="true" sx={{ maxHeight: 440 }}>
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
        </>
    )
}

export default ProposalTable;
