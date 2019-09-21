import React from 'react';
import { ListItem } from "../ListItem";
import { MDBHamburgerToggler } from 'mdbreact';

const ListGroup = (props) => {
    const style = {
        border: '2px solid black',
        margin: '15px 0',
    };

    const showContent = (e) => {
        let hiddenPart = wrapper.current.children[1];
        if (hiddenPart.classList.contains("hiddenContent")) {
            hiddenPart.classList.remove("hiddenContent");
        } else {
            hiddenPart.classList.add("hiddenContent");
        }

    };

    let wrapper = React.createRef();

    return(
        <div ref={wrapper} style={style}>
            <div className="card-header d-flex justify-content-between">
                <div>{props.usedMaterial[0].usedAt}</div>
                <MDBHamburgerToggler color="#000000" id={props.usedMaterial[0].usedAt} onClick={e => showContent(e)} />

            </div>
            <div className="hiddenContentContainer hiddenContent">
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

export { ListGroup };
