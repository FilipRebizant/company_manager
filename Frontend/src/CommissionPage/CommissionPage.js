import React, {Component} from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBListGroup} from 'mdbreact';
import { ListGroupItem } from "../_components/ListGroupItem/ListGroupItem";
import { AddMaterial } from "../_components/AddMaterial/AddMaterial";

class CommissionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            material: null,
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Code',
                    field: 'code',
                    sort: 'asc'
                },
                {
                    label: 'Added by',
                    field: 'addedBy',
                    sort: 'asc'
                },
                {
                    label: 'Quantity',
                    field: 'quantity',
                    sort: 'asc'
                },
                {
                    label: 'Used at',
                    field: 'usedAt',
                    sort: 'asc'
                }
            ]

        };
    }

    componentDidMount() {
        let currentMaterialList = localStorage.getItem('localMaterialItems');

        this.setState({
            material: JSON.parse(currentMaterialList)
        });
    };

    render() {
        const { material, columns } = this.state;

        if (material) {
            this.items = Object.keys(material).map((key) =>
                <ListGroupItem
                    key={key}
                    columns={columns}
                    usedMaterial={material[key]}
                />
            );
        }

        return (
            <MDBContainer>
                <h2>Commission</h2>
                <MDBRow>
                    <MDBCol md="4">
                        <AddMaterial/>
                    </MDBCol>
                    <MDBCol md="8">
                        <MDBContainer>
                            {this.items}
                        </MDBContainer>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export {CommissionPage};