import {Typography} from "@mui/material";
import {Fragment} from "react";
import PropTypes from "prop-types";

function ErrorsLabel({errors}) {
    console.log(errors)
    return (
        <>
            {errors?.map((error, index) => (
                <Fragment key={index}>
                    <Typography component={"span"}>
                        {error}
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
