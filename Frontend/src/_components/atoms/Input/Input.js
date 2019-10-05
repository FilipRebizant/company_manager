import React from 'react';

const Input = (props) => {
    return (
        <input
            type={props.type ? props.type : "text"}
            id={props.name}
            name={props.name}
            value={props.value}
            className="form-control"
            onChange={props.onChange}
        />
    );
};

export { Input }