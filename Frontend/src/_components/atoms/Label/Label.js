import React from 'react';
import {firstLetterToUpperCase} from "../../../_helpers";

const Label = (props) => {
    const classes = props.className ? props.className : "grey-text font-weight-light";

    return (
        <label htmlFor={props.for} className={classes}>
            {firstLetterToUpperCase(props.for)}
        </label>
    );
};

export { Label }
