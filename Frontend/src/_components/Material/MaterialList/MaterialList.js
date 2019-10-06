import React from 'react';
import { MDBHamburgerToggler, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

const MaterialList = (props) => {
    const style = {
        border: '1px solid #ced4da',
        margin: '15px 0',
    };

    const columns= [
        {
            label: '#',
            field: 'id',
            sort: 'asc'
        },
        {
            label: 'Name',
            field: 'name',
            sort: 'asc'
        },
        {
            label: 'Code',
            field: 'last',
            sort: 'asc'
        },
        {
            label: 'Quantity',
            field: 'handle',
            sort: 'asc'
        }
    ];

    const toggleVisibilityContent = () => {
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
                <div>{props.items[0].date}</div>
                <MDBHamburgerToggler color="#000000" id={`${props.setName}-${props.items[0].date}`} onClick={toggleVisibilityContent} />
            </div>
            <div className="hiddenContentContainer hiddenContent table-responsive">
                <MDBTable>
                    <MDBTableHead columns={columns}/>
                    <MDBTableBody rows={props.items} />
                </MDBTable>
            </div>
        </div>
    );
};

export { MaterialList };
