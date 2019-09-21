import React from 'react';

const ListItem = (props) => {

    const singlePropStyle = {
        display: 'inline',
        margin: '0 5px 0 0'
    };

    const highlightedProp = {

    };

    const listItemStyle = {
        border: '1px solid rgba(0,0,0,.125)',
        margin: '0 0 0 0',
        listStyleType: 'none',
    };

    return (
        <li style={listItemStyle} className="d-flex justify-content-around">

            <div style={singlePropStyle}>John Doe</div>
            <div style={singlePropStyle}>{props.name}</div>
            <div style={singlePropStyle}>{props.code}</div>
            <div style={singlePropStyle}>{props.quantity}</div>
            <div style={highlightedProp}>{props.additionalInfo}</div>
        </li>
    );
};

export { ListItem };
