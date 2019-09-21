import React, {Component} from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { ListGroup } from "../_components/ListGroup";
import { AddMaterial } from "../_components/AddMaterial";

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

    updateList = () => {
        this.getItems();
        this.renderList();
    };

    componentDidMount() {
       this.getItems();
    };

    getItems = () => {
        let currentMaterialList = localStorage.getItem('localMaterialItems');

        this.setState({
            material: JSON.parse(currentMaterialList)
        });
    };

    renderList = () => {
        const { material, columns } = this.state;
        if (material) {
           return Object.keys(material).map((key) =>
                <ListGroup
                    key={key}
                    columns={columns}
                    usedMaterial={material[key]}
                />
            );
        }
    };

    render() {
        return (
            <MDBContainer>
                <h2 className="h2 py-4">Commission</h2>
                <MDBRow>
                    <MDBCol md="4">
                        <AddMaterial updateList={this.updateList}/>
                    </MDBCol>
                    <MDBCol md="8">
                        <MDBContainer>
                            <h3 className="py-4">Used Material</h3>
                            {this.renderList()}
                        </MDBContainer>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export {CommissionPage};
