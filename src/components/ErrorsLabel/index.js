import {Typography} from "@mui/material";
import {Fragment} from "react";
import PropTypes from "prop-types";

function errorToLabel(error) {
    switch (error) {
        case 'Ensure this field has no more than 150 characters.':
            return 'Ce champ ne peut pas contenir plus de 150 caractères.';
        default:
            return error;
    }
}

function ErrorsLabel({errors}) {
    return (
        <>
            {errors.map((error, index) => (
                <Fragment key={index}>
                    <Typography component={"span"}>
                        {errorToLabel(error)}
                    </Typography>
                    <br/>
                </Fragment>
            ))}
        </>
    );
}

export default ErrorsLabel;

ErrorsLabel.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string),
}
