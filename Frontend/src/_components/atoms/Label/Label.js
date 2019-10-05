import React from 'react';

const Label = (props) => {
    const classes = props.className ? props.className : "grey-text font-weight-light";

    return (
        <label htmlFor={props.for} className={classes}>
            {props.for.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })}
        </label>
    );
};

export { Label }
