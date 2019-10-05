import React from 'react';

const ListItem = (props) => {

    const singlePropStyle = {
        display: 'inline',
        margin: '0 5px 0 0'
    };

    const listItemStyle = {
        border: '1px solid rgba(0,0,0,.125)',
        margin: '0 0 0 0',
        listStyleType: 'none',
    };

    return (
        <li style={listItemStyle} className="d-flex justify-content-around">
            { Object.keys(props).map((key) =>
                <div key={key} style={singlePropStyle}>{props[key]}</div>
            )}
        </li>
    );
};

export { ListItem };
