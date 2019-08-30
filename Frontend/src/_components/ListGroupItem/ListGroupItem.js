import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBNavLink, MDBCardHeader, MDBListGroupItem } from 'mdbreact';
import { MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';

const ListGroupItem = (props) => {

    // {props.usedMaterial.map((item, key) =>
        {/*<div key={key}>*/}
            // {item.name}
        // </div>
    // )}
    // {console.log(props)}

// }
    {/*<MDBTable fixed bordered>*/}
        {/*<MDBTableHead columns={data_people.columns}/>*/}
        {/*<MDBTableBody rows={data_people.rows} />*/}
    {/*</MDBTable>*/}
    return(
        <MDBTable responsive bordered>
            <MDBTableHead columns={
                props.columns
            }/>
            <MDBTableBody rows={props.usedMaterial} />
        </MDBTable>
    );
};

export { ListGroupItem };