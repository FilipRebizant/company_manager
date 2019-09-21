import React from 'react';

const Label = (props) => {

    const classes = props.className ? props.className : "grey-text font-weight-light";

    return (
        <label htmlFor={props.for} className={classes}>
            {props.for.replace(/^./, props.for[0].toUpperCase())}
        </label>
    );
};

export { Label }
