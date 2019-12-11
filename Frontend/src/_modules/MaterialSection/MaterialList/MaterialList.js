import React from 'react';
import { MDBHamburgerToggler, MDBTable, MDBTableHead } from 'mdbreact';

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

    return (
        <div ref={wrapper} style={style}>
            <div className="card-header d-flex justify-content-between">
                <div>{props.date}</div>
                <MDBHamburgerToggler color="#000000" id={`${props.name}-${props.date}`} onClick={toggleVisibilityContent} />
            </div>
            <div className="hiddenContentContainer hiddenContent">
                <MDBTable responsive>
                    <MDBTableHead columns={columns} />
                    <tbody>
                        { Object.keys(props.items[props.date]).map((key) => {
                                return <React.Fragment key={key}>
                                    <tr>
                                        <td>{parseInt(key)+1}</td>
                                        <td>{props.items[props.date][key].name}</td>
                                        <td>{props.items[props.date][key].code}</td>
                                        <td>{props.items[props.date][key].quantity}</td>
                                    </tr>
                                </React.Fragment>
                            })
                        }
                    </tbody>

                </MDBTable>
            </div>
        </div>
    );
};

export { MaterialList };
