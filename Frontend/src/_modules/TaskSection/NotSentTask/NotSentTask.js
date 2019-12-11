import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader
} from 'mdbreact';

const NotSentTask = (props) => {
    return(
        <div className="d-flex justify-content-around">
            { Object.keys(props.items).map((key) => {
                return <React.Fragment key={key}>
                    <MDBCard style={{ width: "22rem" }} id={props.id}>
                        <MDBCardHeader className="d-flex justify-content-between">
                            <p className="small">Created at: { props.items[key].date }</p>
                            <p className="small">Status: <b>{props.items[key].status}</b></p>
                        </MDBCardHeader>
                        <MDBCardBody>
                            <MDBCardTitle>{props.items[key].employeeAssigned}</MDBCardTitle>
                            <MDBCardText>{props.items[key].description}</MDBCardText>
                        </MDBCardBody>
                        <div className="custom-control custom-checkbox">
                            <button className="btn btn-black">Close task</button>
                        </div>
                    </MDBCard>
                </React.Fragment>
            })}
        </div>
    );
};

export { NotSentTask };
