import React from 'react';
import { MDBHamburgerToggler, MDBTable, MDBTableHead } from 'mdbreact';

const ReportsTable = (props) => {

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
            label: 'Added By',
            field: 'addedBy',
            sort: 'asc'
        },
        {
            label: 'Started At',
            field: 'startedAt',
            sort: 'asc'
        },
        {
            label: 'Finished At',
            field: 'last',
            sort: 'asc'
        },
        {
            label: 'Summary',
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
            <div className="card-header d-flex justify-content-between main-backgound-color">
                <div>{props.date}</div>
                <MDBHamburgerToggler color="#ffffff" id={`${props.name}-${props.date}`} onClick={toggleVisibilityContent} />
            </div>
            <div className="hiddenContentContainer hiddenContent">
                <MDBTable responsive>
                    <MDBTableHead columns={columns}/>
                    <tbody>
                    { Object.keys(props.items[props.date]).map((key) => {
                       return <React.Fragment key={key}>
                            <tr>
                                <td className="table__data_counter" rowSpan="2">{parseInt(key)+1}</td>
                                <td>{props.items[props.date][key].addedBy}</td>
                                <td>{props.items[props.date][key].startedAt}</td>
                                <td>{props.items[props.date][key].finishedAt}</td>
                                <td>{props.items[props.date][key].hoursSum} hours</td>
                            </tr>
                            <tr className="table__row-full-width">
                                <td className="table__data-highlighted"
                                    colSpan="4">{props.items[props.date][key].dayDescription}</td>
                            </tr>
                        </React.Fragment>
                    })}
                    </tbody>
                </MDBTable>
            </div>
        </div>
    );
};

export { ReportsTable };
