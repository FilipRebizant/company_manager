import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBNavLink, MDBCardHeader } from 'mdbreact';

const Card = (props) => {
    return (
        <MDBCard style={{ width: "22rem" }} id={props.id}>
            <MDBCardHeader className="main-backgound-color">
                <p className="small">Created at: { props.createdAt }</p>
            </MDBCardHeader>
            <MDBCardBody>
                <MDBCardTitle>{ props.title }</MDBCardTitle>
                <MDBCardText>{ props.address }</MDBCardText>
                <MDBNavLink to={`/commission/${props.id}`}
                >Show</MDBNavLink>
            </MDBCardBody>
        </MDBCard>
    )
};

export { Card };
