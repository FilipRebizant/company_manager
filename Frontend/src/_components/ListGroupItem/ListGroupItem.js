import React from 'react';
import { ListItem } from "../ListItem/ListItem";

const ListGroupItem = (props) => {
    const style = {
        border: '2px solid black',
        margin: '15px 0',
    };
    console.log(props.usedMaterial);
    return(
        <div style={style}>
            <div className="card-header d-flex justify-content-between">
                <div>{props.usedMaterial[0].usedAt}</div><div>X</div>
            </div>
            <div className="hiddenContent">
                <ul className="list-group" >

                    { props.usedMaterial.map((item, key) =>
                        <ListItem
                            key={key}
                            name={item.name}
                            code={item.code}
                            quantity={item.quantity}
                            additionalInfo={item.additionalInfo}
                            usedAt={item.usedAt}
                        />
                    )}
                </ul>
            </div>
        </div>

    );

};

export { ListGroupItem };