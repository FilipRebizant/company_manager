import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBNavLink, MDBCardHeader } from 'mdbreact';

const Card = (props) => {
    return (
        <MDBCol>
            <MDBCard style={{ width: "22rem" }}>
                <MDBCardHeader>
                    <p className="small">Created at: { props.createdAt }</p>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardTitle>{ props.title }</MDBCardTitle>
                    <MDBCardText>{ props.address }</MDBCardText>
                    <MDBNavLink to={`/commission/${props.id}`}>Show</MDBNavLink>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
};

export { Card };