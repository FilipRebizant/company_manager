import React from 'react';
import { MDBHamburgerToggler, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

const TasksList = (props) => {
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
            label: 'Description',
            field: 'name',
            sort: 'asc'
        },
        {
            label: 'Status',
            field: 'last',
            sort: 'asc'
        },
        {
            label: 'Assigned Person',
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
                <div>{props.date}</div>
                <MDBHamburgerToggler color="#000000" id={`${props.name}-${props.date}`} onClick={toggleVisibilityContent} />
            </div>
            <div className="hiddenContentContainer hiddenContent table-responsive">
                <MDBTable>
                    <MDBTableHead columns={columns}/>
                    <MDBTableBody rows={props.items[props.date]} />
                </MDBTable>
            </div>
        </div>
    );
};

export { TasksList };
