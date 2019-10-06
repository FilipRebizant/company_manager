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
            field: 'name',
            sort: 'asc'
        },
        {
            label: 'Started At',
            field: 'name',
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
            <div className="card-header d-flex justify-content-between">
                <div>{props.items[0].date}</div>
                <MDBHamburgerToggler color="#000000" id={`${props.setName}-${props.items[0].date}`} onClick={toggleVisibilityContent} />
            </div>
            <div className="hiddenContentContainer hiddenContent">
                <MDBTable responsive>
                    <MDBTableHead columns={columns}/>
                    <tbody>
                    { Object.keys(props.items).map((key) => {
                       return <React.Fragment key={key}>
                            <tr>
                                <td className="table__data_counter" rowSpan="2">{key}</td>
                                <td>{props.items[key].addedBy}</td>
                                <td>{props.items[key].startedAt}</td>
                                <td>{props.items[key].finishedAt}</td>
                                <td>{props.items[key].hoursSum}</td>
                            </tr>
                            <tr className="table__row-full-width">
                                <td className="table__data-highlighted"
                                    colSpan="4">{props.items[key].dayDescription}</td>
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
