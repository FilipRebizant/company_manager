import React, {Component} from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBListGroup} from 'mdbreact';
import { ListGroupItem } from "../_components/ListGroupItem/ListGroupItem";
import { AddMaterial } from "../_components/AddMaterial/AddMaterial";

class CommissionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

            columns: [
                {
                    label: '#',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Surname',
                    field: 'surname',
                    sort: 'asc'
                },
                {
                    label: 'Country',
                    field: 'country',
                    sort: 'asc'
                },
                {
                    label: 'City',
                    field: 'city',
                    sort: 'asc'
                },
                {
                    label: 'Position',
                    field: 'position',
                    sort: 'asc'
                },
                {
                    label: 'Age',
                    field: 'age',
                    sort: 'asc'
                }
            ],
            date: [
                {
                    date: '27.08.2019',
                    usedMaterial: [
                        {
                            name: 'Camera',
                            code: 'ek-432j',
                            addedBy: 'Jan Kowalski',
                            addedAt: '27.08.2019 15:00',
                            createdAt: '27.08.2019',
                            additionalInfo: 'lorem Ipsum dolar'
                        }
                    ]
                },
                {
                    date: '28.08.2019',
                    usedMaterial: [
                        {
                            name: 'Camera',
                            code: 'ek-432j',
                            addedBy: 'Jan Kowalski',
                            addedAt: '27.08.2019 15:00',
                            createdAt: '27.08.2019',
                            additionalInfo: 'lorem Ipsum dolar'
                        },
                        {
                            name: 'Camera2',
                            code: 'ek-432j',
                            addedBy: 'Jan Kowalski',
                            addedAt: '27.08.2019 15:00',
                            createdAt: '27.08.2019',
                            additionalInfo: 'lorem Ipsum dolar'
                        }
                    ]
                }
            ]
        };
    }

    render() {
        this.items = this.state.date.map((day, key) =>
            <ListGroupItem key={day.date}
                           days={day.date}
                           columns={this.state.columns}
                           usedMaterial={day.usedMaterial}
            >

            </ListGroupItem>
        );

        return (
            <MDBContainer>
                <h2>Commission</h2>
                <MDBRow>
                    <MDBCol md="4">
                        <AddMaterial/>
                    </MDBCol>
                    <MDBCol md="8">
                        <MDBContainer>
                            <MDBListGroup>
                                {this.items}
                            </MDBListGroup>
                        </MDBContainer>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export {CommissionPage};