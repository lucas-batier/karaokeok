import React from "react";
import {Button, Grid, TextField, CircularProgress} from "@mui/material";
import {withUser} from "../../../contexts/userContext";


function ProposalForm({value, onChange, loading, onSubmit}) {
    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        variant={"outlined"}
                        placeholder={'https://www.youtube.com/watch?v=njXQxWKpIcg'}
                        label={'URL YouTube'}
                        required
                        fullWidth
                        value={value}
                        onChange={evt => onChange(evt.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button disabled={loading} type={"submit"} variant={"contained"} fullWidth>
                        {loading ? <CircularProgress size={"2rem"} /> : 'Envoyer'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default withUser(ProposalForm);
